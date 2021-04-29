import React from 'react'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login';
import { useTranslation } from "react-i18next";
export default function Facebook(props){

const componentClicked=()=>{
    console.log('clicked')
}
const responseFacebook=(res)=>{
 
console.log(res)
axios.post("http://localhost:8080/auth/signup",{
        name:res.name,
       password: res.id,
       email:res.email
   
}).then(data=>{
    if (data.data.token) {
        props.handleClickAlert();
        props.setFeedBackMsg("Login Successfully");
        props.setFeedBackAlert("success");
        localStorage.setItem("token", data.data.token);
      setTimeout(()=>{
      // props.history.replace('/');
      window.location.replace('/')
      },1500)
      } else {
        console.log("error in else");
        console.log(data.data);
        props.handleClickAlert();
        props.setFeedBackMsg("invalid Username or password");
        props.setFeedBackAlert("error");
      }
      })
      .catch(e=>{
        console.log(e,'error')
       
      })
      

}
const { t } = useTranslation();
    return(
        <>
 <FacebookLogin
 size='medium'
    appId="738272283510004"
    autoLoad={false}
    textButton={t("registerWithFacebook")}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook} />,

        </>
    )
}