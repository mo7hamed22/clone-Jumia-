import React from 'react';
import '../Styles/RightTop.css';
import RightOptions from './RightOptions';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';

function RightTop() {
  return (
    <div className="rightTopContainer">
      <div className="rightTopDiv">
        <RightOptions Icon={HelpOutlineIcon} title="HELP CENTER" description="Guide To Customer Care" />
        <RightOptions Icon={DonutLargeIcon} title="EASY RETURN" description="Quick Refund" />
        <RightOptions Icon={MonetizationOnIcon} title="SELL ON JUMIA" description="Millions Of Visitors" />
      </div>
      <div className="rightBottomDiv">
        <img src="https://ke.jumia.is//cms/2021/W02/Prime/KE_Prime_122_BF-(1).gif"/>
      </div>
    </div>
  )
}

export default RightTop
