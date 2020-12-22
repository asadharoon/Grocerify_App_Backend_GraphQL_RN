const UserModel = require("../../models/User.model");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { GenUserPassword } = require("../GenHashPassword.utils");
const RegUser = async (_, args, { req, res }) => {
  let user = await UserModel.findOne({ Email: args.user.Email });
  //console.log("user is", user);
  if (!user) {
    let password = await GenUserPassword(args.user.Password);
    let u2 = new UserModel({
      ...args.user,
      Image: "https://via.placeholder.com/200x200.png?text=Profile",
      Balance: 0,
      Password: password,
    }).save();
    return u2;
  } else return user;
};

const LoginUser = async (_, args, { req, res }) => {
  console.log("in login User", args);
  let u = await UserModel.findOne({ Email: args.user.Email });
  if (u) {
    let p = await bcrypt.compare(args.user.Password, u.Password);
    console.log("p is", p);
    if (p) {
      let token = jwt.sign(
        { _id: u.id, name: u.Name, role: "User" },
        config.get("User.jwtPrivateKey"),
        { expiresIn: "2 days" }
      );
      return { status: 200, message: "Logined Successfully", token: token };
    } else {
      throw new Error("Invalid Password");
    }
  } else {
    throw new Error("User Not Found");
  }
};
module.exports = { LoginUser, RegUser };
