// resolvers functions..
//const posts = require("../../data/posts");
const { authCheck, UserAuthCheck } = require("../../middleware/userAuth");
const UserModel = require("../../models/User.model");
const config = require("config");
const jwt = require("jsonwebtoken");
const {
  LoginUser,
  RegUser,
} = require("../../utils/resolvers/Auth.resolver.utils");

const resolvers = {
  Query: {
    users: () => 30,
    dashboard: async (_, args, { req, res }) => {
      console.log("in dashboard");
      return await UserAuthCheck(req, res)
        .then((e) => {
          console.log("yes loggined");
          return "Dashboard";
          // console.log("e is", e);
        })
        .catch((err) => {
          console.log("err is", err);
          throw new Error(err.message);
        });
    },
  },
  Mutation: {
    loginUser: LoginUser,
    createUser: RegUser,
  },
};
module.exports = { resolvers };
