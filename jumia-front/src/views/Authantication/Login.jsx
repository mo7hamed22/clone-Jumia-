import React from "react";
import {  useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
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
import { useTranslation } from "react-i18next";
import Facebook from './facebook'
import FacebookLogin from 'react-facebook-login';
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
  const { t } = useTranslation();
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
  
const componentClicked=()=>{
  console.log('clicked')
}
const responseFacebook=(res)=>{
console.log(res)
axios.post("http://localhost:8080/auth/login",{
 
     password: res.id,
     email:res.email
 
}).then(data=>{
console.log(data,'data')
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
  axios.post("http://localhost:8080/auth/signup",{
        name:res.name,
       password: res.id,
       email:res.email
   
}).then(data=>{
    if (data.data.token) {
      handleClickAlert();
        setFeedBackMsg("Login Successfully");
        setFeedBackAlert("success");
        localStorage.setItem("token", data.data.token);
      setTimeout(()=>{
      // props.history.replace('/');
      window.location.replace('/')
      },1500)
      } else {
        console.log("error in else");
        console.log(data.data);
        handleClickAlert();
      setFeedBackMsg("There are problem with Facebook Login");
        setFeedBackAlert("error");
      }
      })
      .catch(e=>{
        console.log(e,'error')
      })
    
  console.log("error in else");

  console.log(data.data);
}
})
.catch(e=>{
  console.log(e,'error')
  handleClose();
handleClickAlert();
setFeedBackMsg("invalid Username or password");
setFeedBackAlert("error");
})

// fetch(,{
//     method:'POST',
//  body:{
//      withFacebook:'true'
//  }
// }).then(data=>{
//     data.json().then(data=>{
//         console.log(data)
//     })
// })
}

  return (
    <>
      <Container className="mt-5 mb-5">
        <Row>
          <Col md={6} className="pl-5">
            <Row className="d-flex justify-content-center align-items-center ">
              <span style={{ color: "#f68b1e", fontWeight: "bolder" }}>
                {t("login")}
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
                      label={t("emailAddress")}
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
                      label={t("password")}
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
                      label={t("rememberMe")}
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
                          <span> {t("login")}</span>
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
 
               <FacebookLogin
    appId="738272283510004"
    autoLoad={false}
    fields="name,email,picture"
    content
    textButton={t("loginWithFacebook")}
    onClick={componentClicked}
    callback={responseFacebook} />
                 
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
                 {t("createJumiaAccount")}
                </h4>
              </Col>
              <Col md={9} className="pt-2 mt-5 ">
                {" "}
                <p style={{ fontSize: "1rem" }}>
                  {t("loginparagraphe")}
                </p>
              </Col>
            </Row>
            <Row className="pt-5 mt-5">
              <Col>
                <Link to='/account/signup'
                  type="button"
                  style={{
                    backgroundColor: "#f68b1e",
                    color: "#ffff",
                    fontWeight: "bold",
                    width:'100%',
                    padding: '10px',
                    textDecoration: 'none'
                  }}
                  variant="contained"
                  
                >
                  <Row className="w-100">
                    <Col sm={3}>
                      <i className="fa fa-users"/>
                    </Col>

                    <Col sm={7}>
                      {" "}
                      <div> {t("registerWithNewAccount")} </div>
                    </Col>
                  </Row>
                </Link>
              </Col>
            </Row>
            <Row className=" mt-2">
              <Col>
         
               <Facebook style={{width: '100%'}} handleClickAlert={handleClickAlert}  setFeedBackAlert={setFeedBackMsg} setFeedBackAlert={setFeedBackAlert} setFeedBackMsg={setFeedBackMsg}
               />

              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
