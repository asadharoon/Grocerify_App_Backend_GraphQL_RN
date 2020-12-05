const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    Email: String!
    Password: String!
    Image: String!
    Name: String!
    Balance: Int!
  }
  type Query {
    getUser(email: String!): User!
  }
  input UserInputs {
    email: String!
    password: String!
    name: String!
  }
  type Mutation {
    createUser(user: UserInputs): User!
  }
`;
