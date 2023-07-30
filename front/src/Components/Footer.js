import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="colored-section" id="footer">
      <div className="container-fluid">
        <a href="mailto:intrusiondetection786@gmail.com" target="_blank">
          <i className="social_icon fas fa-envelope fa-2x" style={{ color: '#fff' }}></i>
        </a>
        <a href="https://www.shaiksohail.xyz/" target="_blank">
          <i className="social_icon fas fa-globe fa-2x" style={{ color: '#fff' }}></i>
        </a>
        <a href="https://github.com/shaik-sohail-72" target="_blank">
          <i className="social_icon fab fa-github fa-2x" style={{ color: '#fff' }}></i>
        </a>
        <a href="https://www.linkedin.com/in/shaik-sohail-a7b7aa240/" target="_blank">
          <i className="social_icon fab fa-linkedin fa-2x" style={{ color: '#fff' }}></i>
        </a>
        <p>© {currentYear} TRACK IT DOWN</p>
      </div>
    </footer>
  );
};

export default Footer;
