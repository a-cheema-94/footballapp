
const getMaxPoints = (team, noOfGames) => {
  return team.points + ((noOfGames - team.all.played) * 3)
}

const getNoOfGames = (league) => (league.length - 1) * 2

export const isChampion = (league) => {
  const noOfGames = getNoOfGames(league);
  const teamsToCheck = 6; // subject to change
  const firstTeamPoints = league[0].points;
  for (let i = 1; i<teamsToCheck; i++) {
    const currTeamMaxPoints = getMaxPoints(league[i], noOfGames);
    if(currTeamMaxPoints >= firstTeamPoints) {
      return false
    }
  }
  return true
}

export const isAnyTeamRelegated = (league) => {
  // get 4 from bottom team points
  const fourthFromBottomIndex = league.length - 4;
  const fourthFromBottomPoints = league[fourthFromBottomIndex].points;
  const noOfGames = getNoOfGames(league);
  // relegated teams array
  let relegatedTeamsIndexes = [];
  // iterate over last three teams
  for(let i=league.length-1; i>fourthFromBottomIndex; i--) {
    const currTeamMaxPoints = getMaxPoints(league[i], noOfGames);
    if(currTeamMaxPoints < fourthFromBottomPoints) {
      relegatedTeamsIndexes.push(i)
    }
  }
  return relegatedTeamsIndexes;
}


// TESTS
      const premierLeagueTable = [
        { team: "Liverpool", played: 34, points: 82 },
        { team: "Arsenal", played: 34, points: 67 },
        { team: "Newcastle", played: 34, points: 62 },
        { team: "Manchester City", played: 34, points: 61 },
        { team: "Chelsea", played: 34, points: 60 },
        { team: "Nottingham Forest", played: 33, points: 60 },
        { team: "Aston Villa", played: 34, points: 57 },
        { team: "Fulham", played: 34, points: 51 },
        { team: "Brighton", played: 34, points: 51 },
        { team: "Bournemouth", played: 34, points: 50 },
        { team: "Brentford", played: 33, points: 46 },
        { team: "Crystal Palace", played: 34, points: 45 },
        { team: "Wolves", played: 34, points: 41 },
        { team: "Manchester United", played: 34, points: 39 },
        { team: "Everton", played: 34, points: 38 },
        { team: "Tottenham", played: 34, points: 37 },
        { team: "West Ham", played: 34, points: 36 },
        { team: "Ipswich", played: 34, points: 21 },
        { team: "Leicester", played: 34, points: 18 },
        { team: "Southampton", played: 34, points: 11 }
      ];
      
      const bundesligaLeagueTable = [
        { team: "Bayern München", played: 31, points: 75 },
        { team: "Bayer Leverkusen", played: 31, points: 67 },
        { team: "Eintracht Frankfurt", played: 31, points: 55 },
        { team: "SC Freiburg", played: 31, points: 51 },
        { team: "RB Leipzig", played: 31, points: 49 },
        { team: "Borussia Dortmund", played: 31, points: 48 },
        { team: "FSV Mainz 05", played: 31, points: 47 },
        { team: "Werder Bremen", played: 31, points: 46 },
        { team: "Borussia Mönchengladbach", played: 31, points: 44 },
        { team: "FC Augsburg", played: 31, points: 43 },
        { team: "VfB Stuttgart", played: 31, points: 41 },
        { team: "VfL Wolfsburg", played: 31, points: 39 },
        { team: "Union Berlin", played: 31, points: 36 },
        { team: "FC St. Pauli", played: 31, points: 31 },
        { team: "1899 Hoffenheim", played: 31, points: 30 },
        { team: "1. FC Heidenheim", played: 31, points: 25 },
        { team: "Holstein Kiel", played: 31, points: 22 },
        { team: "VfL Bochum", played: 31, points: 21 }
      ];
      
      const serieaLeagueTable = [
        { team: "Napoli", played: 34, points: 74 },
        { team: "Inter", played: 34, points: 71 },
        { team: "Atalanta", played: 34, points: 65 },
        { team: "Juventus", played: 34, points: 62 },
        { team: "Bologna", played: 34, points: 61 },
        { team: "Roma", played: 34, points: 60 },
        { team: "Lazio", played: 34, points: 60 },
        { team: "Fiorentina", played: 34, points: 59 },
        { team: "Milan", played: 34, points: 54 },
        { team: "Torino", played: 34, points: 43 },
        { team: "Como", played: 34, points: 42 },
        { team: "Udinese", played: 34, points: 41 },
        { team: "Genoa", played: 34, points: 39 },
        { team: "Cagliari", played: 34, points: 33 },
        { team: "Verona", played: 34, points: 32 },
        { team: "Parma", played: 34, points: 32 },
        { team: "Lecce", played: 34, points: 27 },
        { team: "Venezia", played: 34, points: 25 },
        { team: "Empoli", played: 34, points: 25 },
        { team: "Monza", played: 34, points: 15 }
      ];
      
      const laLigaLeagueTable = [
        { team: "Barcelona", played: 33, points: 76 },
        { team: "Real Madrid", played: 33, points: 72 },
        { team: "Atlético Madrid", played: 33, points: 66 },
        { team: "Athletic Club", played: 33, points: 60 },
        { team: "Villarreal", played: 33, points: 55 },
        { team: "Real Betis", played: 33, points: 54 },
        { team: "Celta Vigo", played: 33, points: 46 },
        { team: "Osasuna", played: 33, points: 44 },
        { team: "Mallorca", played: 33, points: 44 },
        { team: "Real Sociedad", played: 33, points: 42 },
        { team: "Rayo Vallecano", played: 33, points: 41 },
        { team: "Getafe", played: 33, points: 39 },
        { team: "Espanyol", played: 33, points: 39 },
        { team: "Valencia", played: 33, points: 39 },
        { team: "Sevilla", played: 33, points: 37 },
        { team: "Girona", played: 33, points: 35 },
        { team: "Alavés", played: 33, points: 34 },
        { team: "Las Palmas", played: 33, points: 32 },
        { team: "Leganes", played: 33, points: 30 },
        { team: "Valladolid", played: 33, points: 16 }
      ];
      
      const ligueOneLeagueTable = [
        { team: "PSG", played: 31, points: 78 },
        { team: "Marseille", played: 31, points: 58 },
        { team: "LOSC", played: 31, points: 56 },
        { team: "Monaco", played: 31, points: 55 },
        { team: "Lyon", played: 31, points: 54 },
        { team: "Nice", played: 31, points: 54 },
        { team: "Strasbourg", played: 31, points: 54 },
        { team: "Lens", played: 31, points: 45 },
        { team: "Brest", played: 31, points: 44 },
        { team: "Auxerre", played: 31, points: 41 },
        { team: "Rennes", played: 31, points: 38 },
        { team: "Toulouse", played: 31, points: 35 },
        { team: "Reims", played: 31, points: 33 },
        { team: "Nantes", played: 31, points: 32 },
        { team: "Angers", played: 31, points: 30 },
        { team: "Le Havre", played: 31, points: 28 },
        { team: "St-Étienne", played: 31, points: 27 },
        { team: "Montpellier", played: 31, points: 16 }
      ];
      
// console.log(isChampion(premierLeagueTable))
// console.log(isChampion(bundesligaLeagueTable))
// console.log(isChampion(serieaLeagueTable))
// console.log(isChampion(laLigaLeagueTable))
// console.log(isChampion(ligueOneLeagueTable))

// console.log(isAnyTeamRelegated(premierLeagueTable))
// console.log(isAnyTeamRelegated(bundesligaLeagueTable))
// console.log(isAnyTeamRelegated(serieaLeagueTable))
// console.log(isAnyTeamRelegated(laLigaLeagueTable))
// console.log(isAnyTeamRelegated(ligueOneLeagueTable))