import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAppleAlt, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

const TopMenu = () => {
  return (
    
  <nav id="vertical-menu">
  <ul className="main-menu">
    <li className="active"><a href="#"><FontAwesomeIcon icon={faAppleAlt} /> Link Item 1</a></li>
    <li className="contain-submenu"><a href="#"><FontAwesomeIcon icon={faAppleAlt} /> Link Item 2  <FontAwesomeIcon style={{}} icon={faArrowAltCircleRight} className="text-light" /></a>
      <ul className="submenu-1">
        <li><a href="#">Submenu item 1</a></li>
        <li className="contain-submenu" ><a href="#">Submenu item 2</a>
           <ul className="submenu-2">
             <li><a href="#">Submenu item 2.1</a></li>
             <li><a href="#">Submenu item 2.2</a></li>
             <li><a href="#">Submenu item 2.3</a></li>
             <li><a href="#">Submenu item 2.4</a></li>
             <li><a href="#">Submenu item 2.5</a></li>
             
           </ul>
        
        
        </li>
        <li><a href="#">Submenu item 3</a></li>
        <li><a href="#">Submenu item 4</a></li>
        <li><a href="#">Submenu item 5</a></li>
      </ul>
    
    </li>
    <li><a href="#"><FontAwesomeIcon icon={faAppleAlt} /> Link Item 3</a></li>
    <li className="contain-submenu"><a href="#"><FontAwesomeIcon icon={faAppleAlt} /> Link Item 4 <FontAwesomeIcon style={{}} icon={faArrowAltCircleRight} className="text-light" /></a>
       <ul className="submenu-1">
        <li><a href="#">Submenu item 1</a></li>
        <li><a href="#">Submenu item 2</a></li>
        <li className="contain-submenu"><a href="#">Submenu item 3</a>
         <ul className="submenu-2">
           <li><a href="#">Submenu item 3.1</a></li>
           <li className="contain-submenu"><a href="#">Submenu item 3.2</a>
             <ul className="submenu-3">
               <li><a href="#">Submenu item 3.2.1</a></li>
               <li><a href="#">Submenu item 3.2.2</a></li>
               <li><a href="#">Submenu item 3.2.3</a></li>
               <li><a href="#">Submenu item 3.2.4</a></li>
               <li><a href="#">Submenu item 3.2.5</a></li>
             </ul>
           
           </li>
           <li><a href="#">Submenu item 3.3</a></li>
           <li><a href="#">Submenu item 3.4</a></li>
         </ul>
         
         </li>
        <li><a href="#">Submenu item 4</a></li>
        <li><a href="#">Submenu item 5</a></li>
      </ul>      
    </li>
    <li><a href="#"><FontAwesomeIcon icon={faAppleAlt} /> Link Item 5</a></li>
    <li><a href="#"><FontAwesomeIcon icon={faAppleAlt} /> Link Item 6</a></li>
  </ul>
</nav>


  )
}
// const TopMenu = () => {
//   return (
//     <React.Fragment>
//       <nav classNameName="navbar navbar-expand-lg navbar-dark bg-dark p-0">
//         <div classNameName="container-fluid">
//           <Link classNameName="navbar-brand" to="/">
//             E-Commerce
//           </Link>
//           <button
//             classNameName="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span classNameName="navbar-toggler-icon" />
//           </button>
//           <div classNameName="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul classNameName="navbar-nav">
//               <li classNameName="nav-item dropdown">
//                 <button
//                   classNameName="btn nav-link dropdown-toggle font-weight-bold"
//                   id="navbarDropdown"
//                   data-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   All Pages
//                 </button>
//                 <ul classNameName="dropdown-menu" aria-labelledby="navbarDropdown">
//                   <li>
//                     <Link classNameName="dropdown-item" to="/account/signin">
//                       Sign In
//                     </Link>
//                   </li>
//                   <li>
//                     <Link classNameName="dropdown-item" to="/account/signup">
//                       Sign Up
//                     </Link>
//                   </li>
//                   <li>
//                     <hr classNameName="dropdown-divider" />
//                   </li>
//                   <li>
//                     <Link classNameName="dropdown-item" to="/checkout">
//                       Checkout Page
//                     </Link>
//                   </li>
//                   <li>
//                     <Link classNameName="dropdown-item" to="/contact-us">
//                       Contact Us
//                     </Link>
//                   </li>
//                   <li>
//                     <Link classNameName="dropdown-item" to="/blog">
//                       Blog
//                     </Link>
//                   </li>
//                   <li>
//                     <Link classNameName="dropdown-item" to="/blog/detail">
//                       Blog Detail
//                     </Link>
//                   </li>
//                   <li>
//                     <hr classNameName="dropdown-divider" />
//                   </li>
//                   <li>
//                     <Link classNameName="dropdown-item" to="/fsafasf">
//                       404 Page Not Found
//                     </Link>
//                   </li>
//                   <li>
//                     <Link classNameName="dropdown-item" to="/500">
//                       500 Internal Server Error
//                     </Link>
//                   </li>
//                 </ul>
//               </li>
//               <li classNameName="nav-item">
//                 <Link classNameName="nav-link" to="/category">
//                   Fashion
//                 </Link>
//               </li>
//               <li classNameName="nav-item">
//                 <Link classNameName="nav-link" to="/category">
//                   Supermarket
//                 </Link>
//               </li>
//               <li classNameName="nav-item">
//                 <Link classNameName="nav-link" to="/category">
//                   Electronics
//                 </Link>
//               </li>
//               <li classNameName="nav-item">
//                 <Link classNameName="nav-link" to="/category">
//                   Furniture
//                 </Link>
//               </li>
//               <li classNameName="nav-item">
//                 <Link classNameName="nav-link" to="/category">
//                   Garden & Outdoors
//                 </Link>
//               </li>
//               <li classNameName="nav-item">
//                 <Link classNameName="nav-link" to="/category">
//                   Jewellery
//                 </Link>
//               </li>
//               <li classNameName="nav-item">
//                 <Link classNameName="nav-link" to="/documentation">
//                   Documentation
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </React.Fragment>
//   );
// };

export default TopMenu;
