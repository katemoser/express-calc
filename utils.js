const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(numString) {
  if(!numString){
    throw new BadRequestError("Nums are required");
  }
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  const nums = numString.split(",").map(n => intifyOrError(n));

  return nums;
}

function intifyOrError(str){
  n = parseInt(str);
  if (!n){
    throw new BadRequestError(`${str} is not a number`);
  }
  return n;
}


module.exports = { convertStrNums };