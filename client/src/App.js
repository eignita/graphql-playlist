import BookList from "./component/BookList";
import { ApolloProvider } from "@apollo/client";

function App() {
  return (
    <div id="main">
      <h1>Sam's Reading List</h1>
      <BookList />
    </div>
  );
}

export default App;
