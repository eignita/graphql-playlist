import React from "react";
import { gql, useQuery } from "@apollo/client";

const getBooksQuery = gql`
  query books {
    books {
      name
      id
    }
  }
`;

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  console.log(data);
  return (
    <div>
      <ul id="book-list"></ul>
    </div>
  );
}

export default BookList;
