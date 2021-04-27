import React, { useEffect } from "react";
import { orderServic } from "../_services/_orders";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "./styles.css";
const loaderClass = {
  position: "fixed",
  background: "#fff",
  width: "100%",
  zIndex: "11111",
  top: "0",
  height: "100%",
  textAlign: "center",
};

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [spinner, setSpinner] = React.useState(true);

  useEffect(() => {
    orderServic.getAllOrders().then(
      (data) => {
        setOrders(data.data);
        setSpinner(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <>
      {spinner ? (
        <div style={loaderClass}>
          <img src={require("assets/img/loading.gif").default} />
        </div>
      ) : (
        ""
      )}
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Orders Details</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">orderDate</th>
                      <th className="border-0">orderFunds</th>
                      <th className="border-0">userId</th>
                      <th className="border-0">paymentId</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.orderDate}</td>
                        <td>{item.orderFunds}</td>
                        <td>{item.userId}</td>
                        <td>{item.paymentId}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Orders;
