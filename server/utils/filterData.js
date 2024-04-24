// filter Objects => 3rd party API to database schema.

export const filterObj = (obj1, arr1) => {
  const filteredObj = {};
  const filteredSet = new Set(arr1);

  for(let key in obj1) {
    if(typeof obj1[key] === 'object' && obj1[key] !== null) {
      // Check if current key should be filtered
      if(filteredSet.has(key)) continue
      const nestedPropsToFilter = [...filteredSet].filter(prop => {
        const splitProp = prop.split('.');
        // console.log(splitProp)
        if(splitProp.length > 1 && splitProp[0] === key) {
          return true
        } else {
          return false
        }
      });

      if(nestedPropsToFilter.length > 0) {
        // extract nested property name
        const nestedProp = nestedPropsToFilter.map(prop => prop.split('.').slice(1).join('.'));
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