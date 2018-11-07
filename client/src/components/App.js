import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import logo from "./logo.svg";
// import "./App.css";
import Header from "./Header";
import Form from "./Form";
import Listing from "./Listing";
// create components/routes
// const Header = () => <h1> Header </h1>;
const Footer = () => <h1> Footer </h1>;
// const Landing = () => <h1> Landing </h1>;
const Dashboard = () => <h1> Dashboard </h1>;
const Stories = () => <h1> Stories </h1>;

class App extends Component {
  constructor() {
    super();
    this.state = {
      blogs: []
    };
  }

  handleBlogs = blogs => {
    this.setState({ blogs: blogs });
    console(blogs);
  };

  handleNewBlog = blog => {
    this.setState({ blogs: [...this.state.blogs, blog] });
  };

  handledeletedBlog = id => {
    // create a copy of the existing blogs array
    const index = this.state.blogs.findIndex(blog => blog._id === id);
    const blogs = [...this.state.blogs];
    blogs.splice(index, 1);
    this.setState({
      blogs: blogs
    });
  };

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
            <div className="row">
              <div className="col s6">
                <Route
                  path="/"
                  render={routeProps => (
                    <Form {...routeProps} handleNewBlog={this.handleNewBlog} />
                  )}
                />
              </div>

              <div className="col s6">
                <Route
                  path="/"
                  render={routeProps => (
                    <Listing
                      {...routeProps}
                      blogs={this.state.blogs}
                      handleBlogs={this.handleBlogs}
                      handledeletedBlog={this.handledeletedBlog}
                    />
                  )}
                />
                {/*<Listing
                  blogs={this.state.blogs}
                  handleBlogs={this.handleBlogs}
                  handledeletedBlog={this.handledeletedBlog}
                />*/}
              </div>
            </div>

            {/*<div className="row">
              <div className="col s6">
                <Form handleNewBlog={this.handleNewBlog} />
              </div>
              <div className="col s6">
                <Listing
                  blogs={this.state.blogs}
                  handleBlogs={this.handleBlogs}
                  handledeletedBlog={this.handledeletedBlog}
                />
              </div>
            </div>*/}
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/stories" component={Stories} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
