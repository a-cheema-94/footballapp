/**
 * Filters properties from a given object based off a list of nested object property paths.
 *
 * @param {Object} objToFilter - Input object to be filtered
 * @param {Array} propsToFilter - Array of property paths to filter, e.g. ["prop1.nestedProp1", "prop2"]
 * @returns {Object} - Outputs a newly filtered object without any of the nested paths inside the propsToFilter array
 */

export const filterObj = (objToFilter, propsToFilter) => {
  const filteredObj = {};

  for (const key of Object.keys(objToFilter)) {
    // BASE CASE

    // Put key in filteredObj if it doesn't match with any nested paths and skip.
    // object keys will be strings inside loop so can use String.startsWith method.
    if (!propsToFilter.some((prop) => prop.startsWith(key))) {
      filteredObj[key] = objToFilter[key];
      continue;
    }
    // Filter out prop if there is an exact match, so skip over.
    if (propsToFilter.includes(key)) continue;

    // modify prop to put in recursive call
    const newPropsToFilter = propsToFilter
      .filter((prop) => prop.split(".")[0] === key)
      .map((filteredProp) => filteredProp.split(".").slice(1).join("."));

    // RECURSIVE CALL
    
    // Ensure only objects get passed to function. NOTE: typeof null === 'object' so we add not null check condition.
    filteredObj[key] =
      objToFilter[key] !== null && typeof objToFilter[key] === "object"
        ? filterObj(objToFilter[key], newPropsToFilter)
        : objToFilter[key];
  }

  return filteredObj;
};
