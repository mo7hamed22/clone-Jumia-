import React, { Component } from 'react';
import { userService } from '_services/user.services';
import NotificationAlert from "react-notification-alert";
import {
  Badge,
  Button,
  Form,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function AddProduct() {
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
      <Row>
        <Col lg="8">
        <Card style={{padding: 10}}>
       
        <NotificationAlert ref={notificationAlertRef} />
        <Form.Group>
          <Form.Label> Prodcut nameEn</Form.Label>
          <Form.Control type="text" name="nameEn" placeholder="Enter product name" onChange={(e) => setName(e.target.value)} />
          <Form.Text className={submited&&!name?'text-danger':'d-none'}>Product name is required.</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label> Prodcut nameAr</Form.Label>
          <Form.Control type="text" name="nameAr" placeholder="Enter product nameAr" onChange={(e) => setName(e.target.value)} />
          <Form.Text className={submited&&!name?'text-danger':'d-none'}>Product nameAr is required.</Form.Text>
        </Form.Group>
        
             
        </Card>
        </Col>

        <Col lg="4">
            <h4>Catrehory</h4>
        </Col>
      </Row>

        <Row>
          <Col lg="12">
          <Button variant="primary" className="btn btn-block" type="submit" onClick={handelSubmit}>
            Add User
          </Button>
      
          </Col>
        </Row>
      </Form>
    </Container>
  )
}


export default AddProduct;