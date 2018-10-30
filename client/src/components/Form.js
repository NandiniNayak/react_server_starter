import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    // console.log(this);
    this.state = {
      title: "",
      description: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    // create a variable that should be passed to the database
    var blog = {
      title: this.state.title,
      description: this.state.description
    };
    console.log("blog data is fetched");
    console.log(blog);
    axios
      .post("/api/blogs", blog)
      .then(response => {
        console.log(response.data);
        console.log("saved successfully");
        this.props.handleNewBlog(response.data);
      })
      .catch(err => console.log(err));
  };
  logChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  render() {
    return (
      <div className="container">
        <h1> Add a Blog </h1>
        <div className="card">
          <div className="card-content">
            <div className="row">
              <form onSubmit={this.handleSubmit} method="post">
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      placeholder="Title"
                      id="first_name"
                      type="text"
                      className="validate"
                      name="title"
                      value={this.state.title}
                      onChange={this.logChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    {/*<label for="description">Description</label>*/}
                    <input
                      placeholder="Description"
                      id="first_name"
                      type="text"
                      className="validate"
                      name="description"
                      value={this.state.description}
                      onChange={this.logChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
