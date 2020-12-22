const { gql } = require("apollo-server-express");

module.exports = gql`
  input UserInput {
    Email: String!
    Password: String!
  }
  type Query {
    users: Int!
  }
  type Response {
    status: Int!
    message: String!
    token: String
  }
  input createUserInput {
    Email: String!
    Password: String!
    Name: String!
  }
  type Mutation {
    loginUser(user: UserInput): Response!
    createUser(user: createUserInput): User!
  }
`;
