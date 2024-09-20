import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';


function Login() {
    const firebase = useFirebase();
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate('/');
        }
    }, [firebase, navigate])

    const loginUser = async (e) =>  {
        e.preventDefault();
        
        const user = await firebase.loginWithEmailandPassword(email, password);
        
        if(user) {
            console.log(user);
        }
    }

    const loginWithGoogle = (e) => {
      e.preventDefault();
      firebase.loginWithGoogle();
      
    }


  return (
    <div className='container my-5'>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> (setEmail(e.target.value))}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> (setPassword(e.target.value))}/>
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={loginUser}>
        Log In
      </Button>
      <Button variant="danger" type="submit" className="m-3" onClick={loginWithGoogle}>
        Log In With Google
      </Button>
    </Form>
    </div>
  )
}

export default Login
