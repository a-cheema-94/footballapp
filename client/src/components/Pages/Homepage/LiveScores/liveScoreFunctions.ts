import { FixtureType } from "../../../../queries/types/queryTypes";

export type LiveFixtures = {
  premierLeague: FixtureType[];
  bundesliga: FixtureType[];
  laLiga: FixtureType[];
  serieA: FixtureType[];
};

const toCamelCase = (str: string) => {
  return str
    .split(" ")
    .map((word, index) => {
      if (word.charAt(0) && index === 0) {
        return word.charAt(0).toLowerCase() + word.slice(1).toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");
};

export const sortLiveFixturesByLeague = (
  fixtures: FixtureType[]
): LiveFixtures => {
  const final = fixtures.reduce(
    (acc: LiveFixtures, fixture: FixtureType) => {
      const league = toCamelCase(fixture.league) as keyof LiveFixtures;
      if (!acc[league]) acc[league] = [];
      acc[league].push(fixture);
      return acc;
    },
    {
      premierLeague: [],
      bundesliga: [],
      laLiga: [],
      serieA: [],
    }
  );

  return final;
};
