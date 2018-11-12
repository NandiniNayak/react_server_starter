import React, { Component } from "react";
import axios from "axios";
import Landing from "./Landing";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Modal from "react-modal";

import { connect } from "react-redux";
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

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };
  remove = blog => {
    axios
      .delete("/api/blogs", { data: blog })
      .then(() => {
        // instead of making a get request to fetch blogs again loop through the existing blogs in the state (App.js) and pass the blog that matches the id requested
        // a callback method in App.js is called to remove the blog from existing blogs in the state
        this.props.handledeletedBlog(blog._id);
      })
      .catch(console.log);
  };

  listItem = blogs => {
    return blogs.map(blog => (
      <div key={blog._id}>
        <h3>{blog.title}</h3>
        <p>{blog.description}</p>
        {/*// blog variable keeps track of the title and description that you see
        // on the listing component*/}
        <button onClick={() => this.openModal(blog)}>Edit </button>
        <button onClick={() => this.remove(blog)}>Delete</button>
      </div>
    ));
  };

  fetchBlogs = () => {
    axios
      .get("/api/blogs")
      .then(response => {
        this.props.handleBlogs(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.fetchBlogs();
  }
  // bad implementation
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.blogs !== this.props.blogs) {
      // this.fetchBlogs();
      console.log("componentDidUpdate");
      console.log(prevProps.blogs);
      console.log(this.props.blogs);
    }
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
        // this is a easy solution but a best solution,
        // because we are unnecssarily making another get request
        // this.fetchBlogs();
        const updatedBlogs = this.props.blogs.map(blog => {
          if (blog._id === response.data._id) {
            return response.data;
          }
          return blog;
        });
        // close the pop up window
        this.closeModal();
        // update the state with new set of blogs
        this.props.handleBlogs(updatedBlogs);
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

// subscribe the updated setState
const mapStateToProps = state => {
  return {
    blogs: state.blogs
  };
};
// dispatch an action
const mapDispatchToProps = dispatch => {
  return {
    handleBlogs: blogs => dispatch({ type: "SET_BLOGS", val: blogs }),
    handledeletedBlog: id => dispatch({ type: "DELETE_BLOG", val: id })
  };
};

// connect the subscribe and dispatch function to the store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listing);
