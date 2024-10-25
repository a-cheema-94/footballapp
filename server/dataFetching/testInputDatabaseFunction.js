// input data in database function
// todo -> make other helper function to apply for every single data object before db insertion.
// maybe error would occur from order of null defaults for queryParam parameter?
// query param helper function

const sortQueryParam = (queryParam, data) => {
  let query = {};
  if (!queryParam) {
    query.id = data.id;
  } else {
    query[queryParam + ".id"] = data[queryParam].id;
  }
  return query
}


async function inputDataInDatabase (data, Model, queryParam = null) {
  // sort out query param into right query => have to do this for every data entry.

  if(Array.isArray(data)) {
    
    const bulkWriteOperations = data.map(item => {
      const query = sortQueryParam(queryParam, item);

      return {
        updateOne: {
          filter: query,
          update: item,
          upsert: true
        }
      }
    });

    try {
      await Model.bulkWrite(bulkWriteOperations)
    } catch (error) {
      console.error("Error in updating and inserting array of data in database")
    }
  } else {
    const query = sortQueryParam(queryParam, data);
    try {
      await Model.findOneAndUpdate(query, data, { upsert: true });
    } catch (error) {
      console.error("Error in updating and inserting single data object in database")
    }
  }
}



// async function processSingleMongooseQuery(data, Model, queryParam = null) {
//   let query = {};
//   if (!queryParam) {
//     query.id = data.id;
//   } else {
//     query[queryParam + ".id"] = data[queryParam].id;
//   }

//   try {
//     await Model.findOneAndUpdate(query, data, { upsert: true });
//   } catch (error) {
//     console.error("Error in processSingleMongooseQuery function: ", error);
//   }
// }

// // todo => looping through array and inputting in DB is slowing down performance. Use bulkWrite to run the DB inserts in parallel. Understand then implement.
// async function inputDataInDatabase(data, Model, queryParam) {
//   try {
//     if (Array.isArray(data)) {
//       for (let item of data) {
//         // console.time(`testing sorting and filtering of data of ${item}`);
//         await processSingleMongooseQuery(item, Model, queryParam);
//         // console.timeEnd(`testing sorting and filtering of data of ${item}`);
//       }
//     } else {
//       await processSingleMongooseQuery(data, Model, queryParam);
//     }
//   } catch (error) {
//     console.error("Error in inputDataInDatabase function: ", error);
//   }
// }