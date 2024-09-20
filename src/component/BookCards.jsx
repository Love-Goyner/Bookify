import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";

function BookCards(props) {
  const firebase = useFirebase();
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    firebase.getImageUrl(props.imageURL).then((url) => setImageUrl(url));
  });

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{props.bookName}</Card.Title>
        <Card.Text>
          This book has a title "{props.bookName}" and this book is sold by "
          {props.userEmail}"{props.displayName} and this book costs Rs.
          {props.price}
        </Card.Text>
        <Button variant="primary" onClick={e => navigate(props.link)}>View</Button>
      </Card.Body>
    </Card>
  );
}

export default BookCards;
