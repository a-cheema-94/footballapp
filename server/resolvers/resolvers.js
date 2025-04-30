import {
  makeFootballApiCall,
  makeNewsApiCall,
} from "../dataFetching/apiCallFunctions.js";
import { shouldMakeApiCall } from "../dataFetching/shouldMakeApiCall.js";
import { clearMongoCollection } from "../dataFetching/handleDatabaseFunctions.js";
import { FIXTURES_ENDPOINTS, LEAGUES, SEASON } from "../fixedData/fixedData.js";
import LastApiCallTimes from "../models/LastApiCallTimesModel.js";
import SquadMember from "../models/SquadMemberModel.js";
import TeamStanding from "../models/TeamStandingModel.js";
import TeamStats from "../models/TeamStatsModel.js";
import Player from "../models/TopPlayerModel.js";
import chalk from "chalk";
import Fixture from "../models/fixtures/FixtureModel.js";
import News from "../models/NewsModel.js";
import {
  getLiveLeagueIds,
  getTeamOrPlayerId,
  makeInitialQuery,
  squadMemberAggregateSearch,
} from "./additionalFunctions.js";

// NOTE: On some resolvers we will need id's from the players or teams since if api call is needed, this is required in the request url. E.g. playerSquads resolver needs team id, since the query to the endpoint: players/squads on the api needs team id in the request.

const IN_PLAY_STATUS_CODES = ["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"];


export const resolvers = {
  Query: {
    topPlayers: async (_, { league, limit = 20, sortBy }) => {
      // clearMongoCollection(Player);
      // clearMongoCollection(Fixture);
      // clearMongoCollection(LastApiCallTimes);
      // clearMongoCollection(SquadMember);
      // clearMongoCollection(TeamStanding);
      // clearMongoCollection(TeamStats);
      // clearMongoCollection(News);
      

      // setup endpoint and handle parameter values
      let endpoint = "players/topscorers";
      if (sortBy === "assists") endpoint = "players/topassists";

      if (!Object.keys(LEAGUES).includes(league)) league = "Premier League";

      // decide if should query api.
      await makeInitialQuery(
        "daily",
        endpoint,
        league,
        { league: LEAGUES[league], season: SEASON },
        "Top Player",
        league
      );

      // sorting logic
      let sortingInformation = {};
      let category = "total";
      if (sortBy === "assists") {
        category = "assists";
      }
      sortingInformation[`statistics.goals.${category}`] = -1;

      // query database
      let topPlayers;
      try {
        topPlayers = await Player.find({ league })
          .sort(sortingInformation)
          .limit(limit)
          .exec();

        console.log(chalk.green("data finalized"));
      } catch (error) {
        console.error(
          `some error occurred when fetching players from database: ${error}`
        );
      }
      return topPlayers;
    },

    leagueStandings: async (_, { league, limit = 20 }) => {
      // clearMongoCollection(TeamStanding)
      // clearMongoCollection(LastApiCallTimes);

      // setup endpoint and handle parameter values
      let endpoint = "standings";
      if (!Object.keys(LEAGUES).includes(league)) league = "Premier League";

      // decide if should query api.
      await makeInitialQuery(
        "daily",
        endpoint,
        league,
        { league: LEAGUES[league], season: SEASON },
        "Team Standings",
        league
      );

      // sorting logic
      let sortingInformation = {};
      sortingInformation[`rank`] = 1;

      // query database
      let teamStandings;
      try {
        teamStandings = await TeamStanding.find({ league })
          .sort(sortingInformation)
          .limit(limit)
          .exec();

        console.log(chalk.green("data finalized"));
      } catch (error) {
        console.error(
          `some error occurred when fetching team Standings from database: ${error}`
        );
      }
      return teamStandings;
    },

    playerSquads: async (_, { team, league }) => {
      // clearMongoCollection(LastApiCallTimes, { endpoint: 'players/squads' });
      // clearMongoCollection(SquadMember)

      // setup endpoint and handle parameter values
      let endpoint = "players/squads";
      // teamId
      let teamId = await getTeamOrPlayerId(TeamStanding, { "team.name": team });

      console.log(chalk.yellow(team, ": ", teamId));

      // decide if should query api.
      await makeInitialQuery(
        "weekly",
        endpoint,
        team,
        { team: teamId },
        "Squad Members",
        league
      );

      // query database
      let squad;
      try {
        squad = await SquadMember.find({ team }).exec();

        console.log(chalk.green("data finalized"));
      } catch (error) {
        console.error(
          `some error occurred when fetching squad members from database: ${error}`
        );
      }
      return squad;
    },

    teamStats: async (_, { team, league }) => {
      // clearMongoCollection(LastApiCallTimes);
      // clearMongoCollection(TeamStats)

      // setup endpoint and handle parameter values
      let endpoint = "teams/statistics";
      // team Id
      let teamId = await getTeamOrPlayerId(TeamStanding, { "team.name": team });
      console.log(teamId);

      // decide if should query api
      await makeInitialQuery(
        "weekly",
        endpoint,
        team,
        { team: teamId, league: LEAGUES[league], season: SEASON },
        "Team Stats",
        league
      );

      // query database
      let teamStats;
      try {
        teamStats = await TeamStats.findOne({ "team.name": team });
        console.log(chalk.green("data finalized"));
      } catch (error) {
        console.error(
          `some error occurred when fetching team stats from database: ${error}`
        );
      }
      return teamStats;
    },

    playerStats: async (_, { player, team, league }) => {
      // clearMongoCollection(Player);
      // clearMongoCollection(LastApiCallTimes);

      // setup endpoint and handle parameter values
      let endpoint = "players";
      let teamId = await getTeamOrPlayerId(TeamStanding, { "team.name": team });
      let playerId = await getTeamOrPlayerId(SquadMember, { name: player });

      // decide if should query api
      await makeInitialQuery(
        "weekly",
        endpoint,
        player,
        { id: playerId, team: teamId, league: LEAGUES[league], season: SEASON },
        "Player",
        league
      );

      // query database
      let playerStats;
      try {
        playerStats = await Player.findOne({ "general.id": playerId });
        console.log(chalk.green("data finalized"));
      } catch (error) {
        console.error(
          `some error occurred when fetching player stats from database: ${error}`
        );
      }
      return playerStats;
    },

    // ? REMINDER => have to call last or next fixture before last fixture info
    getLastOrNextFixture: async (_, { team, league, type }) => {
      // clearMongoCollection(LastApiCallTimes, { endpoint: "fixtures" })
      // await clearMongoCollection(Fixture, { $or: [
      //   { 'teams.home.name': team },
      //   { 'teams.home.name': team },
      // ] })

      // setup endpoint and handle parameter values
      let endpoint = "fixtures";

      let teamId = await getTeamOrPlayerId(TeamStanding, { "team.name": team });
      console.log(chalk.yellow(team, ": ", teamId));

      // needed if api call becomes necessary
      const fixtureParams = {
        team: teamId,
        league: LEAGUES[league],
        season: SEASON,
      };
      fixtureParams[type] = 1; // type can be last or next

      // decide if should query api
      await makeInitialQuery(
        "daily",
        endpoint,
        `${team}: ${type}`,
        fixtureParams,
        "Fixtures (last or next)",
        league
      );

      // sorting logic
      let sortingInfo = {};
      if (type === "next") {
        sortingInfo["fixture.status.short"] = "NS"; // NS: fixture not started
      } else if (type === "last") {
        sortingInfo["fixture.status.short"] = "FT"; // FT: full time
      }

      // query database
      let finalFixture;
      try {
        finalFixture = await Fixture.findOne({
          ...sortingInfo,
          $or: [{ "teams.home.name": team }, { "teams.away.name": team }],
        }).sort({ createdAt: -1 });
        // get latest fixture i.e. latest last fixture and latest next fixture for a particular team, so use .sort after query has been sorted.
        // NOTE: .sort({ field: -1 }) => mongoDB method that sorts data in order either descending (-1) or ascending (1). can be applied to numerical, string or date fields.
        console.log(chalk.green("data finalized"));
      } catch (error) {
        console.error(
          `some error occurred when fetching fixture from database: ${error}`
        );
      }

      return finalFixture;
    },

    getLastFixtureInfo: async (_, { team, league }) => {
      // clearMongoCollection(Fixture)
      // clearMongoCollection(LastApiCallTimes)

      // query database for last fixture.
      let lastFixture = await Fixture.findOne({
        $or: [{ "teams.home.name": team }, { "teams.away.name": team }],
        "fixture.status.short": "FT",
      }).sort({ createdAt: -1 });

      // need fixture id of last fixture so we destructure the lastFixture and rename.
      const {
        fixture: { id: lastFixtureId } = {},
        events: fixtureEvents,
        lineups: fixtureLineups,
        statistics: fixtureStatistics,
      } = lastFixture || {};
      // if fixture.id or lastFixture is undefined we have it default to an empty object to stop code from breaking.

      // Sometimes the events/lineups/statistics are empty so we may need to call api to populate the fields.
      const fixtureInfoData = [
        fixtureEvents,
        fixtureLineups,
        fixtureStatistics,
      ];

      try {
        if (fixtureInfoData.every((infoArray) => infoArray.length === 0)) {
          // call api for endpoints events/lineups/statistics
          const fixtureInfoCalls = FIXTURES_ENDPOINTS.map((endpoint) =>
            makeFootballApiCall(
              endpoint,
              { fixture: lastFixtureId },
              `${league}.${lastFixtureId}`
            )
          );

          await Promise.all(fixtureInfoCalls);
        }
      } catch (error) {
        console.error(
          `Error! not able to make api call to get fixture info: ${error}`
        );
      }

      // look for fixture again in database and then return
      let finalFixture;
      try {
        finalFixture = await Fixture.findOne({ "fixture.id": lastFixtureId });
        console.log(chalk.green.bold("successfully got data from database"));
      } catch (error) {
        console.error(`Error, cannot query fixture from database: ${error}`);
      }
      return finalFixture;
    },

    liveFixtures: async (_, { leagues }) => {
      // clearMongoCollection(Fixture, { live: true })
      // clearMongoCollection(LastApiCallTimes, { parameter: 'live' })

      // sort out endpoint and get league ids for live fixtures
      const liveLeagueIds = getLiveLeagueIds(leagues);
      let endpoint = "fixtures";

      // decide if should query api
      await makeInitialQuery(
        "minute",
        endpoint,
        "live",
        { live: liveLeagueIds },
        "Live Fixture"
      );

      // more complex since I want Premier league live fixtures first followed by the rest, so use an aggregation pipeline in database query.
      let liveFixtures;
      try {
        liveFixtures = await Fixture.aggregate([
          {
            // $match: { live: true },
            // get fixtures with live: true and fixture.status.short being one of the in_play status codes.
            // get all live fixtures in an array
            $match: { $and: [
              {live: true}, {"fixture.status.short": {$in: IN_PLAY_STATUS_CODES}}
            ] },
          },
          {
            // add a sortOrder field to specify that premier league live fixtures will be sorted first
            $addFields: {
              sortOrder: {
                $cond: {
                  if: { $eq: ["$league", "Premier League"] },
                  then: 0,
                  else: 1,
                },
              },
            },
          },
          {
            // now, sort first by live premier league fixtures in alphabetical order, then the other fixtures by league in alphabetical order.
            $sort: {
              sortOrder: 1,
              league: 1,
            },
          },
        ]);
      } catch (error) {
        console.error(
          `some error occurred when fetching live fixtures from database: ${error}`
        );
      }
      return liveFixtures;
    },

    topFootballStories: async () => {
      // clearMongoCollection(LastApiCallTimes, { endpoint: 'news' });

      // determine whether we should make api call. If should we first delete previous news stories from database and then call api to populate database with new stories.
      try {
        if (
          await shouldMakeApiCall("daily", "news", "top football headlines")
        ) {
          console.log(chalk.bold("news"));
          console.log(chalk.bold("Delete previous stories from DB"));
          await clearMongoCollection(News);
          console.log(chalk.green("Call Api!!!"));
          await makeNewsApiCall();
          console.log(chalk.green("async happening"));
        }
      } catch (error) {
        throw new Error(`Top news stories failed to fetch: ${error.message}`);
      }

      // query database
      let topFootballHeadlines;
      try {
        topFootballHeadlines = await News.find()
          .sort({ publishedAt: -1 })
          .limit(10)
          .exec();

        console.log(chalk.green("data finalized"));
        // console.log(topPlayers.length)
      } catch (error) {
        console.error(
          `some error occurred when fetching news stories from database: ${error}`
        );
      }

      return topFootballHeadlines;
    },

    playerSearch: async (
      _,
      { query, league, team = null, position = null, range = null }
    ) => {
      // sort out endpoint and define sorting variables and parameters.

      // clearMongoCollection(LastApiCallTimes, { endpoint: 'players/squads' });
      let searchResults = [];
      let teamId;
      let endpoint = "players/squads";

      const playerSearchQueryParams = {};

      // FILTERS
      const matchFields = [
        {
          text: {
            query: league,
            path: "league",
          },
        },
      ];

      if (team !== null) {
        console.log(team)
        teamId = await getTeamOrPlayerId(TeamStanding, { "team.name": team });
        playerSearchQueryParams.team = teamId;
        matchFields.push({ text: { query: team, path: "team" } });
      }

      if (range !== null) {
        const [lower, higher] = range.split("-");
        matchFields.push({
          range: { path: "age", gte: lower * 1, lte: higher * 1 },
        });
      }

      if (position !== null) {
        matchFields.push({ text: { query: position, path: "position" } });
      }

      // QUERIES
      try {
        searchResults = await squadMemberAggregateSearch(query, matchFields);
        // search database first if no results, decide if should make query to api.
        if (searchResults.length === 0 && team !== null) {
          console.log(
            chalk.bold.bgYellowBright.black(
              "player/players NOT in database already, need to call API"
            )
          );

          await makeInitialQuery(
            "weekly",
            endpoint,
            team,
            playerSearchQueryParams,
            "Squad Members",
            league
          );

          // add a delay, to ensure database has processed data.
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // query database again
          searchResults = await squadMemberAggregateSearch(query, matchFields);
          } else {
          console.log(
            chalk.bold.bgMagenta("player/players in database already")
          );
        }
      } catch (error) {
        console.error(
          chalk.bold.bgRedBright(
            `Error when searching and fetching players: ${error}`
          )
        );
      }
      return searchResults;
    },

    autoCompletePlayer: async (_, { query }) => {
      let autoCompleteResults = [];

      // todo => add filtering to autocomplete results => in pipeline or another method
      try {
        autoCompleteResults = await SquadMember.aggregate([
          {
            $search: {
              index: "autoCompletePlayers",
              autocomplete: {
                query,
                path: "name",
                tokenOrder: "sequential",
                fuzzy: {
                  maxEdits: 2,
                  prefixLength: 1,
                  maxExpansions: 100,
                },
              },
            },
          },
          {
            $limit: 10,
          },
        ]);
      } catch (error) {
        console.error(
          chalk.bgRedBright.white(
            `Error, issue with autocomplete on player search: ${error}`
          )
        );
      }

      return autoCompleteResults;
    },
  },
};

export default resolvers;
