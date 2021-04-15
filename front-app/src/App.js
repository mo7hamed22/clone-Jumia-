import './App.css';
import {Button} from '@material-ui/core'; 
import PrimarySearchAppBar from './navbar';
import Nav from './Component/CategoryNav/Nav'
import Register from './pages/Register/Register.jsx';

function App() {
  return (    
    <div className="App">
      <PrimarySearchAppBar />
      {/* Menu Component */}
      {/* <Nav/> */}
<Register/>
       {/* <Button color="primary" variant="contained"> Press me </Button>  */}
    </div>
  );
}

export default App;
