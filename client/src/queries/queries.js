import { gql } from "@apollo/client";

export const getBooksQuery = gql`
  query books {
    books {
      name
      genre
      id
    }
  }
`;

export const getBookQuery = gql`
  query book($id: ID!) {
    book(id: $id) {
      name
      genre      
      author {
        name
      }
    }
  }
`;

export const getAuthorsQuery = gql`
  query authors {
    authors {
      id
      name
    }
  }
`;

export const addBookMutation = gql`
  mutation addBook($name: String!, $genre: String!, $authorid: String!) {
    addBook(name: $name, genre: $genre, authorid: $authorid) {
      name
      genre
    }
  }
`;
