import React from 'react';
import '../Styles/rightOptionsContainer.css';

function RightOptions({ Icon, title, description }) {
  return (
    <div className="rightOptionsContainer">
      <div className="rightIcon">{Icon && <Icon />}</div>
      <div className="rightIconDec">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default RightOptions
