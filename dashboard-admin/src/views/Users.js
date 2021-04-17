import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
// react-bootstrap components

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { userService } from "_services/user.services";
const loaderClass = {
  position: "fixed",
  background: "#fff",
  width: "100%",
  zIndex: "11111",
  top: "0",
  height: "100%",
  textAlign: "center",
};

function Users() {
  const [users, setUsers] = React.useState([]);
  const [spinner, setSpinner] = React.useState(true);
  const handelDelete = (email) => {
    // console.log(email);
    userService.DeleteUser(email).then(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
    userService.GetAllUsers().then(
      (data) => {
        setUsers(data.data);
        setSpinner(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  useEffect(() => {
    userService.GetAllUsers().then(
      (data) => {
        setUsers(data.data);
        setSpinner(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [setUsers]);

  let history = useHistory();
  const gotToAddUser = () => {
    history.push("/admin/adduser");
  };

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
          <Col lg="12" className="mb-3">
            <Button
              onClick={gotToAddUser}
              className="btn float-right btn-sm btn-outline-info"
            >
              Add new <i className="fas fa-plus"></i>
            </Button>
          </Col>
        </Row>
        <Row>
          {users.map((user, index) => (
            <Col lg="3" sm="6" key={index}>
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-circle-09 text-warning"></i>
                        <i className="d-none"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <Card.Title as="h4">{user.name}</Card.Title>
                        <p className="card-category">{user.age} Years</p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <hr></hr>
                <Card.Footer className="d-flex justify-content-between">
                  <div
                    className="stats"
                    style={{ cursor: "pointer" }}
                    onClick={() => handelDelete(user.email)}
                  >
                    <i className="fas fa-trash text-danger mr-1"></i>
                    Delete
                  </div>
                  <div className="stats" style={{ cursor: "pointer" }}>
                    <i className="fas fa-edit text-primary mr-1"></i>
                    Edit
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>

    // <>
    //   <Container fluid>
    //     <Row>
    //       <Col md="12">
    //         <Card className="strpied-tabled-with-hover">
    //           <Card.Header>
    //             <Card.Title as="h4">Users Table with Hover</Card.Title>
    //             <p className="card-category">
    //               Here is a subtitle for this table
    //             </p>
    //           </Card.Header>
    //           <Card.Body className="table-full-width table-responsive px-0">
    //             <Table className="table-hover table-striped">
    //               <thead>
    //                 <tr>
    //                   <th className="border-0">ID</th>
    //                   <th className="border-0">Name</th>
    //                   <th className="border-0">Email</th>
    //                   <th className="border-0">Age</th>
    //                   <th className="border-0">Cart</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {users.map((user) => <tr>
    //                   <td>{user._id}</td>
    //                   <td>{user.name}</td>
    //                   <td>{ user.email }</td>
    //                   <td>{user.age}</td>
    //                   <td>{ user.cart.length==0?'Empty':user.cart }</td>
    //                 </tr>)}
    //               </tbody>
    //             </Table>
    //           </Card.Body>
    //         </Card>
    //       </Col>

    //     </Row>
    //   </Container>
    // </>
  );
}

export default Users;
