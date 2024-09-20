import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';


function Register() {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async (e) =>  {
        e.preventDefault();
        
        const user = await firebase.signUpWithEmailandPassword(email, password);
        
        if(user) {
            console.log(user);
        }
    }

    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate('/');
        }
    }, [firebase, navigate])

  return (
    <div className='container my-5'>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> (setEmail(e.target.value))}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> (setPassword(e.target.value))}/>
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={registerUser}>
        Register User
      </Button>
    </Form>
    </div>
  )
}

export default Register
