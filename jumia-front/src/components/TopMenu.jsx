import React from "react";
import { Link } from "react-router-dom";

const TopMenu = (props) => {
  return (
  <nav id="vertical-menu">
  <ul className="main-menu">

    {props.data.map((item,index) =>
      <li key={index} className={`${item.subCategory ? "contain-submenu" : ""}`}><svg dangerouslySetInnerHTML={{ __html: item.icon }} /><a href="#"> {item.nameEn} </a>         
         <ul className="submenu-1">          
          {item.subCategory && item.subCategory.map((sub,index)=> 
          <li key={index} className={`${sub.subCatArray ? "contain-submenu" : ""}`}>
            <Link to="/category">{sub.subCatName}</Link>
          
            <ul className="submenu-2">              
            {sub.subCatArray && sub.subCatArray.map((arr,index)=> 
              <li  key={index} className={`${sub.subCatArray ? "contain-submenu" : ""}`}>
               <Link to="/category">{arr}</Link>               
              </li>             
            )}
            </ul>

          
          </li>          
        )}             
        </ul>
      </li>
    )}


  </ul>
</nav>


  )
}

export default TopMenu;
