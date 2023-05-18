import "./App.css";
import Home from "./home/Home";
import  Details from './containers/details/Details'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home />}/>
          <Route path={"/:cardID/:listID"} element={<Details />} />   
      </Routes>
    </div>
  );
}

export default App;
