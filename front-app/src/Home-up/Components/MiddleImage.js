import React from 'react';
import '../Styles/MiddleImage.css';
import middleImage from '../images/middleimage.PNG';

function MiddleImage() {
  return (
    <div className="middleImageContainer"> 
       <img src={middleImage} />
    </div>
  )
}

export default MiddleImage
