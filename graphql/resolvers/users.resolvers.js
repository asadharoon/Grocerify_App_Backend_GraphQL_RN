const User = require("../../models/User.model");

const resolvers = {
  Query: {},
  Mutation: {
    createUser: async (_, args) => {
      let user = await User.findOne({ email: args.email });
      console.log("in creatuser", args, user ? user : "asad");

      let { email, name, password } = args.user;

      return user
        ? user
        : new User({
            Email: email,
            Password: password,
            Name: name,
            Image: "https://via.placeholder.com/200x200.png?text=Profile",
            Balance: 0,
          }).save();
    },
  },
};
module.exports = { resolvers };
