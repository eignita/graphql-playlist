import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

function BookDetails(props) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: props.bookid },
  });

  if (loading) return `loading book detail`;
  if (error) return `${error}`;

  return (
    <div>
      BOOK DETAILS -<h3>{data.book.name}</h3>
      {data.book.genre}
      <p>
        Written by <i>{data.book.author.name}</i>
      </p>
    </div>
  );
}

export default BookDetails;
