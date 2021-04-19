import React from "react";
import { Link } from "react-router-dom";

const TopMenu = (props) => {
  console.log(props.data)
  return (
    
  <nav id="vertical-menu">
  <ul className="main-menu">

    {props.data.map((item) =>
      <li className={`${item.subCategory ? "contain-submenu" : ""}`}><svg dangerouslySetInnerHTML={{ __html: item.icon }} /><a href="#"> {item.nameEn} </a>         
         <ul class="submenu-1">          
          {item.subCategory && item.subCategory.map((sub)=> 
          <li className={`${sub.subCatArray ? "contain-submenu" : ""}`}>
            <Link to="/category">{sub.subCatName}</Link>
          
            <ul class="submenu-2">              
            {sub.subCatArray && sub.subCatArray.map((arr)=> 
              <li className={`${sub.subCatArray ? "contain-submenu" : ""}`}>
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
