import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "assets/img/reactlogo.png";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="#"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={require("assets/img/logo.png").default}
                alt="..." style={{width: '1000px'}}
              />
            </div>
          </a>
          <a className="simple-text" href="#">
           Jumia Dashboard
          </a>
        </div>
        <Nav>

        <li>
            <NavLink to='/admin/dashboard' className="nav-link" activeClassName="active">
              <i className='nc-icon nc-chart-pie-35' />
              <p>Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink to='/admin/categories' className="nav-link" activeClassName="active">
              <i className='nc-icon nc-bullet-list-67' />
              <p>Categories</p>
            </NavLink>
          </li>

          <li>
            <NavLink to='/admin/products' className="nav-link" activeClassName="active">
              <i className='nc-icon nc-paper-2' />
              <p>Products</p>
            </NavLink>
          </li>

          <li>
            <NavLink to='/admin/users/all' className="nav-link" activeClassName="active">
              <i className='nc-icon nc-notes' />
              <p>Users</p>
            </NavLink>
          </li>

          <li>
            <NavLink to='/admin/edit' className="nav-link" activeClassName="active">
              <i className='nc-icon nc-circle-09' />
              <p>Admin profile</p>
            </NavLink>
          </li>

          <hr style={{background: 'white'}} />
          <li>
            <NavLink to='/admin/settings' className="nav-link" activeClassName="active">
              <i className='nc-icon nc-chart' />
              <p>Site Settings</p>
            </NavLink>
          </li>
           
         
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
