import {Router} from "express"
// import {logoutUser, refreshAccessToken, registerUser, verifyEmail} from "../controllers/auth.controllers.js"
import { validate } from "../middlewares/validator.middleware.js";
import { userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
  userResetForgotPasswordValidator, } from "../validators/index.js";
import {changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  login,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgotPassword,
  verifyEmail} from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser); // so it first calls validator, if any errors or next will be passed on to the middleware, and if no errors request reaches to the registerUser

//login route
router.route("/login").post(userLoginValidator(), validate, login);

router.route("/verify-email/:verificationToken").get(verifyEmail);

router.route("/refresh-token/:verificationToken").post(refreshAccessToken);

router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);

router
  .route("/reset-password/:resetToken")
  .post(userResetForgotPasswordValidator(), validate, resetForgotPassword);


//secure route
router.route("/logout").post(verifyJWT, logoutUser);


export default router;