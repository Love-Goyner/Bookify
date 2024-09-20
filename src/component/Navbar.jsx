import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useFirebase } from '../context/firebase';
import { Link } from 'react-router-dom';

function MyNavbar() {
    const firebase = useFirebase();
    const [loggedIn, setLoogedIn] = useState(false);
    useEffect(()=> {
        if(firebase.isLoggedIn){
            setLoogedIn(true);
        }
    },[firebase.isLoggedIn, loggedIn])

    const handleLogout = async () => {
        await firebase.logoutUser();
        setLoogedIn(false);
    }

  return (
    <div>
      <Navbar className="bg-black">
        <Container className="text-white mx-3">
          <Navbar.Brand href="/" className="text-white ms-0">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
              <Nav.Link as={Link} to="/book/list" className="text-white">Add Listing</Nav.Link>
              <Nav.Link as={Link} to="/MyBooks" className="text-white">My Books Orders</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {!loggedIn &&
                <>
                    <Button as={Link} to="/login" variant="outline-light" className="me-2">Login</Button>
                    <Button as={Link} to="/register" variant="outline-light">Sign In</Button>
                </>
              }
              {loggedIn && 
                <Button variant="outline-light" className="me-2" onClick={handleLogout}>Logout</Button>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
