import React, { useEffect } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { userService } from '_services/user.services';
import { useHistory } from 'react-router-dom';


  function LogIn(props) {
    const [userEmail, setUserEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLogedin, setIsLogedin] = React.useState(true);
    const [submited, setSubmited] = React.useState(false);

    let history = useHistory();

    const handelSubmit = (e) => {
    e.preventDefault()
    setSubmited(true);
    
    if (userEmail && password) {
      userService.LogIn(userEmail, password)
        .then(user => {
          if (user.data.token) {
            localStorage.setItem('token', JSON.stringify(user.data.token))
            localStorage.setItem('userInfo', JSON.stringify(user.data.data))            
            window.location.href = '/admin/dashboard';   
            setIsLogedin(true)
          } else {
            setIsLogedin(false)
          }
      }).catch(err => setIsLogedin(false))
      
    }
  }
    return(
      <Container>
        <h2 className="text-center">Login <i className="fas fa-user"></i></h2>
        <Form>
          <Form.Text
            className={submited && !isLogedin ? 'alert-danger h4 p-3 rounded' : 'd-none'}>
            Username or password is incorrect</Form.Text>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control id="userEmail" name="userEmail" type="email" placeholder="Enter Your Email" onChange={(e=>setUserEmail(e.target.value))} />
            <Alert className={submited && !userEmail ? 'text-danger' : 'd-none'} >Email Is Required</Alert>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control id="password" name="password" type="password" autoComplete="off" placeholder="Password" onChange={(e=>setPassword(e.target.value))} />
            <Alert className={submited && !password ? 'text-danger':'d-none'} >password Is Required</Alert>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handelSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    )
  }

export default LogIn;