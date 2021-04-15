import "./App.css";
import { Button } from "@material-ui/core";
import PrimarySearchAppBar from "./navbar";
import Billboard from "./Home-up/Components/Billboard";
import Header from "./Home-up/Components//Header";
import MiddleImage from "./Home-up/Components//MiddleImage";
import QuickLinks from "./Home-up/Components//QuickLinks";
import TopSection from "./Home-up/Components//TopSection";

function App() {
  return (
    <div className="App">
      {/* <PrimarySearchAppBar /> */}
      <Billboard />
      <MiddleImage />
      <Header />
      <TopSection />
      <QuickLinks />
    </div>
  );
}

export default App;
