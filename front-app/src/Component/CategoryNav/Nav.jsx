import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Items from "../CategoryItems/CategoryItems";
import "./Nav.css";
export default function FadeMenu() {
 
  const [categories, setCategories] = React.useState();
  useEffect(async () => {
    const data = await fetch("http://localhost:8080/category/getAllCategories");
    const categoriesFromDatabase = await data.json();
    if (categoriesFromDatabase) {
      setCategories(categoriesFromDatabase);
    }
  },[]);

  return (
    <>        <div style={{ margin: "10px" }} className={"navParent"}>
          <ul style={{ listStyle: "none" }}>
            {categories &&
              categories.map((category, index) => {
                {
                  var classes = `navCategory nav${index}`;
                }
                return (
                  <>
                    <li>
                      <div className="itemName">
                        <a href="" style={{ textDecoration: "none" ,color:'#222'}}>
                          <svg
                            viewBox="0 0 24 24"
                            style={{ maxWidth: ".8rem" ,marginRight:"3px"}}
                            dangerouslySetInnerHTML={{
                              __html: category.icon,
                             
                            }}
                          ></svg>
                          {category.nameEn}
                        </a>
                      </div>
                      <div className="itemNav">
                        <Items item={category && category.subCategory} />
                      </div>
                    </li>
                  </>
                );
              })}
          </ul>
        </div>
     
    
    </>
  );
}
