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
}


exports.isRo = (responseObject = undefined) => {
  // is response object
  if (responseObject && responseObject.length > 0) {
    return true;
  };
  
  return false;
};

exports.properString = (string) => {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch (error) {
    console.log(error.message);
  };
};
