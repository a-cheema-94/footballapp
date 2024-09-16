type Player = {
  league: string,
  general: PlayerGeneralType,
  statistics: PlayerStatisticsType,
}

type PlayerGeneralType = {
  id: number,
  name: string,
  firstname: string,
  lastname: string,
  age: number,
  nationality: string,
  height: string,
  weight: string
}

type PlayerStatisticsType = {
  team: {
    id: number,
    name: string
  },
  games: {
    appearances: number,
    minutes: number,
    position: string,
    captain: boolean
  },
  substitutions: {
    in: number,
    out: number
  },
  shots: {
    total: number,
    on: number
  },
  goals: {
    total: number,
    conceded: number,
    assists: number,
    saves: number
  },
  passes: {
    total: number,
    key: number,
    accuracy: number
  },
  tackles: {
    total: number,
    blocks: number,
    interceptions: number
  },
  duels: {
    won: number
  },
  dribbles: {
    attempts: number,
    success: number,
    past: number
  },
  fouls: {
    drawn: number,
    committed: number
  },
  cards: {
    yellow: number,
    red: number
  },
  penalty: {
    scored: number,
    missed: number,
    saved: number
  },
}