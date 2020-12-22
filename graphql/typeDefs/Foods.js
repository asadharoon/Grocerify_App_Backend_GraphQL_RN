const { gql, makeExecutableSchema } = require("apollo-server-express");
makeExecutableSchema;
module.exports = gql`
  scalar Upload
  type Product {
    id: ID!
    Capacity: String!
    Name: String!
    DiscountedPrice: Int!
    Price: Int!
    Image: [String!]!
    Category: String!
    Discount: Int!
    Quantity: Int!
    StoreName: String!
    StoreAddress: String!
    Discontinued: Boolean!
    Description: String!
  }

  type Query {
    getSingleProduct(id: String!): Product!
    getAllProducts(page: Int!): [Product!]! # for homepage
    getProducts(product: GetProductInput): [Product!]! # for search
    getProductByCategory(Category: String!, page: Int!): [Product!]! # for category search
  }
  input DelProdInput {
    id: String!
  }
  input UpdateProdInput {
    Name: String!
    Price: Int!
    Image: Upload!
    Category: String!
    Discount: Int!
    Quantity: Int!
    StoreID: String!
    ProdID: String!
    Discontinued: Boolean!
    Description: String!
    DiscountedPrice: Int!
  }
  input ProductInput {
    Name: String!
    Price: Int!
    file: Upload!
    Discount: Int!
    Quantity: Int!
    Category: String!
    Discontinued: Boolean!
    Description: String!
    DiscountedPrice: Int!
  }
  input GetProductInput {
    Name: String
    StoreName: String
    Price: Int
    Discount: Int
    Discontinued: Boolean
    StoreAddress: String
    page: Int!
    DiscountedPrice: Int!
  }
  # mutations
  type Mutation {
    addProduct(product: ProductInput): Product!
    deleteProduct(product: DelProdInput): String!
    updateProduct(product: UpdateProdInput): Product!
  }
`;
