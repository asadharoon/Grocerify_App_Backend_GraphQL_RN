// graphql configs
const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");
const { mergeTypes, fileLoader } = require("merge-graphql-schemas");
const { app } = require("./servers/httpServer");
const graphQLResolvers = require("./graphql/resolvers/index");
const path = require("path");
const { db } = require("./db/mongoDB");
const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");
// merging schemas
const typeDefs = mergeTypes(
  fileLoader(path.join(__dirname, "./graphql/typeDefs/"))
);
// making server of graphql for api communications
const schemas = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: graphQLResolvers.resolvers,
});
const apolloServer = new ApolloServer({
  //typeDefs: typeDefs,
  rootValue: { Upload: GraphQLUpload },
  //resolvers: graphQLResolvers.resolvers,
  schema: schemas,
  context: ({ req, res }) => ({ req, res }),
});
apolloServer.applyMiddleware({ app });
//db
db();
