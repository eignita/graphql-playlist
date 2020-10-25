const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = graphql;

//dummy data
var books = [
  { name: "Follow the wind", genre: "Fantasy", id: "1" },
  { name: "The final Empire", genre: "Sci-Fi", id: "2" },
  { name: "The forbiden kingdom", genre: "Fantasy", id: "3" },
];

var authors = [
  { name: "Patrik Rothfuss", age: 43, id: 1 },
  { name: "Brandon Sanders", age: 39, id: 2 },
  { name: "Tony Bright", age: 56, id: 3 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  //fields accepts a function as fields can reference other fields
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// const AuthorType = new GraphQLObjectType({
//     name: 'Author',
//     fields: 
// })

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  //fields is not a function as all request are seperate and not reference with each other.
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //resolve  - write code to get data from db /other sources.
        //parent will come into to play when we start looking relation with data
        return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
