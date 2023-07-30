import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import ReactDOM from 'react-dom';
// import Navbar from './Components/Navbar'
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Feed from "./Components/Feed";
import Response from "./Components/Response";
import "bootstrap/dist/css/bootstrap.min.css";
// import NotFound from './Components/NotFound'
import PrivateRoute from "./Components/privateroute";
import Home from "./Components/Home";
import ItemPage from "./Components/ItemPage";
// import Feed from './Components/Feed'
import MyListings from "./Components/MyListings";
import Feature from "./Components/Feature"
import { ToastProvider } from "react-toast-notifications";
window.OneSignal = window.OneSignal || [];
const OneSignal = window.OneSignal;
function App() {
 
  
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/sign-up" component={Signup} exact />
          <Route path="/log-in" component={Login} />
          <Route path="/feed" component={Feed} />
          <Route path="/mylistings" component={MyListings} exact />
          <Route path="/responses" component={Response} exact />
          <Route path="/features" component={Feature} exact />
          <ToastProvider autoDismiss={true} placement={"bottom-right"}>
            <Route path="/:item" component={ItemPage} exact />
          </ToastProvider>
          {/* <Route path='*' component={NotFound}/> */}
        </Switch>
      </Router>
      {/* <Signup/> */}
    </>
  );
}

export default App;
