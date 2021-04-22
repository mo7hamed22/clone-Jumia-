import React, { useEffect } from "react";
import { Setting_ser } from "../_services/_settings";
import { useHistory } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import {Button,Form,Modal,Card,Table,InputGroup,FormControl,Accordion,Container,Row,Col,} from "react-bootstrap";
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

function Settings() {
  

  const [spinner, setSpinner] = React.useState(true);
  const [sliders, setSliders] = React.useState([]);
  const [slid2, setSlid2] = React.useState([]);
  const [socLinks, setSocial] = React.useState([]);
  const [topAd, settopAd] = React.useState([]);
  const [contact, setContact] = React.useState([]);

  useEffect(() => {
    Setting_ser.getSettings().then(
      (data) => {
        setSliders(data.data.sliders[0]);
        setSlid2(data.data.sliders[1]);
        setSocial(data.data.social_link);
        settopAd(data.data.top_image);
        setContact(data.data.contact);
        setSpinner(false);        
      },
      (err) => {
        console.log(err);
      }
    );
  }, []); 

  let handleEditSubmit = (e) => {
    e.preventDefault();
    let id = e.target[0].value;
    let nameEn = e.target[1].value;
    let price = e.target[2].value;
    let brand = e.target[3].value;
    let discount = e.target[4].value;
    let quantity = e.target[5].value;
    let description = e.target[6].value;

    alert(id);

    // productService.updateProduct({
    //   "id":id,
    //   "nameEn": nameEn,
    //   'price': price,
    //   'brand': brand,
    //   'discount': discount,
    //   'quantity': quantity,
    //   'description': description,
    // }).then(
    //   (data)=>{
    //     alert('Your product has been updated!');//.log(data);
    //   },
    //   (err)=>{
    //     console.log(err);
    //   }
    // )
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
          <Col md="12">
            <Card className="">
              <Card.Body>
                <Accordion defaultActiveKey="1">
                  <Card>
                    <Accordion.Toggle
                      as={Button}
                      variant="block btn-primary"
                      eventKey="0"
                    >
                      Sliders
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <form onSubmit={handleEditSubmit}>
                          <Row>
                            <Col lg="6">
                              <h5>First Slider</h5>
                              <Form.Group>
                                <Form.Label> Slider Link </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={sliders.to}
                                />
                              </Form.Group>

                              <Form.Group>
                                <Form.Label> Slider image </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={sliders.img}
                                />
                              </Form.Group>

                              <Form.Group>
                                <Form.Label> Slider Title </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={sliders.title}
                                />
                              </Form.Group>

                              <Form.Group>
                                <Form.Label> Slider Description </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={sliders.description}
                                />
                              </Form.Group>
                            </Col>

                            <Col lg="6">
                              <h5>Second Slider</h5>
                              <Form.Group>
                                <Form.Label> Slider Link </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={slid2.to}
                                />
                              </Form.Group>

                              <Form.Group>
                                <Form.Label> Slider image </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={slid2.img}
                                />
                              </Form.Group>

                              <Form.Group>
                                <Form.Label> Slider Title </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={slid2.title}
                                />
                              </Form.Group>

                              <Form.Group>
                                <Form.Label> Slider Description </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={slid2.description}
                                />
                              </Form.Group>
                            </Col>
                            <Col lg="12">
                              <Button
                                type="submit"
                                className="btn btn-success btn-block"
                                style={{ background: "#87CB16", color: "#fff" }}
                              >
                                Edit Sliders
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>

                <Accordion defaultActiveKey="1">
                  <Card>
                    <Accordion.Toggle
                      as={Button}
                      variant="block btn-primary"
                      eventKey="0"
                    >
                      Social Media
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <form onSubmit={handleEditSubmit}>
                          <Row>
                            <Col lg="12">
                              <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                  <InputGroup.Text>
                                    <i className="fab fa-facebook" />
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                  defaultValue={socLinks.facebook}
                                  placeholder="Add facebook link"
                                />
                              </InputGroup>

                              <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                  <InputGroup.Text>
                                    <i className="fab fa-twitter" />
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                  defaultValue={socLinks.twitter}
                                  placeholder="Add twitter link"
                                />
                              </InputGroup>

                              <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                  <InputGroup.Text>
                                    <i className="fab fa-youtube" />
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                  defaultValue={socLinks.youtube}
                                  placeholder="Add youtube link"
                                />
                              </InputGroup>
                            </Col>

                            <Col lg="12">
                              <Button
                                type="submit"
                                className="btn btn-success btn-block"
                                style={{ background: "#87CB16", color: "#fff" }}
                              >
                                Edit Links
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>

                <Accordion defaultActiveKey="1">
                  <Card>
                    <Accordion.Toggle
                      as={Button}
                      variant="block btn-primary"
                      eventKey="0"
                    >
                      Top Advert.
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <form onSubmit={handleEditSubmit}>
                          <Row>
                            <Col lg="12">
                              <Form.Group>
                                <Form.Label> Top Advert. Image </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={topAd.img}
                                />
                              </Form.Group>

                              <Form.Group>
                                <Form.Label> Top Advert. Link </Form.Label>
                                <Form.Control
                                  type="text"
                                  defaultValue={topAd.link}
                                />
                              </Form.Group>
                            </Col>

                            <Col lg="12">
                              <Button
                                type="submit"
                                className="btn btn-success btn-block"
                                style={{ background: "#87CB16", color: "#fff" }}
                              >
                                Edit Top Ad.
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>

                <Accordion defaultActiveKey="1">
                  <Card>
                    <Accordion.Toggle
                      as={Button}
                      variant="block btn-primary"
                      eventKey="0"
                    >
                      Contact Info
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <form onSubmit={handleEditSubmit}>
                          <Row>
                            <Col lg="12">
                              <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                  <InputGroup.Text>
                                    <i className="fas fa-phone" />
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                  defaultValue={contact.phone}
                                  placeholder="Add phone"
                                />
                              </InputGroup>

                              <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                  <InputGroup.Text>
                                    <i className="fas fa-fax" />
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                  defaultValue={contact.fax}
                                  placeholder="Add fax"
                                />
                              </InputGroup>

                              <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                  <InputGroup.Text>
                                    <i className="fas fa-envelope" />
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                  defaultValue={contact.email}
                                  placeholder="Add Your Email"
                                />
                              </InputGroup>
                            </Col>

                            <Col lg="12">
                              <Button
                                type="submit"
                                className="btn btn-success btn-block"
                                style={{ background: "#87CB16", color: "#fff" }}
                              >
                                Edit Links
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
               
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Settings;
