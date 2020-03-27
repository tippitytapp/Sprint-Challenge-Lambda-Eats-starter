import React, {useState, useEfect} from "react";
import {Route, Link, Switch} from "react-router-dom";
import Form from "./components/form";
import Home from "./components/home";
import "./App.css"


const App = () => {
  return (
    <>
    <div className="nav">
      <h1>Lambda Eats</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/pizza">Create Your Own</Link>
      </nav>
      </div>
      <Switch>
        <Route path="/pizza"><Form /></Route>
        <Route path="/"><Home /></Route>
      </Switch>
    </>
  );
};
export default App;
