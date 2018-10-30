import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: ""
    };
  }

  logChange = event => {
    this.setState({
      // the title and description from the form which corresponds to the attribute name is passed as an event target
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  };
  // every event method must be a arrow method
  handleSubmit = event => {
    event.preventDefault();
    // create a blog data that can be posted to the express route
    // create a copy of the state variable
    var newBlog = {
      title: this.state.title,
      description: this.state.description
    };
    // to make a post request to the express route
    axios
      .post("/api/blogs", newBlog)
      .then(response => {
        console.log(response);
        console.log("data saved successfully");
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <h1> Add Blog</h1>
        <div className="row">
          <form onSubmit={this.handleSubmit} className="col s12" method="post">
            <div className="row">
              <div className="input-field col s6">
                <input
                  placeholder="Title"
                  id="title"
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
                <input
                  id="description"
                  type="text"
                  className="validate"
                  name="description"
                  value={this.state.description}
                  onChange={this.logChange}
                />
              </div>
            </div>
            <div className="row">
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Submit
                <i className="material-icons right" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
