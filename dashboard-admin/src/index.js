import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AddUser from "views/AddUSer";
import AddProduct from './views/AddProduct';
import AdminLayout from "layouts/Admin.js";
import { Provider } from "react-redux";
import { store } from './_helper/store';
import LogIn from "views/login";
let token = localStorage.getItem('token');
ReactDOM.render(  
  <BrowserRouter>
    <Provider store={store}>
      <Switch>        
        <Route path="/admin" render={(props) => token ? <AdminLayout {...props} /> : <LogIn /> } />
        <Route path="/login" render={(props) => token ? <Redirect from='/' to={{pathname: '/admin/dashboard'}} /> : <LogIn /> } />
        <Route exact path="/admin/addProduct" render={() =>{<AdminLayout {...AddProduct} />}}/>
        <Redirect from="/" to="/login" />

        
        {/* component={LogIn} exact /> */}
       
        {/* <Route path="/admin"  
      render={(props) => token !== null
        ? <AdminLayout {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        /> */}

          {/* <Redirect from="/" to="/login" /> */}

    </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
