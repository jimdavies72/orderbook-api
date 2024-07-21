exports.reqFilter = (fKey, fValue, includeComplete ) => {
  let filter = {
      [fKey]: fValue,
  };

  if (!includeComplete) {
    //we do want to filter out those that are complete
    filter.complete = false;
  };

  filter = {containers: { $elemMatch: filter}}
  
  return filter;
};