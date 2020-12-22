// resolvers functions..
const posts = require("../../data/posts");
const { UserAuthCheck } = require("../../middleware/userAuth");
const allPosts = () => posts;

const resolvers = {
  Query: {
    totalPosts: async (parent, args, { req, res }) => {
      UserAuthCheck(req, res);
      return posts.length;
    },
    allPosts,
  },
  Mutation: {
    createPost: (_, args) => {
      //  console.log(args);
      let { title, description } = args.newPost;
      let post = {
        title,
        description,
        id: posts.length + 1,
      };
      posts.push(post);
      return posts;
    },
  },
};
module.exports = { resolvers };
