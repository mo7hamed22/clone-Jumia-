import React from "react";
import "./CategoryItems.css";

export default function SelectedListItem(props) {
  console.log(props.item);

  return (
    <>
      <div className="categories">
        {props.item &&
          props.item.map((item) => (
            <div className="category">
              <div className="categoryName">
                {item.subCatName}
                <hr />
                <div className="links">
                  {item.subCatArray.map((n) => (
                    <a className={"linkItem"}> {n} </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
