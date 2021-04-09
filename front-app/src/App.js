import './App.css';
import {Button} from '@material-ui/core'; 
import PrimarySearchAppBar from './navbar';
import Test from './test'

function App() {
  return (    
    <div className="App">
      <PrimarySearchAppBar />
      <Test></Test>
       {/* <Button color="primary" variant="contained"> Press me </Button>  */}
    </div>
  );
}

export default App;
