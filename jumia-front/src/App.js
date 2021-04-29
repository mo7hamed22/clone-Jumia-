import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Header from "./components/Header";
import Privacy from "./components/static/privacy.jsx";
import Footer from "./components/footer/Footer.jsx";
import "./App.min.css";
import { connect } from "react-redux"; 
import { makeStyles } from "@material-ui/core/styles";
import searchResult from "./components/searchResult";
import ScrollToTop from "./components/ScrollToTop";
import loader from "./assets/loader.gif";
import { useTranslation } from "react-i18next";

const HomeView = lazy(() => import("./views/Home"));


const ForgotPasswordView = lazy(() => import("./views/account/ForgotPassword"));
const OrdersView = lazy(() => import("./views/account/Orders"));

const ProductListView = lazy(() => import("./views/product/List"));
const ProductDetailView = lazy(() => import("./views/product/Detail"));

const CartView = lazy(() => import("./views/cart/Cart"));
const CheckoutView = lazy(() => import("./views/cart/Checkout"));
const NotFoundView = lazy(() => import("./views/pages/404"));
const Team = lazy(() => import("./views/team"));

const ContactUsView = lazy(() => import("./views/pages/ContactUs"));
const SupportView = lazy(() => import("./views/pages/Support"));

const LoginView = lazy(() => import("./views/Authantication/Login"));
const SignUpView = lazy(() => import("./views/Authantication/Register.jsx"));


function App(props) {
  const {t} =useTranslation();
  const useStyles = makeStyles((theme) => ({
  
    root: {
    direction:t("direction")
    },
   
  }));
  const classes = useStyles();
  try{
    const token =localStorage.getItem('token')           
         if(token){
          fetch('http://localhost:8080/user/is-login',
          {  method: "post",
           headers: { Authorization: `Bearer ${token}` }}
           ).then(data=>{
             data.json().then(data=>{
                if(data.message == 'User Not Found'){
                    console.log(data.message,'offline')
                }  else{
                     props.setUserName(data)
    
                }
             })
        
           }).catch(e=>{
         if(e.message == 'User Not Found'){
             console.log(e.message,'offline')
         }   
         })
         }
    }catch(e){
        console.log(e,'catching')
    }




  return (
    <BrowserRouter>
      <ScrollToTop>
        <React.Fragment>
         <div className={classes.root}> 
         <Header />
          <Suspense
            fallback={
              <div className={`text-white text-center mt-3`}>
                <img src={loader} />
              </div>
            }
          >
            <Switch>
              <Route exact path="/" component={HomeView} />
              {/* <Route exact path="/account/signin" component={SignInView} />
               */}
              <Route
                exact
                path="/account/forgotpassword"
                component={ForgotPasswordView}
              />              
              <Route exact path="/account/orders" component={OrdersView} />              

              
              <Route exact path="/category/:main" component={ProductListView} />
              {/*======  */}
              <Route
                exact
                path="/category/:main/:subCatName"
                component={ProductListView}
              />
              <Route
                exact
                path="/category/:main/:subCatName/:type"
                component={ProductListView}
              />
              

              <Route
                exact
                path="/product/detail/:proName"
                component={ProductDetailView}
              />
              
              <Route exact path="/cart" component={CartView} />
              <Route exact path="/checkout" component={CheckoutView} />
             
              <Route exact path="/contact-us" component={ContactUsView} />
              <Route exact path="/support" component={SupportView} />            
              <Route exact path="/account/login" component={LoginView} />
              <Route exact path="/account/signup" component={SignUpView} />              
              <Route exact path="/team" component={Team} />
              <Route exact path="/privacy" component={Privacy} />

              


              <Route exact path="/search" component={searchResult} />
              <Route
                exact
                path="/search/searchResult"
                component={searchResult}
              />
              <Route component={NotFoundView} />
            </Switch>
          </Suspense>
          <Footer />
         </div>
        </React.Fragment>
      </ScrollToTop>
    </BrowserRouter>
  );
}
// const mapStateToProps = (state, ownProps) => {
//   return {
//     userName: state.cartReducer.userInfo
//   }
// }
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUserName: (data) => {
      dispatch({ type: "USER", value: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
