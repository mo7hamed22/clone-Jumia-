import "./App.css";
import { Button } from "@material-ui/core";
import PrimarySearchAppBar from "./navbar";
import Billboard from "./Home-up/Components/Billboard";
import Header from "./Home-up/Components//Header";
import MiddleImage from "./Home-up/Components//MiddleImage";
import QuickLinks from "./Home-up/Components//QuickLinks";
import TopSection from "./Home-up/Components//TopSection";
import Footer from './Component/footer/Footer'
import Register from "./pages/Register/Register";
import Login from './pages/Login/Login'
function App() {
  return (
    <div className="App">
      {/* <PrimarySearchAppBar /> */}
      {/* <Billboard />
      <MiddleImage />
      <Header />
      <TopSection />
      <QuickLinks />
      <Footer/> */}
      <Register/>
      {/* <Login/> */}
    </div>
  );
}

export default App;
