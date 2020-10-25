const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql;

//dummy data
/*
var books = [
  { name: "Follow the wind", genre: "Fantasy", id: "1", authorid: "1" },
  { name: "The final Empire", genre: "Sci-Fi", id: "2", authorid: "2" },
  { name: "The forbiden kingdom", genre: "Fantasy", id: "3", authorid: "3" },
  { name: "Pursuit of happiness", genre: "Fantasy", id: "4", authorid: "2" },
  { name: "Wonderful smile", genre: "Sci-Fi", id: "5", authorid: "2" },
  { name: "Paycheck gone", genre: "Fantasy", id: "6", authorid: "3" },
];

var authors = [
  { name: "Patrik Rothfuss", age: 43, id: "1" },
  { name: "Brandon Sanders", age: 39, id: "2" },
  { name: "Tony Bright", age: 56, id: "3" },
];
*/
const BookType = new GraphQLObjectType({
  name: "Book",
  //fields accepts a function as fields can reference other fields
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorid });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorid: parent.id });
      },
    },
  }),
});

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
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: { name: { type: GraphQLString }, age: { type: GraphQLInt } },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
