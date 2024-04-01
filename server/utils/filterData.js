// filter Objects => 3rd party API to database schema.

// TODO
// new case where prop to remove insides arr1 is an object.

const filterObj = (obj1, arr1) => {
  const filteredObj = {};
  const filteredSet = new Set(arr1);

  for(let key in obj1) {
    if(typeof obj1[key] === 'object' && obj1[key] !== null) {
      // Check if current key should be filtered
      const nestedPropsToFilter = [...filteredSet].filter(prop => {
        const splitProp = prop.split('.');
        if(splitProp.length > 1 && splitProp[0] === key) {
          return true
        } else {
          return false
        }
      });


      if(nestedPropsToFilter.length > 0) {
        // extract nested property name
        const nestedProp = nestedPropsToFilter.map(prop => prop.split('.').slice(1).join(''));
        // recursively call function to handle all of the nested props
        filteredObj[key] = filterObj(obj1[key], nestedProp);
      } else {
        filteredObj[key] = filterObj(obj1[key], filteredSet);
      }

    } else {
      if(!filteredSet.has(key)) {
        filteredObj[key] = obj1[key]
      }
    }
  }

  return filteredObj
}




// test

// const obj1 = {
//   name: 'robert',
//   age: 29,
//   status: 'injured',
//   goals: {
//     home: 2,
//     away: 3,
//     total: 5
//   },
//   total: 3435,
//   away: 343,
//   games: {
//     appearances: 45,
//     minutes: 115,
//     position: 'Striker',
//     captain: true
//   },
// }

// const propsToFilter = [ 'age', 'goals.away', 'goals.total', 'games.appearances', 'games.minutes' ]

const obj1 = {
    id: 1100,
    name: "E. Haaland",
    firstname: "Erling",
    lastname: "Braut Haaland",
    age: 24,
    birth: {
    date: "2000-07-21",
    place: "Leeds",
    country: "England",
    },
    nationality: "Norway",
    height: "194 cm",
    weight: "88 kg",
    injured: false,
    photo: "https://media.api-sports.io/football/players/1100.png"
  }

  const propsToFilter = [ 'birth', 'injured', 'photo' ]

console.log(filterObj(obj1, propsToFilter))