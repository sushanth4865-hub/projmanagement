// this is a higher order function because in the input itself we are taking function and returning a function

//next(err) is the express inbuilt error handling.
// so now we dont have to write try catches at all codes, rather call this

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise
    .resolve(requestHandler(req, res, next))
    .catch((err) => next(err))
  }
};

export {asyncHandler};