import Navbar from "./layout/Navbar";
import AddUser from "./component/AddUser";
import React from "react";
import NotFound from "./Pages/NotFound";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Contribute from "./Pages/Contribute";

function App() {
  return (
    <Router>
        <Navbar title=" Create Greetings Card"></Navbar>
        <hr/>
        <Routes>               
          <Route
            path="/"
            element={<AddUser/>} 
          />
          <Route
            path="/github"
            element={<Contribute/>} 
          />          
           <Route 
           path="*"          
            element={<NotFound/>} 
          />
       </Routes>
      </Router>
  );
}

export default App;