import React from 'react';
import '../Styles/Header.css';
import Button from '@material-ui/core/Button';
import { Search } from '@material-ui/icons';
import HeaderOptionLeft from '../Components/HeaderOptionLeft';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Header() {
  return (
    <div className="headerContainer">
      <img className="logo" src="https://cdn.freelogovectors.net/wp-content/uploads/2019/02/jumia-logo.png" alt="" />

      <div className="headerLeft">
        <div className="headerSearch">
          <Search />
          <input className="inputContainer" placeholder="Search products, brands and categories" />
        </div>
        <Button
          variant='contained'
          className="inputButton"
        >SEARCH</Button>
      </div>

      <div className="headerRight">
        <HeaderOptionLeft Icon={PersonOutlineIcon} title="Login" DropIcon={ExpandMoreIcon} />
        <HeaderOptionLeft Icon={HelpOutlineIcon} title="Help" DropIcon={ExpandMoreIcon} />
        <HeaderOptionLeft Icon={ShoppingCartIcon} title="Cart" />
      </div>
    </div>
  )
}

export default Header
