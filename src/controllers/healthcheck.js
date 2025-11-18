import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// const healthCheck = (req, res) => {
//   try {
//     res
//       .status(200)
//       .json(new ApiResponse(200, {message: "Server is running"}));
//   }catch(err){

//   }
// }

// commented out above to show use of async handler

/*
const healthCheck = async (req, res, next) => {
  try {
    const user = await getUserFromDB() // lets assume we need to get user before the response and since db can be any part of the world, we need to put await and fucntion need to be async.
    res
      .status(200)
      .json(new ApiResponse(200, {message: "Server is running"}));
  }catch(err){
    next(err)
    // and when a db is called, we first need to worry about any errors it can cause
  }
}
  */

// commented above to use asyncHandler
// we can avoid too many try catches with one handler.

const healthCheck = asyncHandler(async (req, res) => {
    res
      .status(200)
      .json(new ApiResponse(200, {message: "Server is running"}));
});

export {healthCheck};