import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconTelephone } from "bootstrap-icons/icons/telephone.svg";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconBriefcase } from "bootstrap-icons/icons/briefcase.svg";
import { ReactComponent as IconBadgeAd } from "bootstrap-icons/icons/badge-ad.svg";
import { ReactComponent as IconGift } from "bootstrap-icons/icons/gift.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faInstagram,
  faYoutube,
  faApple,
  faWindows,
  faAndroid,
} from "@fortawesome/free-brands-svg-icons";

import './css/footer.css';
const Footer = () => {
  return (
    <>
    <div className="bg-dark">
      <div className="container">
        <div className="row py-3 mt-5">
          <div className="col-md-2 col-sm-6 text-left">
            <svg viewBox="0 0 138 32" id="logo-inv">
              <g fill="none">
                <path
                  d="M131.366 16.02a28.307 28.307 0 0 1-.685 2.265v.227c-.23.679-.686.905-1.143.905h-.458c-.228 0-.457-.226-.685-.226-.23-.227-.23-.453-.23-.68l.458-2.49c0-.227 0-.453.229-.453-3.658-.906-6.401-4.076-6.401-8.152 0-.68 0-1.132.228-1.812h-10.515c-.686 0-1.143-.452-1.372-.905l-.457-2.038c-.229-.906-.914-1.359-1.829-1.359h-3.2c-.686 0-1.143.453-1.143 1.132 0 .68.457 1.132 1.143 1.132h1.6c.686 0 1.143.453 1.372.906l4.114 16.304c.229.906.915 1.359 1.83 1.359h16.687c.915 0 1.6-.453 1.829-1.36l1.372-5.66c-.915.453-1.83.453-2.744.68v.226zm-18.974-4.528c-.228-.68-.228-1.132-.457-1.812l-.228-.453c0-.226 0-.452.228-.679.229-.226.457-.453.686-.453h1.143c.686 0 1.143.453 1.143 1.132l.457 2.265c0 .226 0 .453-.228.68-.229.226-.458.226-.686.226h-.686c-.686 0-1.143-.227-1.372-.906zm4.115 7.699c-.228.226-.457.453-.686.453h-.228c-.686 0-1.143-.453-1.372-.906v-.226a28.307 28.307 0 0 1-.686-2.265c0-.226 0-.453.229-.68.229-.226.457-.452.686-.452h.686c.685 0 1.143.453 1.143 1.132l.457 2.491s0 .226-.229.453zm4.572-.68c0 .453-.457.906-.914.906s-.915-.453-1.143-.905l-.457-2.718c0-.226 0-.453.228-.68.229-.226.457-.452.686-.452h.457c.686 0 1.143.453 1.143 1.132v2.718zm0-7.02c0 .68-.457 1.133-1.143 1.133h-.914c-.686 0-1.143-.453-1.143-1.132l-.457-2.265c0-.226 0-.452.228-.679.229-.226.457-.453.686-.453h1.372c.685 0 1.143.453 1.143 1.132v2.265h.228zm4.8 4.53l-.456 2.717c0 .453-.458.906-1.143.906-.458 0-.915-.453-.915-.906v-2.49c0-.68.457-1.133 1.143-1.133h.457c.23 0 .458.226.686.453.229 0 .457.226.229.453z"
                  fill="#FFF"
                ></path>
                <path
                  d="M130.854 0c-3.927 0-7.16 3.234-7.16 7.161 0 3.927 3.233 7.161 7.16 7.161 3.928 0 7.162-3.234 7.162-7.16 0-3.928-3.234-7.162-7.162-7.162zm3.466 12.243l-3.697-1.848-3.696 1.848.693-3.927-3.003-2.772 4.158-.693 1.848-3.696 1.849 3.696 4.158.693-3.003 2.772.693 3.927z"
                  fill="#F90"
                ></path>
                <path
                  d="M115.23 24.739a3.244 3.244 0 0 0-3.255 3.255 3.244 3.244 0 0 0 3.255 3.255 3.244 3.244 0 0 0 3.255-3.255c0-1.628-1.502-3.255-3.255-3.255zm15.624 0a3.244 3.244 0 0 0-3.255 3.255 3.244 3.244 0 0 0 3.255 3.255 3.244 3.244 0 0 0 3.256-3.255c0-1.628-1.503-3.255-3.256-3.255zm-95.716-.677c-1.396.937-3.49 1.406-6.748 1.406h-6.05c-.699 0-1.397 0-1.862-.235-.698-.234-1.164-.234-1.862-.468-.698-.235-1.163-.703-1.629-1.172-.465-.469-.698-.938-1.163-1.64-.233-.704-.466-1.407-.466-2.344v-15h3.956v14.765c0 1.64 1.397 2.344 4.422 2.344h5.352c2.792 0 4.189-.703 4.189-2.344V4.61h3.956v15c0 1.875-.698 3.515-2.095 4.453zm31.648 1.64V12.11L58.41 24.765c-.233.468-.698.703-.931.937-.466.235-.698.235-1.164.235-.93 0-1.629-.47-2.327-1.407l-8.61-12.655v13.827h-3.956V6.718c0-.703.233-1.171.698-1.64.466-.469.931-.703 1.397-.703.93 0 1.629.469 2.094 1.172l10.472 15 10.239-15c.465-.703 1.163-1.172 2.094-1.172.698 0 1.164.234 1.629.703.465.469.698.937.698 1.875v18.75h-3.956zm7.679-.234V4.375h3.956v21.093zm30.485.234l-3.258-5.625H89.59l-3.258 5.625H81.68L93.314 6.015c.466-.937 1.397-1.406 2.095-1.406.93 0 1.629.469 2.327 1.406l11.402 19.687h-4.188zM95.409 9.765l-3.724 6.328h7.447l-3.723-6.328zm-83.541 6.328c0 6.328-2.327 9.14-6.516 10.078-3.956.937-5.352.937-5.352.937v-4.453c1.629 0 3.956-.468 5.585-.937 1.396-.469 2.56-1.875 2.327-5.625V4.375h3.956v11.718z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          </div>
          <div className="col-md-6 col-sm-6 text-white">
            <h6>
              <b>NEW TO JUMIA?</b>
            </h6>
            <p>
              <small>
                Subscribe to our newsletter to get updates on our latest
                offers!
              </small>
            </p>
            <form className="form-inline my-2 my-lg-0">
              <input
                className=" search mr-sm-2"
                type="search"
                placeholder={"enter You Email"}
                aria-label="Search"
              />
              <button type="button" className="btn btn-outline-light mr-2">
                Male
              </button>
              <button type="button" className="btn btn-outline-light">
                Female
              </button>
            </form>
          </div>

          <div className="col-md-4 col-sm-6 text-white">
            <h6>
              <b>DOWNLOAD JUMIA FREE APP</b>
            </h6>
            <p>
              <small>Get access to exclusive offers!</small>
            </p>

            <button type="button" className="btn btn-outline-light mr-2">
              <i className="fab fa-app-store"></i> App Store
            </button>
            <button type="button" className="btn btn-outline-light">
              <i className="fab fa-google-play"> </i> Google Play
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-darke text-white">
      <div className="container">
        <div className="row py-3">
          <div className="col-md-3 col-sm-6">
            <h6>
              <b> LET US HELP YOU</b>
            </h6>
            <ul className="p-0">
              <li className="f-li"></li>
              <li className="f-li">Help Center</li>
              <li className="f-li">Contact us</li>
              <li className="f-li">How to buy on Jumia?</li>
              <li className="f-li">How to pay on Jumia?</li>
              <li className="f-li">Delivery timelines</li>
              <li className="f-li">Return Policy</li>
              <li className="f-li">Corporate Services</li>
              <li className="f-li">Report a Product</li>
            </ul>
          </div>

          <div className="col-md-3 col-sm-6">
            <h6>
              <b> ABOUT JUMIA EGYPT</b>
            </h6>
            <ul className="p-0">
              <li className="f-li"> </li>
              <li className="f-li"> How to pay on Jumia?</li>
              <li className="f-li"> Delivery timelines</li>
              <li className="f-li"> Return Policy</li>
              <li className="f-li"> Help Center</li>
              <li className="f-li"> Contact us</li>
              <li className="f-li"> How to buy on Jumia?</li>
              <li className="f-li"> Corporate Services</li>
            </ul>
          </div>

          <div className="col-md-3 col-sm-6">
            <h6>
              <b> MAKE MONEY WITH JUMIA</b>
            </h6>
            <ul className="p-0">
              <li className="f-li">Sell on Jumia</li>
              <li className="f-li"> Become a Logistics Service Partner</li>
              <li className="f-li">Become a Sales Consultant (J-Force )</li>
            </ul>
          </div>

          <div className="col-md-3 col-sm-6">
            <h6>
              <b> JUMIA INTERNATIONAL</b>
            </h6>
            <ul className="p-0">
              <li className="f-li"> </li>
              <li className="f-li"> Algeria</li>
              <li className="f-li"> Ghana</li>
              <li className="f-li"> Kenya</li>
              <li className="f-li"> Morocco</li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <h6>
              <b>JOIN US ON</b>
            </h6>
            <p>
              <span className=" text-white rounded-circle px-2 py-1">
                <i className="fab fa-facebook"></i>
              </span>
              <span className=" text-white rounded-circle px-2 py-1">
                <i className="fab fa-twitter"></i>
              </span>
              <span className=" text-white rounded-circle px-2 py-1">
                <i className="fab fa-youtube"></i>
              </span>
              <span className=" text-white rounded-circle px-2 py-1">
                <i className="fab fa-instagram"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};
export default Footer;
