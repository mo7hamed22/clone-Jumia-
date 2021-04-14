import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Items from "../CategoryItems/CategoryItems";
import "./Nav.css";
export default function FadeMenu() {
  let icon;
  const test = "container";
  const [categories, setCategories] = React.useState();
  useEffect(async () => {
    const data = await fetch("http://localhost:8080/category/getAllCategories");
    const categoriesFromDatabase = await data.json();
    if (categoriesFromDatabase) {
      setCategories(categoriesFromDatabase);
    }
  }, []);

  const handleHover = (event) => {
    event.target.classList.add("navCategoryItem");
  };
  const cat = [
    "supermarket",
    "fashion",
    "health&Beauty",
    "mobile",
    "electronics",
  ];
  const handleClose = () => {};

  return (
    <>
      {/* //      {categories?(<svg viewBox="0 0 24 24" id="cat-groceries" className={test}< */}
      {/* //          dangerouslySetInnerHTML={{ __html:categories[0].icon}} >*/}

      {/* //      </svg>):(<div>Not Found</div>)} */}

      {/* {
  categories&&categories.map(ct=>{(
  <>
  cat.nameEn
  </>
   
  )
  })
} */}

      {/* <div className={'navCategory'}>
  {categories&&categories.map((cat,index)=>{
      {var c= 'navCategoryItem nav'+index}
      return<div className={'item'} style={{maxHeight:'19px' ,margin:'8px 10px',maxWidth:'180px'}}>
     <a href="" className={'categoryLink'}>
         <span style={{width:'20px'}}><svg viewBox="0 0 24 24" id="cat-groceries"></svg>
</span>
         {cat.nameEn}</a>
     
       <div className={c}><Items item={categories&&categories[0].subCategory}/></div>
     </div>
  
      

  })}
</div> */}
      {/* <div className={'navCategory'}>
        {categories &&
          categories.map((category,index) => {
{var classes ='navCategoryItem nav'+index }
           return<div className={'item'} >
            <div
              className="itemName"
              style={{maxHeight:'19px' ,margin:'5px 10px',maxWidth:'180px'}}
            >
             
            <a href=""> <svg
                viewBox="0 0 24 24"
             
                style={{ maxWidth: "1rem" }}
                dangerouslySetInnerHTML={{ __html: category.icon }}
              ></svg>{category.nameEn}</a>
          
            </div>
       
     <div className={classes} ><Items item={category&&category.subCategory}/></div>

          </div>
        



          }
          
          
          )}
      </div> */}
 
        <div style={{ margin: "10px" }} className={"navParent"}>
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
                        <a href="" style={{ textDecoration: "none" }}>
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
     
      {/* <div style={{ margin: "10px" }} className={"navParent"}>
        <ul style={{ listStyle: "none" }}>
          <li>
            <div className="itemName">name</div>
            <div className="itemNav">nav1</div>
          </li>
        </ul>
      </div> */}
    </>
  );
}
