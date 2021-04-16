import React, { useState, useEffect } from 'react';
import '../Styles/MiddleTop.css';
import image1 from '../images/firstimage.jpg';
import image2 from '../images/secondimage.jpg';
import image3 from '../images/thirdimage.gif';
import image4 from '../images/forthimage.jpg';
import image5 from '../images/fifthimage.jpg';
import image6 from '../images/sixthimage.jpg';
import image7 from '../images/seventh.jpg';
import image8 from '../images/lastimage.jpg';
import ButtonSlides from '../Components/ButtonSlides';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

function MiddleTop() {
  const [pic, setPic] = useState(0);
  const [style, setStyle] = useState({ display: 'none' });

  const imageArray = [image1, image2, image3, image4, image5, image6, image7, image8]

  useEffect(() => {
    const interval = setInterval(() => {
      if (pic <= 0 || pic <= (imageArray.length)) {
        setPic(pic + 1);
      }
      if (pic == imageArray.length - 1) {
        setPic(0)
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [pic]);

  const leftMove = () => {
    if (pic <= 0 || pic <= (imageArray.length - 1)) {
      setPic(pic - 1)
    }
    if (pic == 0) {
      setPic(7)
    }
  }

  const rightMove = () => {
    if (pic <= 0 || pic <= (imageArray.length - 1)) {
      setPic(pic + 1)
    }
    if (pic == 7) {
      setPic(0)
    }
  }

  const leftButton = (
    <div className="leftButton"
      onMouseEnter={e => {
        setStyle({ display: 'block' });
      }}
      onMouseLeave={e => {
        setStyle({ display: 'none' })
      }}
      style={{ height: '20px', width: '20px', zIndex: 1000, position: 'absolute', left: '10%', top: '45%' }}
    ><KeyboardArrowLeftIcon onClick={() => leftMove()} style={style} /></div>
  )

  const rightButton = (
    <div className="rightButton"
      onMouseEnter={e => {
        setStyle({ display: 'block' });
      }}
      onMouseLeave={e => {
        setStyle({ display: 'none' })
      }}
      style={{ height: '20px', width: '20px', zIndex: 1000, position: 'absolute', right: '10%', top: '45%' }}
    ><KeyboardArrowRightIcon onClick={() => rightMove()} style={style} /></div>
  )

  return (
    <div className="middleTopContainer">
      {leftButton}
      <img src={imageArray[pic]} alt="" />
      {rightButton}
      {imageArray[0] && <div className="buttonSlideContainer">
        <ButtonSlides pic={pic} index={0} />
        <ButtonSlides pic={pic} index={1} />
        <ButtonSlides pic={pic} index={2} />
        <ButtonSlides pic={pic} index={3} />
        <ButtonSlides pic={pic} index={4} />
        <ButtonSlides pic={pic} index={5} />
        <ButtonSlides pic={pic} index={6} />
        <ButtonSlides pic={pic} index={7} />
      </div>
      }
    </div>
  )
}

export default MiddleTop
