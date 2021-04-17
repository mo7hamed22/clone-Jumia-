import React from 'react';
import '../Styles/Header.css';
import Button from '@material-ui/core/Button';
import { Search } from '@material-ui/icons';
import HeaderOptionLeft from '../Components/HeaderOptionLeft';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
     <PersonOutlineIcon/> Login
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        style={{width:'200px'}}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}  style={{width:'200px'}}>
        <Button style={{padding:'10px 40px',backgroundColor:'#f68b1e'}} >
   Login
      </Button>

        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
        <HeaderOptionLeft Icon={HelpOutlineIcon} title="Help" DropIcon={ExpandMoreIcon} />
        <HeaderOptionLeft Icon={ShoppingCartIcon} title="Cart" />
      </div>
    </div>
  )
}

export default Header
