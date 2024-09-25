// TODO => put all in helper function in shared folder for client and server. Go through whole app to look for helper functions that can be used across both client and server and simplify.

export const partArray = (array: any[], partSize: number) => {
  let finalPartedArray = [];
  for(let i=0; i<array.length; i+=partSize) {
    finalPartedArray.push(array.slice(i, i+partSize));
  }

  return finalPartedArray;
}
