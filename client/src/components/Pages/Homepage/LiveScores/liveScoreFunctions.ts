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
    .split(" ")
    .map((word, index) => {
      // use slice to add the rest of word in lowercase.
      // make first character lowercase of first word.
      if (word.charAt(0) && index === 0) {
        return word.charAt(0).toLowerCase() + word.slice(1).toLowerCase();
      } else {
        // rest of words are all upper case.
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");
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
