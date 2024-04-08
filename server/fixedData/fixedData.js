export const PROPS_TO_FILTER = {
  topPlayers: {
    general: ['birth', 'injured', 'photo'],
    statistics: [ 'team.logo', 'league', 'games.lineups', 'games.number', 'games.rating', 'substitutions.bench', 'duels.total', 'cards.yellowred', 'penalty.won', 'penalty.commited' ],
    
  },
  standings: ["team.logo", "group", "status", "description", "home", "away", "update"],
  squads: ["photo"]
}

export const LEAGUES = {
  "Premier League": 39,
  "Bundesliga": 78,
  "Serie A": 135,
  "La Liga": 140
}

export const SEASON = 2023