import React, { useEffect } from "react";
import { productService } from "../_services/product_services";
import { Cats_services } from "../_services/cats_services";
import { userService } from "_services/user.services";

import { Card, Table, Container, Row, Col } from "react-bootstrap";

function Dashboard() {
  const [products, setProducts] = React.useState([]);
  const [cats, setCats] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    productService.getAllProducts().then(
      (data) => {
        setProducts(data.data);
      },
      (err) => {
        console.log(err);
      }
    );

    Cats_services.getAllCats().then(
      (data) => {
        setCats(data.data);
      },
      (err) => {
        console.log(err);
      }
    );

    userService.GetAllUsers().then(
      (data) => {
        setUsers(data.data);
      },
      (err) => {
        console.log;
      }
    );
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-circle-09 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Users</p>
                      <Card.Title as="h4">{users.length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Products</p>
                      <Card.Title as="h4">{products.length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Categories</p>
                      <Card.Title as="h4">{cats.length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="12">
            <h4>Recent 5 Users</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User naame</th>
                  <th>User age</th>
                  <th>User email</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 5).map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          <Col lg="12">
            <h4>Recent 5 Products</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product naame</th>
                  <th>Product price</th>
                  <th>Product quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.nameEn}</td>
                    <td>{product.price}$</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
