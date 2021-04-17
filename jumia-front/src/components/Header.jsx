import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { ReactComponent as IconPersonBadgeFill } from "bootstrap-icons/icons/person-badge-fill.svg";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconListCheck } from "bootstrap-icons/icons/list-check.svg";
import { ReactComponent as IconDoorClosedFill } from "bootstrap-icons/icons/door-closed-fill.svg";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconBellFill } from "bootstrap-icons/icons/bell-fill.svg";
import { ReactComponent as IconInfoCircleFill } from "bootstrap-icons/icons/info-circle-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faQuestion } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <React.Fragment>
      <div className="reg" style={{width: '100%',background: '#feb800',textAlign: 'center'}}>
        <img src="https://eg.jumia.is/cms/ramadan-21/30day/new/sticky-en-desktop.jpg" style={{width: '80%'}}/>
      </div>

      <header className="p-3 border-bottom bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-md-3 text-center">
              <Link to="/">
                <img
                  alt="logo"
                  src="../../jumia-logo.png"
                  style={{width: '200px'}}
                />
              </Link>
            </div>
            <div className="col-md-5">
              <Search />
            </div>
            <div className="col-md-4">
              <div className="position-relative d-inline mr-3">
                <Link to="/cart" className="btn btn-warning">
                  <IconCart3 className="i-va" />
                  <div className="position-absolute top-0 left-100 translate-middle badge bg-danger rounded-circle">
                    2
                  </div>
                </Link>
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary border mr-3 dropdown-toggle1"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Profile"
                > Hi Mohamed 
                   <FontAwesomeIcon icon={faUser} className="text-light" />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/account/profile">
                      <IconPersonBadgeFill /> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/star/zone">
                      <IconStarFill className="text-warning" /> Star Zone
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account/orders">
                      <IconListCheck className="text-primary" /> Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account/wishlist">
                      <IconHeartFill className="text-danger" /> Wishlist
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account/notification">
                      <IconBellFill className="text-primary" /> Notification
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/support">
                      <IconInfoCircleFill className="text-success" /> Support
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      <IconDoorClosedFill className="text-danger" /> Logout
                    </Link>
                  </li>
                </ul>
              </div>     

              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-light border mr-3 dropdown-toggle1"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Profile"
                > Help
                  <FontAwesomeIcon icon={faQuestion} className="text-dark" />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/account/profile">
                      <IconPersonBadgeFill />Help Center
                    </Link>
                  </li>                  
                </ul>
              </div>     

            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
export default Header;