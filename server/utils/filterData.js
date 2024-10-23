// filter Objects => 3rd party API to database schema.

// [ 'team.logo', 'league', 'games.lineups', 'games.number', 'games.rating', 'substitutions.bench', 'duels.total', 'cards.yellowred', 'penalty.won', 'penalty.commited' ]

export const filterObj = (obj1, arr1) => {
  const filteredObj = {};
  const filteredSet = new Set(arr1); // Set of props to filter

  // iterate over all keys in data object
  for (let key in obj1) {
    // doesn't
    if (obj1[key] !== null && typeof obj1[key] === "object") {
      if (filteredSet.has(key)) continue;

      // filter out all props that are not needed, i.e. do not match the current key.
      // could have an array of props to filter that have multiple entries for the same field. I.e. games.lineups and games.number => both have nested fields inside games.
      const nestedPropsToFilter = [...filteredSet].filter((prop) => {
        const splitProp = prop.split("."); // could be an array of just one or many different props.

        if (splitProp.length > 1 && splitProp[0] === key) {
          return true;
        } else {
          return false;
        }
      });

      if (nestedPropsToFilter.length > 0) {
        // extract nested property name
        const nestedProp = nestedPropsToFilter.map((prop) =>
          prop.split(".").slice(1).join(".")
        );
        // recursively call function to handle all of the nested props
        filteredObj[key] = filterObj(obj1[key], nestedProp);
      } else {
        filteredObj[key] = filterObj(obj1[key], filteredSet);
      }
    } else {
      // if this condition is NOT met then the key is filtered out, by not inputting it into the filteredObj.
      if (!filteredSet.has(key)) {
        // if the current key is not in the filtered set of 'props to filter' then we just copy the key value pair to the new filtered object, otherwise this prop is skipped and filtered out of the object.
        filteredObj[key] = obj1[key];
      }
    }
  }

  return filteredObj;
};

// const sampleObject = {
//   prop1: "value1",
//   prop2: {
//     nestedProp1: "value2-1",
//     nestedProp2: "value2-2",
//   },
//   prop3: "value3",
//   prop4: {
//     nestedProp1: "value4-1",
//     nestedProp2: {
//       nestedProp3: "value4-3",
//       nestedProp4: "value4-4",
//     },
//   },
//   prop5: "value5"
// };

// const propsToFilter = [
//   'prop1',
//   'prop2.nestedProp1',
//   'prop3',
//   'prop4.nestedProp2.nestedProp3'
// ];

// // const result = filterObj(sampleObject, propsToFilter);
// // console.log(result)

// // function filterObject2(object, propsToFilter) {
// //   const newObj = JSON.parse(JSON.stringify(object)); // Deep clone the object

// //   propsToFilter.forEach(path => {
// //     const keys = path.split('.');
// //     let current = newObj;

// //     for (let i = 0; i < keys.length; i++) {
// //       const key = keys[i];

// //       // If we are at the last key, delete the property
// //       if (i === keys.length - 1) {
// //         delete current[key];
// //       } else if (current[key]) {
// //         current = current[key]; // Move deeper into the object
// //       }
// //     }
// //   });

// //   return newObj;
// // }

// // const result2 = filterObject2(sampleObject, propsToFilter);
// // console.log(result2)

// const largeSampleObject = {
//   prop1: {
//     nestedProp1: {
//       nestedProp2: {
//         nestedProp3: "value1-3",
//         nestedProp4: "value1-4",
//       },
//       nestedProp5: "value1-5",
//     },
//     nestedProp6: "value1-6",
//   },
//   prop2: {
//     nestedProp1: {
//       nestedProp2: "value2-2",
//       nestedProp3: "value2-3",
//     },
//     nestedProp4: "value2-4",
//   },
//   prop3: "value3",
//   prop4: {
//     nestedProp1: {
//       nestedProp2: {
//         nestedProp3: {
//           nestedProp4: "value4-4",
//           nestedProp5: "value4-5",
//         },
//         nestedProp6: "value4-6",
//       }
//     }
//   },
//   prop5: "value5",
// };

// const propsToFilter2 = [
//   'prop1.nestedProp1.nestedProp2.nestedProp3',
//   'prop1.nestedProp1.nestedProp5',
//   'prop1.nestedProp6',
//   'prop2.nestedProp1.nestedProp2',
//   'prop2.nestedProp1.nestedProp3',
//   'prop2.nestedProp4',
//   'prop3',
//   'prop4.nestedProp1.nestedProp2.nestedProp3.nestedProp5',
//   'prop4.nestedProp1.nestedProp2.nestedProp6',
//   'prop4.nestedProp1.nestedProp2',
//   'prop6',
//   'prop7.nestedProp1.nestedProp2.nestedProp3',
//   'prop7.nestedProp1.nestedProp2.nestedProp4',
//   'prop7.nestedProp1.nestedProp5',
//   'prop7.nestedProp6',
//   'prop8',
//   'prop9.nestedProp1',
//   'prop9.nestedProp2.nestedProp3',
//   'prop9.nestedProp2.nestedProp4',
//   'prop10.nestedProp1.nestedProp2',
//   'prop10.nestedProp3',
//   'prop11.nestedProp1',
//   'prop11.nestedProp2.nestedProp3',
//   'prop12',
//   'prop13.nestedProp1.nestedProp2',
//   'prop13.nestedProp3',
//   'prop14.nestedProp1.nestedProp2.nestedProp3',
//   'prop14.nestedProp1.nestedProp4',
//   'prop15',
//   'prop15.nestedProp1.nestedProp2.nestedProp3.nestedProp5'
// ];

// console.log(filterObj(largeSampleObject, propsToFilter2))
// // console.log(filterObject2(largeSampleObject, propsToFilter2))
