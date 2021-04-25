import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Header from "./components/Header";
import Footer from "./components/footer/Footer.jsx";
import "./App.min.css";
import {connect }from 'react-redux';
import Search from "./components/Search";
import searchResult from "./components/searchResult";
import ScrollToTop from "./components/ScrollToTop";
import loader from "./assets/loader.gif";
//const Header = lazy(() => import("./components/Header"));
//const TopMenu = lazy(() => import("./components/TopMenu"));
const HomeView = lazy(() => import("./views/Home"));
// const SignInView = lazy(() => import("./views/account/SignIn"));
// const SignUpView = lazy(() => import("./views/account/SignUp"));
const ForgotPasswordView = lazy(() => import("./views/account/ForgotPassword"));
const OrdersView = lazy(() => import("./views/account/Orders"));
const WishlistView = lazy(() => import("./views/account/Wishlist"));
const NotificationView = lazy(() => import("./views/account/Notification"));
const MyProfileView = lazy(() => import("./views/account/MyProfile"));
const ProductListView = lazy(() => import("./views/product/List"));
const ProductDetailView = lazy(() => import("./views/product/Detail"));
const StarZoneView = lazy(() => import("./views/product/StarZone"));
const CartView = lazy(() => import("./views/cart/Cart"));
const CheckoutView = lazy(() => import("./views/cart/Checkout"));
const DocumentationView = lazy(() => import("./views/Documentation"));
const NotFoundView = lazy(() => import("./views/pages/404"));
const InternalServerErrorView = lazy(() => import("./views/pages/500"));
const ContactUsView = lazy(() => import("./views/pages/ContactUs"));
const SupportView = lazy(() => import("./views/pages/Support"));
const BlogView = lazy(() => import("./views/blog/Blog"));
const BlogDetailView = lazy(() => import("./views/blog/Detail"));
const LoginView = lazy(() => import("./views/Authantication/Login"));
const SignUpView = lazy(() => import("./views/Authantication/Register.jsx"));



function App(props) {

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
        <Header />        
        <Suspense
          fallback={
            <div className="text-white text-center mt-3">
              <img src={loader}/>
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
            <Route exact path="/account/profile" component={MyProfileView} />
            <Route exact path="/account/orders" component={OrdersView} />
            <Route exact path="/account/wishlist" component={WishlistView} />

            <Route
              exact
              path="/account/notification"
              component={NotificationView}
            />
            <Route exact path="/category" component={ProductListView} />
            <Route exact path="/product/detail/:proName" component={ProductDetailView} />
            <Route exact path="/star/zone" component={StarZoneView} />
            <Route exact path="/cart" component={CartView} />
            <Route exact path="/checkout" component={CheckoutView} />
            <Route exact path="/documentation" component={DocumentationView} />
            <Route exact path="/contact-us" component={ContactUsView} />
            <Route exact path="/support" component={SupportView} />
            <Route exact path="/blog" component={BlogView} />
            <Route exact path="/blog/detail" component={BlogDetailView} />
            <Route exact path="/account/login" component={LoginView} />
            <Route exact path="/account/signup" component={SignUpView} />
            <Route exact path="/500" component={InternalServerErrorView} />

            <Route exact path="/search" component={searchResult} />
            <Route exact path="/search/searchResult" component={searchResult} />
            <Route component={NotFoundView} />
          </Switch>
        </Suspense>
        <Footer />
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
      dispatch({type:'USER',value:data})
    }
  }
}

export default connect(null,mapDispatchToProps)(App);
