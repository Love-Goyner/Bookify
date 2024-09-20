import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function DetailsPage() {
  const firebase = useFirebase();
  const [imageUrl, setImageUrl] = useState(null);
  const [data, setData] = useState(null);
  const [qty, setQty] = useState(0);
  const param = useParams();

  useEffect(() => {
    firebase.getBookById(param.BookId).then((e) => setData(e.data()));
  }, [firebase, param.BookId]);

  useEffect(() => {
    if (data)
      firebase.getImageUrl(data.imageURL).then((url) => setImageUrl(url));
  }, [firebase, data]);

  const placeOrder = async () => {
    await firebase.placeOrder(param.BookId, qty)
  }

  if (data == null) return <h1 className="text-center my-5">Loading...</h1>;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Book Image */}
        <div className="col-md-6">
          <img
            src={imageUrl}
            className="img-fluid rounded"
            alt={data.bookName}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>

        {/* Book Details */}
        <div className="col-md-6">
          <h1 className="mb-4">{data.bookName}</h1>

          <div className="card shadow p-4 mb-4">
            <h3>Book Details</h3>
            <ul className="list-unstyled">
              <li>
                <strong>Price:</strong> Rs. {data.price}
              </li>
              <li>
                <strong>ISBN Number:</strong> {data.ibnNumber}
              </li>
            </ul>
          </div>

          <div className="card shadow p-4">
            <h3>Owner Details</h3>
            <ul className="list-unstyled">
              <li>
                <strong>Email:</strong> {data.userEmail}
              </li>
            </ul>
          </div>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Qty</Form.Label>
            <Form.Control
              onChange={(e) => setQty(e.target.value)}
              value={qty}
              type="Number"
              placeholder="Enter Qty"
            />
          </Form.Group>
          <Button variant="success" onClick={placeOrder}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
