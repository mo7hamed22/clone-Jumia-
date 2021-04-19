import React, { useEffect } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { userService } from "_services/user.services";
function User() {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [userEffect, setUserEffect] = React.useState(
    localStorage.getItem("userInfo")
  );
  const [id, setId] = React.useState(userInfo._id);
  const [name, setName] = React.useState(userInfo.name);
  const [email, setEmail] = React.useState(userInfo.email);
  const [age, setAge] = React.useState(userInfo.age);
  const [cart, setCart] = React.useState(userInfo.cart);

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    userService.findUser(userInfo).then((data) => {
      setUserEffect(data.data);
    });
  }, [setUserEffect]);

  const handelUpdata = (e) => {
    e.preventDefault();
    let user = {
      name,
      email,
      age,
      id,
      cart,
    };
    console.log(user);
    userService.UpdateUser(user).then(
      (data) => {
        if (data.data == "User Updated") {
          userService.findUser(user).then(
            (data) => {
              setUserEffect(data.data);
              localStorage.setItem("userInfo", JSON.stringify(data.data));
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handelUpdata}>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>User Name</label>
                        <Form.Control
                          defaultValue={userEffect.name}
                          placeholder="User name"
                          type="text"
                          id="name"
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>User Email</label>
                        <Form.Control
                          defaultValue={userEffect.email}
                          placeholder="User Emial"
                          type="email"
                          id="email"
                          onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>User Age</label>
                        <Form.Control
                          defaultValue={userEffect.age}
                          placeholder="User age"
                          type="text"
                          id="age"
                          onChange={(e) => setAge(parseInt(e.target.value))}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">{userEffect.name}</h5>
                  </a>
                  <p className="description">{userEffect.age}</p>
                </div>
                <p className="description text-center">{userEffect.email}</p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
