const jwt = require("jsonwebtoken");
const config = require("config");
const UserAuthCheck = async (req, res, next = (f) => f) => {
  let token = req.header("x-auth-token");
  // console.log(req.headers, req.header("x-auth-token"));
  //console.log("token is", token);
  if (token) {
    try {
      console.log("in verifying");
      await jwt.verify(
        token,
        config.get("User.jwtPrivateKey"),
        (err, decoded) => {
          // console.log("err", err);
          if (err) {
            if (err.name == "TokenExpiredError") {
              throw (new Error("TimeOut.Please Login Again").name = "Expired");
              //      return { status: 400, message: "TimeOut.Please Login Again" };
            } else if (err.name == "JsonWebTokenError") {
              throw (new Error("Invalid Authentication.").name = "Expired");
            }
          } else {
            console.log("in else");
            next();
          }
          //console.log("err.name", err.name);
        }
      );
      //  next();
    } catch (err) {
      console.log("in err", err);
      throw new Error("Invalid Authentication");
    }
  } else {
    throw new Error("Not Authorized");
    //  next();
    //return { status: 400, message: "Not Authorized" };
  }
};
module.exports = { UserAuthCheck };
