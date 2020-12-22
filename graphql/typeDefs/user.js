const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    Email: String!
    Password: String!
    Image: String!
    Name: String!
    Cart: [CartProduct!]!
    Balance: Int!
  }
  type CartProduct {
    ProductID: ID!
    Quantity: Int!
    Total: Int!
  }
  input Carts {
    ProductID: ID!
    Quantity: Int!
    Total: Int!
  }
  type Query {
    getUserfromDB(user: UserInputsforGet): User!
    dashboard: String!
  }
  input UserInputsforGet {
    Email: String
    Password: String
    Name: String
  }
  type Mutation {
    addToCart(user: String!, Cart: [Carts!]!): String!
    getUserfromDB(user: UserInputsforGet): [User!]!
  }
`;
