import { FixtureType } from "../../../../queries/types/queryTypes";

// turn live fixtures into one state object with lists for every league.

export type LiveFixtures = {
  premierLeague: FixtureType[];
  bundesliga: FixtureType[];
  laLiga: FixtureType[];
  serieA: FixtureType[];
};

export const toCamelCase = (str: string) => {
  return str
    .split(' ')
    .map((word, index) => {
        const restOfChars = word.slice(1);
        const firstChar = index === 0 ? word.charAt(0).toLocaleLowerCase() : word.charAt(0).toLocaleUpperCase()
        return firstChar + restOfChars
    })
    .join('')
    
};

export const sortLiveFixturesByLeague = (
  fixtures: FixtureType[] 
): LiveFixtures => {
  const initialLiveFixtures = {
    premierLeague: [],
    bundesliga: [],
    laLiga: [],
    serieA: [],
  }
  if(!fixtures) return initialLiveFixtures
  const final = fixtures?.reduce(
    (acc: LiveFixtures, fixture: FixtureType) => {
      // use keyof to ensure the league matches to the correct camel case key of the returned live fixture object.
      const league = toCamelCase(fixture.league) as keyof LiveFixtures;
      if (!acc[league]) acc[league] = [];
      acc[league].push(fixture);
      return acc;
    },
    // initial live fixtures
    initialLiveFixtures
  );

  return final;
};
