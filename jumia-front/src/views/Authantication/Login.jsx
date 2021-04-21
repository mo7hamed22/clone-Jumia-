import React from "react";
import {  useFormik } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import { Navbar,Col,Row, Container, Nav, Dropdown, Button } from "react-bootstrap";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";

import "./Login.css";
function Alert(propsAlert) {
  return <MuiAlert elevation={6} variant="filled" {...propsAlert} />;
}

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

export default function Login(props) {
 
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [feedbackMsg, setFeedBackMsg] = React.useState("");
  const [feedBackAlert, setFeedBackAlert] = React.useState("success");
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setOpen(true);
      const { email, password } = values;
      axios
        .post("http://localhost:8080/auth/login", { email, password })
        .then((data) => {
          if (data) handleClose();
          if (data.data.token) {
            handleClickAlert();
            setFeedBackMsg("Login Successfully");
            setFeedBackAlert("success");
            handleClose();
            localStorage.setItem("token", data.data.token);

setTimeout(()=>{
  // props.history.replace('/');
  window.location.replace('/')
},1500)

          } else {
            handleClose();
            handleClickAlert();
            setFeedBackMsg("invalid Username or password");
            setFeedBackAlert("error");

            console.log("error in else");

            console.log(data.data);
          }
        })
        .catch((e) => {
          handleClose();
          handleClickAlert();
          setFeedBackMsg("invalid Username or password");
          setFeedBackAlert("error");
        });
    },

    validateOnChange: true,
    validateOnMount: true,
    validateOnBlur: true,

    initialErrors: {
      password: "required",
      email: "required",
    },
  });

  return (
    <>
      <Container className="mt-5 mb-5">
        <Row>
          <Col md={6} className="pl-5">
            <Row className="d-flex justify-content-center align-items-center ">
              <span style={{ color: "#f68b1e", fontWeight: "bolder" }}>
                Login
              </span>
            </Row>
            <Row>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md={12} className="mt-5">
                    <TextField
                      style={{width:'100%'}}
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Col>
                  <Col md={12} className="mt-5">
                    <TextField
                       style={{width:'100%'}}
                      id="password"
                      name="password"
                      label="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="checkedB"
                          style={{ color: "#f68b1e" }}
                        />
                      }
                      label="Remember Me"
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col sm={12}>
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: "#f68b1e",
                        color: "#ffff",
                        fontWeight: "bold",
                        width:'100%'
                      }}
                      variant="contained"
                      
                    >
                      <Row className="w-100">
                        <Col sm={2} className="float-left">
                          <div>
                            {" "}
                            <svg
                              style={{ fill: "#fff", width: "2rem" }}
                              viewBox="0 0 24 24"
                              id="email"
                            >
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                              <path d="M0 0h24v24H0z" fill="none"></path>
                            </svg>
                          </div>
                        </Col>
                        <Col className="pt-1">
                          {" "}
                          <span> Login</span>
                        </Col>
                      </Row>
                    </Button>
                    <Backdrop
                      className={classes.backdrop}
                      open={open}
                      onClick={handleClose}
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
                    <Snackbar
                      open={openAlert}
                      autoHideDuration={6000}
                      onClose={handleCloseAlert}
                    >
                      <Alert
                        onClose={handleCloseAlert}
                        severity={feedBackAlert}
                      >
                        {feedbackMsg}
                      </Alert>
                    </Snackbar>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col sm={12}>
                    <Button
                      type="button"
                      style={{
                        backgroundColor: "#40588a",
                        color: "#ffff",
                        fontWeight: "bold",
                        width:'100%'
            
                      }}
                      variant="contained"
                      
                    >
                      <Row className="w-100">
                        <Col sm={2} className="float-left">
                          <div>
                            {" "}
                            <svg
                              style={{ fill: "#fff" ,width:'65%'}}
                              viewBox="0 0 24 24"
                              id="facebook"
                            > 
                              <path d="M19.305 2H4.695A2.695 2.695 0 0 0 2 4.695v14.61A2.695 2.695 0 0 0 4.695 22h7.206l.012-7.147h-1.857a.438.438 0 0 1-.438-.436l-.009-2.304c0-.243.196-.44.438-.44h1.854V9.447c0-2.583 1.577-3.99 3.882-3.99h1.89c.243 0 .439.196.439.438v1.943a.438.438 0 0 1-.438.438h-1.16c-1.254 0-1.496.596-1.496 1.47v1.927h2.753c.263 0 .466.23.435.49l-.273 2.304a.438.438 0 0 1-.435.386H15.03L15.018 22h4.287A2.695 2.695 0 0 0 22 19.305V4.695A2.695 2.695 0 0 0 19.305 2z"></path>
                            </svg>
                          </div>
                        </Col>
                        <Col className="pt-1">
                          {" "}
                          <span> Login With Facebook</span>
                        </Col>
                      </Row>
                    </Button>
                  </Col>
                </Row>
              </form>
            </Row>
          </Col>
          <Col md={6} className=" " style={{ borderLeft: ".4px solid #ddd" }}>
            <Row className="d-flex justify-content-center align-items-center">
              <Col
                sm={12}
                className="ml-5 d-flex align-items-center justify-content-center"
              >
                <h4
                  style={{
                    color: "#f68b1e",
                    fontWeight: "bolder",
                    marginLeft: "30px",
                  }}
                >
                  Create your Jumia account
                </h4>
              </Col>
              <Col md={9} className="pt-2 mt-5 ">
                {" "}
                <p style={{ fontSize: "1rem" }}>
                  Create your Jumia customer account in just a few clicks! You
                  can register either using your e-mail address or through your
                  Facebook account.
                </p>
              </Col>
            </Row>
            <Row className="pt-5 mt-5">
              <Col>
                <Button
                  type="button"
                  style={{
                    backgroundColor: "#f68b1e",
                    color: "#ffff",
                    fontWeight: "bold",
                    width:'100%'
                  }}
                  variant="contained"
                  
                >
                  <Row className="w-100">
                    <Col sm={3}>
                      <svg
                        style={{ fill: "#fff", width: "2rem" }}
                        viewBox="0 0 24 24"
                        id="email"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                      </svg>
                    </Col>

                    <Col sm={7}>
                      {" "}
                      <div> Login With Email</div>
                    </Col>
                  </Row>
                </Button>
              </Col>
            </Row>
            <Row className=" mt-2">
              <Col>
                <Button
                  type="button"
                  style={{
                    backgroundColor: "#40588a",
                    color: "#ffff",
                    fontWeight: "bold",
                    width:'100%'
                  }}
                  variant="contained"
                  
                >
                  <Row className="w-100">
                    <Col sm={3}>
                      <svg
                        style={{ fill: "#fff", width: "2rem" }}
                        viewBox="0 0 24 24"
                        id="facebook"
                      >
                        <path d="M19.305 2H4.695A2.695 2.695 0 0 0 2 4.695v14.61A2.695 2.695 0 0 0 4.695 22h7.206l.012-7.147h-1.857a.438.438 0 0 1-.438-.436l-.009-2.304c0-.243.196-.44.438-.44h1.854V9.447c0-2.583 1.577-3.99 3.882-3.99h1.89c.243 0 .439.196.439.438v1.943a.438.438 0 0 1-.438.438h-1.16c-1.254 0-1.496.596-1.496 1.47v1.927h2.753c.263 0 .466.23.435.49l-.273 2.304a.438.438 0 0 1-.435.386H15.03L15.018 22h4.287A2.695 2.695 0 0 0 22 19.305V4.695A2.695 2.695 0 0 0 19.305 2z"></path>
                      </svg>
                    </Col>

                    <Col sm={7}>
                      {" "}
                      <div> Login With Facebook</div>
                    </Col>
                  </Row>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
