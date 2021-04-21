import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MuiPhoneNumber from "material-ui-phone-number";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";


import axios from "axios";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,
      "your Password Must Contain digits and Capital Words And Special character"
    )
    .required("Password is required"),
  firstName: yup
    .string("your first Name Must be characters")
    .required("First Name Required"),
  lastName: yup
    .string("your last Name mUst be Characters")
    .required("last Name Required"),
});
function Alert(propsAlert) {
  return <MuiAlert elevation={6} variant="filled" {...propsAlert} />;
}
export default function Register(props) {
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
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setOpen(true);
      const { email, firstName, lastName, password, phoneNumber } = values;
      const user = {
        email,
        name: firstName + " " + lastName,
        password,
      };
      if (phoneNumber) {
        user.phoneNumber = phoneNumber;
      }

      // console.log(user)
      axios
        .post("http://localhost:8080/auth/signup", user)
        .then((data) => {
          if (data.data.message) {
            handleClickAlert();
            setFeedBackMsg("Cannot Sign UP with this Email");
            setFeedBackAlert("error");
          } else {
            localStorage.setItem("token", data.data.token);
            handleClickAlert();
            setFeedBackMsg("Login Successfully");
            setFeedBackAlert("success");
            setTimeout(()=>{
              window.location.replace('/')

            },1500)
          }
          handleClose();
        })
        .catch((e) => {
          console.log(e, "error");
          console.log(e.message);
        });
    },

    validateOnChange: true,
    validateOnMount: true,
    validateOnBlur: true,

    initialErrors: {
      password: "required",
      firstName: "required",
      email: "required",
    },
  });

  return (
    <>
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
          }}
        >
          <Col md={8} className="mt-5 ">
            <Row>
              <Col>
                <h4 style={{ color: "#f68b1e" }}>Create Account</h4>
              </Col>
            </Row>

            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6} className="mt-5">
                  <TextField
                    fullWidth
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    type="text"
                    label="First Name"
                    onBlur={formik.handleChange}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Col>
                <Col md={6} className="mt-5">
                  <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mt-5">
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Col>
                <Col md={6} className="mt-5">
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Col>
              </Row>
              <Row className="mt-5">
                <Col>
                  <MuiPhoneNumber
                    defaultCountry={"eg"}
                    label="Phone Number"
                    id="phoneNumber"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    name="phoneNumber"
                  />
                </Col>
              </Row>
              <Row className="mt-5">
                <Col>
                  <FormControlLabel
                    control={<Checkbox style={{ color: "#f68b1e" }} />}
                    label={
                      <div>
                        accept the{" "}
                        <a href="" style={{ color: "#f68b1e" }}>
                          Terms &condition
                        </a>
                      </div>
                    }
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <FormControlLabel
                    control={
                      <Checkbox name="checkedB" style={{ color: "#f68b1e" }} />
                    }
                    label="I want to receive Jumia Newsletters with the best deals and offers"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#f68b1e",
                      color: "#ffff",
                      fontWeight: "bold",
                    }}
                    variant="contained"
                    fullWidth
                  >
                    Create Account
                  </Button>
                </Col>
              </Row>
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
                <Alert onClose={handleCloseAlert} severity={feedBackAlert}>
                  {feedbackMsg}
                </Alert>
              </Snackbar>
            </form>

            {/* Or
      <Row className='mt-3'>
          <Col>
            <Button  style={{backgroundColor:'#f68b1e',color:'#ffff'}} disabled={!formik.isValid} variant="contained" fullWidth >
            Create Account
        </Button>
          </Col>
        </Row> */}

            <Row className="mt-5 mb-5">
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  fontWeight: "bold",
                }}
              >
                <h5>Already Have Account</h5>
                <Link to="/account/login" style={{ color: "#f68b1e" }}>
                  Login
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}


