import React from "react";
import "../Styles/TopSection.css";
import LeftTop from "./LeftTop";
import MiddleTop from "./MiddleTop";
import RightTop from "./RightTop";
import Nav from "../../Component/CategoryItems/CategoryItems";

function TopSection() {
  return (
    <div className="topSectionContainer">
      <LeftTop />
      {/* <Nav /> */}
      <MiddleTop />
      <RightTop />
    </div>
  );
}

export default TopSection;
