import React, { Component } from "react";
import axios from "axios";
import Landing from "./Landing";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Modal from "react-modal";

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      // when the modal or the pop up widow is closed set the flag modalisOpen to false
      modalIsOpen: false,
      // state variables title and description is created to keep track of the blog received from map method which can be passes to other methods in the class such as render-> form-> openModal and closeModal
      title: "",
      description: ""
    };
  }
  openModal = blog => {
    this.setState({
      modalIsOpen: true,
      _id: blog._id,
      title: blog.title,
      description: blog.description
    });
  };

  listItem = blogs => {
    return blogs.map(blog => (
      <div key={blog._id}>
        <h3>{blog.title}</h3>
        <p>{blog.description}</p>
        {/*// blog variable keeps track of the title and description that you see
        // on the listing component*/}
        <button onClick={() => this.openModal(blog)}>Edit </button>
      </div>
    ));
  };

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
  // method captures the info from the modal form
  logChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  handleEdit = e => {
    e.preventDefault();
    // create a variable that should be passed to the database
    var blog = {
      _id: this.state._id,
      title: this.state.title,
      description: this.state.description
    };
    console.log("blog data is fetched");
    console.log(blog);
    axios
      .put("/api/blogs", blog)
      .then(response => {
        console.log(response.data);
        console.log("saved successfully");
        this.props.handleNewBlog(response.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.props);
    console.log("render");
    return (
      <div className="container">
        <h1> Listing Blogs </h1>
        <div className="card">
          <div className="card-content">
            <div className="row">
              {/*// <ListItem blogs={this.props.blogs} />*/}
              {this.listItem(this.props.blogs)}
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                ariaHideApp={false}
                contentLabel="Example Modal"
                className="Modal-open"
              >
                <form onSubmit={this.handleEdit} method="POST">
                  <label>Title</label>
                  <input
                    className="form-control"
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.logChange}
                  />
                  <label>Description</label>
                  <input
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.logChange}
                  />
                  <button className="btn btn-uth-submit">Submit</button>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Listing;
