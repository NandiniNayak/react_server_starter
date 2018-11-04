import React, { Component } from "react";
import axios from "axios";
import Landing from "./Landing";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";

const ListItem = props => {
  return props.blogs.map(blog => (
    <div key={blog._id}>
      <h3>{blog.title}</h3>
      <p>{blog.description}</p>
    </div>
  ));
};
class Listing extends Component {
  constructor() {
    super();
    this.state = {
      blogs: []
    };
  }
  componentDidMount() {
    console.log("Component Did mount");
    axios
      .get("/api/blogs")
      .then(response => {
        this.props.handleBlogs(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    console.log(this.props);
    console.log("render");
    return (
      <div className="container">
        <h1> Listing Blogs </h1>
        <div className="card">
          <div className="card-content">
            <div className="row">
              <ListItem blogs={this.props.blogs} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Listing;
