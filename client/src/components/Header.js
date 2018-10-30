import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">
              Logo
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="/auth/google">SignIn with Google</a>
              </li>
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              <li>
                <a href="collapsible.html">JavaScript</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
