import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/firebase';

function OrderedBook() {
  const firebase = useFirebase();
  const param = useParams();
  const [bookName, setBookName] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => { 
    firebase.orderedBooks(param.BookId).then(order => setOrders(order.docs));
    firebase.getBookName(param.BookId).then(value => setBookName(value.data().bookName));
  }, [firebase, param.BookId])

  console.log(orders);
  

  return (
    <div className="container mt-3">
      <h1>Orders for {bookName}</h1>
      {orders.map((order) => {
        const data = order.data();
        return (
          <div
            key={order.id}
            className="mt-5"
            style={{ border: "1px solid", padding: "10px" }}
          >
            <h5>Order By: {data.userEmail}</h5>
            <h6>Qty: {data.qty}</h6>
          </div>
        );
      })}
    </div>
  )
}

export default OrderedBook
