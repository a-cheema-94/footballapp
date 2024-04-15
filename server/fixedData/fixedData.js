export const PROPS_TO_FILTER = {
  topPlayers: {
    general: ['birth', 'injured', 'photo'],
    statistics: [ 'team.logo', 'league', 'games.lineups', 'games.number', 'games.rating', 'substitutions.bench', 'duels.total', 'cards.yellowred', 'penalty.won', 'penalty.commited' ],
    
  },
  standings: ["team.logo", "group", "status", "description", "home", "away", "update"],
  squads: ["photo"],
  teamStats: ["league", "team.logo", "fixtures.played.home", "fixtures.played.away", "fixtures.wins.home", "fixtures.wins.away", "fixtures.draws.home", "fixtures.draws.away", "fixtures.loses.home" , "fixtures.loses.away", "goals.for.total.home", "goals.for.total.away", "goals.for.average.home", "goals.for.average.away", "goals.for.minute", "goals.against.total.home", "goals.against.total.away", "goals.against.average.home", "goals.against.average.away", "goals.against.minute", "biggest.goals", "failed_to_score", "cards"],
  fixtures: {
    fixture: [ "fixture.timezone", "fixture.date", "fixture.periods", "league", "teams.home.logo", "teams.away.logo", "score" ],
    events: ["team.logo"],
    lineups: ["team.logo", "coach.photo"],
    statistics: ["team.logo"]
  }
};

export const FIXTURES_ENDPOINTS = [ "fixtures", "fixtures/events", "fixtures/lineups", "fixtures/statistics" ];

export const LEAGUES = {
  "Premier League": 39,
  "Bundesliga": 78,
  "Serie A": 135,
  "La Liga": 140
}

export const SEASON = 2023