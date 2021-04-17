import React, { useEffect } from "react";
import { Cats_services } from "../_services/cats_services";
import { useHistory } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import {
  Button,
  Form,
  Modal,
  Card,
  Table,
  Accordion,
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

function Categories() {
  const [cats, setCats] = React.useState([]);
  const [spinner, setSpinner] = React.useState(true);
  const notificationAlertRef = React.useRef(null);
  const [nameEn, setNameEn] = React.useState("");
  const [nameAr, setNameAr] = React.useState("");
  const [icon, setIcon] = React.useState("");

  const [show, setShow] = React.useState(false);
  const [subCatName, setSubCatName] = React.useState("");
  const [subCatType, setSubCatType] = React.useState([""]);
  const [subCatsArr, setSubCatsArr] = React.useState([
    { subCatName, subCatType },
  ]);
  const handleClose = (subCatsArr) => {
    setShow(false);
    console.log(subCatsArr);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handelDelete = (id) => {
    let cfm = confirm("Are you sure you want to delete this item?", true);
    if (cfm) {
      productService.deleteProduct(id).then(
        (data) => {
          notify();
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert("Your item is safe now :)");
    }
  };

  useEffect(() => {
    Cats_services.getAllCats().then(
      (data) => {
        //console.log(data.data);
        setCats(data.data);
        setSpinner(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []); //handelDelete, handesetEditProduct, setEditProduct,setCats -> in need to recall useEffect on delete and at the same time not go inside the infinte loop

  const handelAddSubCatsArr = () => {
    setSubCatsArr([...subCatsArr, { subCatName: "", subCatArray: [""] }]);
  };
  const handelAddType = () => {
    setSubCatType([...subCatType, ""]);
  };

  const notify = () => {
    var type = "danger";
    var options = {};
    options = {
      place: "tc",
      message: <div>Product has been deleted!</div>,
      type: type,
      autoDismiss: 4,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    Cats_services.createCategory({
      nameEn,nameAr,icon,subCatsArr
    }).then(
      (data) => {
        alert("Your product has been updated!"); //.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
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
          <NotificationAlert ref={notificationAlertRef} />
          <Col lg="12" className="mb-3">
            <Button
              onClick={() => handleShow()}
              className="btn float-right btn-sm btn-outline-info"
            >
              Add new <i className="fas fa-plus"></i>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className="border">
              <Card.Body>
                <Accordion defaultActiveKey="0">
                  {cats.map((item, index) => (
                    <Card key={index}>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="block btn-primary"
                          eventKey={`"${index}"`}
                        >
                          {item.nameEn}
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={`"${index}"`}>
                        <Card.Body>
                          {item.subCategory.map((row, index) => (
                            <details key={index}>
                              <summary>{row.subCatName}</summary>
                              <ul>
                                {row.subCatArray.map((arr, index) => (
                                  <li key={index}>{arr}</li>
                                ))}
                              </ul>
                            </details>
                          ))}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  ))}
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Body>
          <form>
            <Row>
              <Col md="8">
                <Form.Group>
                  <Form.Label> Main Category nameEn</Form.Label>
                  <Form.Control
                    type="text"
                    name="nameEn"
                    placeholder="Enter product name"
                    onChange={(e) => setNameEn(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label> Main Category nameAr</Form.Label>
                  <Form.Control
                    type="text"
                    name="nameEn"
                    placeholder="Enter product nameAr"
                    onChange={(e) => setNameAr(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label> Main Category icon</Form.Label>
                  <Form.Control
                    type="text"
                    name="icon"
                    placeholder="Enter product icon"
                    onChange={(e) => setIcon(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col lg="4">
                {subCatsArr.map((item, index) => (
                  <Form.Group key={index}>
                    <Form.Label>Sub Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="subCatName"
                      onChange={(e) => setSubCatName(e.target.value)}
                    />
                    {subCatType.map((type, index) => (
                      <Form.Group>
                        <Form.Label>Sub Category Type</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="subCatType"
                          onBlur={(e) => {
                            const newType = [...subCatType];
                            newType[index] = e.target.value;
                            setSubCatType(newType);
                          }}
                        />
                      </Form.Group>
                    ))}
                    <Button onClick={handelAddType}>Add Type</Button>
                  </Form.Group>
                ))}
                <Button onClick={handelAddSubCatsArr}>Add Sub Category</Button>
              </Col>
            </Row>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Add Category
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Categories;
