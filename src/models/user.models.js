import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import 'dotenv/config'; // loads .env into process.env

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String, // url that be stored in db that points where photo is stored
        localPath: String, // where it is stored in local storage
      },
      default: {
        url: `https://placehold.co/200x200`,
        localPath: ""
      }
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    fullName: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"] // custom error will be displayed if password is not entered

    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    refreshToken: {
      type: String
    },
    forgotPasswordToken: {
      type: String
    },
    forgotPasswordExpiry: {
      type: Date
    },
    emailVerificationToken: {
      type: String
    },
    emailVerificationExpiry: {
      type: Date
    }
  },
  {
    timestamps: true,
  }
); // creates a new schema

// pre hook, dont use arrow function bcoz we may need context
userSchema.pre("save", async function(next){
  // only do the hashing when password is added or updated
  if(!this.isModified("password")){
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10) // 10 is number of rounds of hashing
  next();
});

//schema methods, these kind of methods need to be in schema itself
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password); // returns true or false
}

//generate access token
userSchema.methods.generateAccessToken = function(){
  console.log("Generating access token");
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username // all this is called as payload
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
  )
}

// generate refresh token, refersh token usually doesnt need much payload
userSchema.methods.generateRefreshToken = function(){
  console.log("Generating refresh token");
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
  )
}

// without data token which are temp tokens using node js crypto module to validate user or reset password
userSchema.methods.generateTempToken = function(){
  const unhashToken = crypto.randomBytes(20).toString("hex"); //unhash token
  //20 random bytes, and cryptp generate hex values which is converted to string

  // since we store in db, better to hash it
  const hashToken = crypto.createHash("sha256").update(unhashToken).digest("hex");

  const tokenExpiry = Date.now() + (20*60*1000) //20 mins
  return {unhashToken, hashToken, tokenExpiry};

} 
export const User = mongoose.model("User", userSchema); // exporting it so later we can use it whereever we want to.
