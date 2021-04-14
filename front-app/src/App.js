import './App.css';
import {Button} from '@material-ui/core'; 
import PrimarySearchAppBar from './navbar';
import Nav from './Component/CategoryNav/Nav'


function App() {
  return (    
    <div className="App">
      <PrimarySearchAppBar />
      {/* Menu Component */}
      {/* <Nav/> */}

       {/* <Button color="primary" variant="contained"> Press me </Button>  */}
    </div>
  );
}

export default App;
