import React from 'react';
import '../Styles/Billboard.css';
import billboard from '../images/topimage.gif';
 
function Billboard() {
  return (
    <div className="billboardContainer">
      <img src={billboard} />
    </div>
  )
}

export default Billboard
