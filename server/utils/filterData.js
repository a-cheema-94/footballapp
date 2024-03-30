// use Set instead of array for faster lookup of properties

const filterObj = (obj1, arr1) => {
  const filteredObj = {};
  const filteredSet = new Set(arr1);

  for(let key in obj1) {
    if(typeof obj1[key] === 'object' && obj1[key] !== null) {
      filteredObj[key] = filterObj(obj1[key], arr1)
    } else if(!filteredSet.has(key)) {
      filteredObj[key] = obj1[key]
    }
  }

  return filteredObj
}

// test

const obj1 = {
  name: 'robert',
  age: 29,
  status: 'injured',
  goals: {
    home: 2,
    away: 3,
    total: 5
  },
  games: {
    appearances: 45,
    minutes: 115,
    position: 'Striker',
    captain: true
  },
}

const propsToFilter = [ 'age', 'home', 'away', 'minutes', 'appearances' ]

console.log(filterObj(obj1, propsToFilter))