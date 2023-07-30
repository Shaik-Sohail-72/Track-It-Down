import React, { Component } from "react";
import "../css/newSignup.css";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer"

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      info: "",
    };
  }
 
  submit = () => {
    this.setState({
      info: "",
    });
   
    const payload = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      number: document.getElementById("number").value,
      password: document.getElementById("password").value,
      cpassword: document.getElementById("cpassword").value,
    };
    
    axios({
      url: "http://localhost:5000/signup",
      method: "POST",
      data: payload,
    })
      .then((response) => {
       
        this.setState({
          info: response.data,
        });
 
        if (response.data === "Done") {
          this.props.history.push("/log-in");
        }
       
      })
      .catch(() => {
        console.log("Error occured");
      });
  };
  render() {
    // console.log("State is :"+ this.state)
    return (
      <>
        <Navbar />

        <div>
          <form className="Box-1">
            <h1 className="name">Sign up</h1>
            <p style={{ color: "white" }}>{this.state.info}</p>
            <div className="row1">
              <input
                type="text"
                id="firstname"
                placeholder="First Name"
                required
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
              <input
                type="text"
                id="lastname"
                placeholder="Last Name"
                required
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
            </div>
            <div className="row1">
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
              <input
                type="number"
                id="number"
                placeholder="Phone Number"
                required
                onChange={(e) => {
                  this.setState({ number: e.target.value });
                }}
              />
            </div>
       
            <div className="row1">
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                required
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                id="cpassword"
                name="cpassword"
                required
                onChange={(e) => {
                  this.setState({ cpassword: e.target.value });
                }}
              />
            </div>
            <button type="button" className="submit" onClick={this.submit}>
              Submit
            </button>
            <p style={{ color: "white" }}>
              Have an account?{" "}
              <a style={{ color: "black" }} href="/log-in">
                Click here
              </a>
            </p>
          </form>
        </div>
      
      </>
    );
  }
}
