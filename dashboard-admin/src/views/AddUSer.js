import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { userService } from '_services/user.services';
import NotificationAlert from "react-notification-alert";

function AddUser() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [ConfigPassword, setConfigPassword] = React.useState('');
  const [age, setAge] = React.useState(0);
  const [submited, setSubmited] = React.useState(false);
  const [cart, setCart] = React.useState([ ]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const notificationAlertRef = React.useRef(null);
  const notify = () => {
    var type = "success";
    var options = {};
    options = {
      place: "tc",
      message: (
        <div>
          <div>
            the User You Add Is Success 
          </div>
        </div>
      ),
      type: type,
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  const handelSubmit = (e)=> {
    e.preventDefault();
    setSubmited(true);
    if (name, email, password, ConfigPassword, age) {
      if (password === ConfigPassword) {
        userService.AddUser(name,email,password,age,cart).then(
          data => {
            notify();
            console.log('data',data);
          },
          err => {
            console.log('error',err)
          }
        )
        // console.log("name",name,"\nemail",email,"\npassword",password,"\nage",age,typeof age,"\ncart",cart,"\nisAdmin",isAdmin, typeof isAdmin)
      } else {
        console.log(false);
      }
      
    }
  }
  return (
    <Container>
      <Form>
        <NotificationAlert ref={notificationAlertRef} />
        <Form.Group>
          <Form.Label> User Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter User Name" onChange={(e) => setName(e.target.value)} />
          <Form.Text className={submited&&!name?'text-danger':'d-none'}>User Name Is Required</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label> User Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter User Eamil" onChange={(e)=>setEmail(e.target.value)} />
           <Form.Text className={submited&&!email?'text-danger':'d-none'}>User Email Is Required</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label> User Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter User Password" onChange={(e) => setPassword(e.target.value)} />
          <Form.Text className={submited&&!password?'text-danger':'d-none'}>User Password Is Required</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control type="password" name="confirm-password" placeholder="Enter User Password Again" onChange={(e)=>setConfigPassword(e.target.value)} />
          <Form.Text className={submited&&!ConfigPassword?'text-danger':'d-none'}>Confirm Password Is Required</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label> User Age</Form.Label>
          <Form.Control type="number" name="age" placeholder="Enter User age" onChange={(e)=>setAge(parseInt(e.target.value))} />
          <Form.Text className={submited&&!age?'text-danger':'d-none'}>User Password Is Required</Form.Text>
        </Form.Group>
        {/* <Form.Group>
          <input type="checkbox" onChange={ (e)=>setIsAdmin(!isAdmin) }/> Register User in Admin
        </Form.Group> */}
        <Button variant="primary" type="submit" onClick={handelSubmit}>
            Add User
          </Button>
      </Form>
    </Container>
  )
}


export default AddUser;