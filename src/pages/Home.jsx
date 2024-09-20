import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCards from "../component/BookCards";

function Home() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [loggedIn, setLoogedIn] = useState(false);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      setLoogedIn(true);
    }else{
        setLoogedIn(false);
    }
  }, [firebase.isLoggedIn, loggedIn]);

  useEffect(() => {
    firebase.allBooksListed().then((books) => setBooks(books.docs));
  }, [firebase]);

  return (
    <>
      <div>
        {!loggedIn && (
          <>
            <h2 className="text-center">Login To See Books</h2>
          </>
        )}
      </div>
      {loggedIn && (
        <div
          className="container mt-4 "
          style={{ display: "flex", gap: "20px" }}
        >
          {books.map((book) => (
            <BookCards link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()} />
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
