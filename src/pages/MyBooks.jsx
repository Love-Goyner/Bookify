import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCard from "../component/BookCards";

function MyBooks() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (firebase.isLoggedIn)
      firebase
        .fetchMyBooks(firebase.user.uid)
        ?.then((books) => setBooks(books.docs));
  }, [firebase]);

  if (!firebase.isLoggedIn) return <h1>Please log in</h1>;

  return (
    
      <div className="container mt-4 "
      style={{ display: "flex", gap: "20px" }}>
      {books.map((book) => (
        <BookCard
          link={`/books/orders/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
    
  )
}

export default MyBooks
