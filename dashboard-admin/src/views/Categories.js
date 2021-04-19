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
  const [subCatArray, setSubCatArray] = React.useState([""]);
  const [subCategory, setSubCategory] = React.useState([
    { subCatName, subCatArray },
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
        setCats(data.data);
        setSpinner(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [setCats]); //handelDelete, handesetEditProduct, setEditProduct,setCats -> in need to recall useEffect on delete and at the same time not go inside the infinte loop

  const handelAddSubCatsArr = () => {
    setSubCategory([...subCategory, { subCatName: "", subCatArray: [""] }]);
  };
  const handelAddType = (index) => {
    const newCat = [...subCategory];
    newCat[index].subCatArray.push("");
    setSubCategory(newCat);
  };
  const handelDeleteType = (index, indextype) => {
    const newCat = [...subCategory];
    newCat[index].subCatArray.splice(indextype, 1);
    setSubCategory(newCat);
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
    let category = {
      nameEn,
      nameAr,
      icon,
      subCategory,
    };
    console.log(category);
    Cats_services.createCategory(category).then(
      (data) => {
        alert("Your product has been updated!");
      },
      (err) => {
        console.log(err);
      }
    );
    Cats_services.getAllCats().then(
      (data) => {
        setCats(data.data);
        setSpinner(false);
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
                {subCategory.map((item, index) => (
                  <Form.Group key={index}>
                    <Form.Label>Sub Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="subCatName"
                      id="subCatName"
                      onChange={(e) => {
                        const newSubCat = [...subCategory];
                        newSubCat[index].subCatName = e.target.value;
                        setSubCategory(newSubCat);
                      }}
                    />
                    {item.subCatArray.map((type, x) => (
                      <Form.Group key={index}>
                        <Form.Label>Sub Category Type</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="subCatType"
                          onChange={(e) => {
                            const newType = [...subCategory];
                            newType[index].subCatArray[x] = e.target.value;
                            setSubCategory(newType);
                          }}
                        />
                        <Button
                          variant="danger"
                          onClick={() => handelDeleteType(index, x)}
                        >
                          Remove This Type
                        </Button>
                      </Form.Group>
                    ))}
                    <Button onClick={() => handelAddType(index)}>
                      Add Type
                    </Button>
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
