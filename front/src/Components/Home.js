import React, { useState, useRef } from "react";
import Navbar from "./Navbar";

import "../css/landing.css";
import Axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import TitleSection from "./TitleSection";
import FeaturesSection from "./FeatureSection";
import TestimonialsSection from "./TestimonialSection";
import Footer from "./Footer";
export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const ref = useRef();
  AOS.init();

  AOS.init({
    // Global settings:
    disable: false,
    startEvent: "DOMContentLoaded",
    initClassName: "aos-init",
    animatedClassName: "aos-animate",
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,

    offset: 120,
    delay: 0,
    duration: 700,
    easing: "ease",
    once: false,
    mirror: false,
    anchorPlacement: "top-bottom",
  });

  const sendMessage = () => {
    const data = {
      name,
      email,
      message,
    };
    Axios({
      method: "POST",
      url: "http://localhost:5000/sendmessage",
      data: data,
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <div>
    <Navbar />
    <TitleSection />
    <FeaturesSection />
    <TestimonialsSection />
    <Footer />
    
  </div>
  );
}
