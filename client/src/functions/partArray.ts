// TODO => put all in helper function in shared folder for client and server. Go through whole app to look for helper functions that can be used across both client and server and simplify.
// TODO => put this in other file as it is useful but not need here.

export const partArray = (array: any[], partSize: number) => {
  let finalPartedArray = [];
  for (let i = 0; i < array.length; i += partSize) {
    finalPartedArray.push(array.slice(i, i + partSize));
  }

  return finalPartedArray;
};

export const convertPublishedAtString = (dateGiven: string) => {
  const timeFormatter = new Intl.RelativeTimeFormat("en", { style: "short" });
  const currentTime = new Date().getTime();
  const givenTime = new Date(dateGiven).getTime();
  const timePassed: number = currentTime - givenTime;

  // Time interval constant variables
  const SECONDS = 1000;
  const MINUTES = SECONDS * 60;
  const HOURS = MINUTES * 60;
  const DAYS = HOURS * 24;

  if (timePassed < MINUTES) {
    return timeFormatter.format(-Math.floor(timePassed / 1000), "seconds");
  } else if (timePassed < HOURS) {
    return timeFormatter.format(
      -Math.floor(timePassed / (1000 * 60)),
      "minutes"
    );
  } else if (timePassed < DAYS) {
    return timeFormatter.format(
      -Math.floor(timePassed / (1000 * 60 * 60)),
      "hours"
    );
  } else {
    return timeFormatter.format(
      -Math.floor(timePassed / (1000 * 60 * 60 * 24)),
      "days"
    );
  }
};
