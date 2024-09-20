import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./component/Navbar";
import ListingPage from "./pages/ListingPage";
import Home from "./pages/Home";
import DetailsPage from "./pages/DetailsPage";
import MyBooks from "./pages/MyBooks";
import OrderedBook from "./pages/OrderedBook";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/book/list" element={<ListingPage />} />
      <Route path="/book/view/:BookId" element={<DetailsPage/>} />
      <Route path="/Mybooks" element={<MyBooks/>} />
      <Route path="/books/orders/:BookId" element={<OrderedBook/>} />
    </Routes>
    </>
  );
}

export default App;
