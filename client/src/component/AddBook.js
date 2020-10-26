import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation,
} from "../queries/queries";

function AddBook() {
  const initialbook = {
    name: "",
    genre: "",
    authorid: "",
  };

  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [book, setbook] = useState(initialbook);
  const [addbook] = useMutation(addBookMutation);
  if (loading) return "loading authors ...";
  if (error) return `Error ${error.message}`;

  const addbookhandler = (e) => {
    e.preventDefault();
    console.log("Book added to collection.", { book });
    addbook({
      variables: {
        name: book.name,
        genre: book.genre,
        authorid: book.authorid,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <div>
      <form id="add-book" onSubmit={(e) => addbookhandler(e)}>
        <input
          placeholder="book name"
          type="text"
          value={book.name}
          onChange={(e) => setbook({ ...book, name: e.target.value })}
        />
        <input
          placeholder="genre"
          type="text"
          value={book.genre}
          onChange={(e) => setbook({ ...book, genre: e.target.value })}
        />
        <select 
          onChange={(e) => setbook({ ...book, authorid: e.target.value })}
        >
          <option>Select Author</option>
          {loading && <option disabled>loading ...</option>}
          {!loading &&
            !error &&
            data.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
        </select>
        <button type="submit">Add book to my collection</button>
      </form>
    </div>
  );
}

export default AddBook;
