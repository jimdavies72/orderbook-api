exports.popOptions = (path, includeComplete, fieldsExcluded, deepPop={}) => {
  
  let popOptions = {path: path};

  if (includeComplete === false) {
    //we do want to filter out those that are complete
    popOptions.match = {complete: false};
  };

  if (fieldsExcluded) {
    if (Object.prototype.toString.call(fieldsExcluded) == '[object Array]') {
      let fieldList = "";
      fieldsExcluded.forEach(field => {
        fieldList += "-" + field + " ";
      });

      popOptions.select = fieldList.trim();
    };
  };

  if (Object.keys(deepPop).length > 0) {
    popOptions.populate = deepPop;
  };

  return popOptions;
};

const toISODate = () => {
  const date = new Date().toISOString();
  console.log(date);
}

toISODate();
