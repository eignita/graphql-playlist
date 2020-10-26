import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";
import '../index.css';

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [bookid, setBookId] = useState("");
  if (loading) return "loading books ...";
  if (error) return `Error ${error.message}`;
  return (
    <div>
      <ul className="book-list">
        {data.books.map((book) => (
          <li key={book.id} onClick={() => setBookId(book.id)}>{book.name}</li>
        ))}
      </ul>
      <BookDetails bookid={bookid} />
      <div>       
      </div>
    </div>
  );
}

export default BookList;
