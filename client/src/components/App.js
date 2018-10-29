import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import logo from "./logo.svg";
// import "./App.css";
import Header from "./Header";
// create components/routes
// const Header = () => <h1> Header </h1>;
const Footer = () => <h1> Footer </h1>;
const Landing = () => <h1> Landing </h1>;
const Dashboard = () => <h1> Dashboard </h1>;

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<a href="/auth/google">SignIn With Google</a>*/}
        {/*browserRouter allows us to navigate between various routes and decide what component needs to shown*/}
        <BrowserRouter>
          <div>
            {/*render different routes*/}
            <Route path="/" component={Header} />
            {/*exact property exactly mathces the url currently visited on the port to the one passed to the Route*/}
            <Route exact path="/" component={Landing} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" component={Footer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
