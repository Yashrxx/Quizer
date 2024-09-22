import React from "react";
// import { useState} from 'react';
import Home from './components/home.js';
import Quizinstructions from "./components/quiz/Quizinstructions.js";
import Play from "./components/quiz/Play.js";
import Analysis from './components/quiz/Analysis.js';
import Navbar from './components/Navbar';
import Login from "./components/quiz/Login.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
function App() {
  return (
    <Router>
    <Navbar title="Quizer" aboutText="About Us" mode="black"/>
    <Routes>
     {/* <Alert/> */}
     <Route path="/quizer" exact element={<Home/>}/>
     <Route path="/play/instructions" exact element={<Quizinstructions/>}/>
     <Route path="/play/quiz" alert={alert} exact element={<Play/>}/>
     <Route path="/play/quiz/analysis" exact element={<Analysis/>}/>
     <Route path="/login" exact element={<Login/>}/>
     </Routes>
    </Router>
  );
}
export default App;
