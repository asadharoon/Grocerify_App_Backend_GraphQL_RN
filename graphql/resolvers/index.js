const { merge } = require("lodash");
const { resolvers: PostResolver } = require("./posts.resolvers");
const { resolvers: AuthResolver } = require("./user.resolver");
const { resolvers: UserResolver } = require("./users.resolvers");
const resolvers = merge(PostResolver, UserResolver, AuthResolver);
console.log(resolvers);
module.exports = { resolvers };
