import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import {
  Switch,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Login from "./components/Pages/LogIn/Login";
import SignUp from "./components/Pages/SignUp/SignUp";
import { Protected } from "./components/Protected/Protected";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={Protected}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={SignUp}></Route>
            {/*<Route path="/protected" component={Protected}></Route> */}          
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
