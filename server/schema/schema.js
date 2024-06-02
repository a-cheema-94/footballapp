import { fixturesTypeDefs } from "./fixturesSchema.js";
import { newsTypeDefs } from "./newsSchema.js";
import { squadMemberTypeDefs } from "./squadMemberSchema.js";
import { standingsTypeDefs } from "./standingsSchema.js";
import { teamStatsTypeDefs } from "./teamStatsSchema.js";
import { topPlayerTypeDefs } from "./topPlayerSchema.js";

export const typeDefs = `#graphql
  ${topPlayerTypeDefs}

  ${standingsTypeDefs}

  ${squadMemberTypeDefs}

  ${teamStatsTypeDefs}

  ${fixturesTypeDefs}

  ${newsTypeDefs}

  type Query {
    topPlayers(league: String!, limit: Int = 20, sortBy: String!): [PlayerData!]!
    leagueStandings(league: String!, limit: Int = 20): [TeamStanding!]!
    playerSquads(team: String!, league: String!): [SquadMember!]!
    teamStats(team: String!, league: String!): TeamStats!
    playerStats(player: String!, team: String!, league: String!): PlayerData!
    getLastOrNextFixture(team: String!, league: String!, type: String!): Fixture!
    getLastFixtureInfo(team: String!, league: String!): Fixture!
    liveFixtures(leagues: [String!]!): [Fixture!]!
    topFootballStories: [newsStory!]!

    # subject to change
    playerSearch(query: String!, league: String!, team: String, position: String, range: String ): [SquadMember!]
    autoCompletePlayer(query: String!): [SquadMember!]
  }
`

// in database there is one collection representing the top scorers and assists from the 4 leagues. Each document represents one player and will have a league field, to base query on.