import React from "react";
import { setConstraint } from "../constraints";
import axios from "axios";
import LostItem from "./Lost_item";
import { ToastProvider } from 'react-toast-notifications';


function Navbar() {
  const token = window.localStorage.getItem("token");
  
  const signout = () => {
    // constraint.LOGGED_IN = false;
    setConstraint(false);

    console.log("Signed out !");
    axios({
      url: "http://localhost:5000/signout",
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then(localStorage.clear())
      .catch((error) => {
        console.log(error);
        // console.log("Error occured");
      });
  };
  if(token == null){
    return (
    <> 
    <section className="colored-section" id="title">
      <div style={{ paddingTop:"3%", paddingLeft:"7%", paddingRight:"7%",paddingBottom:"0%"}}>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <a className="navbar_brand" href="/">
            TID
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#signin">
            <span className="navbar-toggler-icon"></span>
          </button>
            <div 
          style={token ? { display: "none" } : {}}
          className="collapse navbar-collapse" id="signin">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            <a className="nav-link" id="a"
              style={{ textDecoration: "none", color: "white" }}
              href="https://shaiksohail.xyz/" target="_black"
            >
              Contact Us
            </a>
            </li>
          </ul>
        </div>
        </nav>
      </div>
    </section>
    </>
  );
  }
    else{
      return(
        
        <section className="colored-section" id="title">
        <div style={{ paddingTop:"3%", paddingLeft:"7%", paddingRight:"7%",paddingBottom:"0%"}}>
        <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar_brand" href="/">
          TID
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#postsignin">
          <span className="navbar-toggler-icon"></span>
        </button>
      <div style={token ? {} : { display: "none" }} className="collapse navbar-collapse"  id="postsignin">
       
         <ul className="navbar-nav ml-auto">
          <li className="nav-item">
          <ToastProvider autoDismiss={true} placement={"bottom-right"}>
          <div>
            <LostItem />
          </div>
        </ToastProvider>

          </li>
          <li className="nav-item">
          <a className="nav-link" style={{ textDecoration: "none", color: "white" }} href="/feed">
            Feed
          </a>
          </li>
          <li className="nav-item">
           <a className="nav-link"
            style={{ textDecoration: "none", color: "white" }}
            href="/responses"
          >
            Responses
          </a>
          </li>
          <li className="nav-item">
          <a className="nav-link"
            style={{ textDecoration: "none", color: "white" }}
            href="/mylistings"
          >
            My Listings
          </a>
          </li>
          <li className="nav-item">
          <a className="nav-link"
            style={{ textDecoration: "none", color: "white" }}
            href="/features"
          >
            Features
          </a>
          </li>

          <li className="nav-item">
          <a className="nav-link"
            style={{ textDecoration: "none", color: "white" }}
            href="https://shaiksohail.xyz/" target="_blank"
          >
            Contact Us
          </a>
          </li>
        
          
          <li className="nav-item">
          <a className="nav-link"
            style={{ textDecoration: "none", color: "white" }}
            onClick={signout}
            href="/log-in"
          >
            Sign-out
          </a>
          </li>
        </ul>
      </div>
      </nav>
      </div>
      </section>
      );
    }
  }

export default Navbar;
