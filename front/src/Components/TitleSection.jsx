import React from 'react';

const TitleSection = () => {
  return (
    <section className="colored-section" id="title">
      <div className="container-fluid">
        {/* Title */}
        <div className="row">
          <div className="col-lg-6">
          <h1 className="big-heading">TRACK IT DOWN</h1>
            <h1 >A Digital Way To Find Your Belongings</h1>
            <a className="btn btn-light btn-lg download-button" href="/log-in">
              <i className="fas fa-user"></i> Sign-In
            </a>
            <a className="btn btn-outline-light btn-lg download-button" href="/sign-up">
              <i className="fas fa-user-plus"></i> Sign-Up
            </a>
          </div>
          <div className="col-lg-6">
            <img className="title-image" src={require('./iphone6.png')} alt="iphone-mockup" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TitleSection;
