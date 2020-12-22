const { UserAuthCheck } = require("../../middleware/userAuth");
const UserModel = require("../../models/User.model");
const User = require("../../models/User.model");

const resolvers = {
  Query: {},
  Mutation: {
    getUserfromDB: async (_, args, { req, res }) => {
      console.log("in getusers");
      return await UserAuthCheck(req, res)
        .then(async () => {
          console.log("in then");
          let user = await UserModel.find({ ...args.user });
          console.log(user);
          return user;
        })
        .catch((err) => {
          console.log("in error");
          throw new Error(err.message);
        });
    },
  },
};
module.exports = { resolvers };
