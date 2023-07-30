import React from 'react';
const TestimonialsSection = () => {
  return (
    <section className="colored-section" id="testimonials" style={{ backgroundColor: '#00ADB5',border:'none' }}>
      <div id="testimonial-carousel" className="carousel slide" data-ride="false">
        <div className="carousel-inner" style={{paddingLeft:"25px", paddingRight:"25px"}}> 
          <div className="carousel-item active container-fluid" >
            <div className="card text-center">
              <div className="card-Body" style={{ backgroundColor: '#71C9CE'}}>
                <h5 className="card-Title" style={{padding:"25px", color:"#000"}}>Sarah Johnson</h5>
                <p className="card-Text" style={{color:"#000"}}>Track It Down has been a game-changer for our campus! As a student at KMIT, I used to lose my belongings frequently, and it was frustrating not knowing where to look. But with this web application, I can easily report my lost items and, even better, find them again! The platform's centralized database and verification process ensure that my items end up in the right hands. I highly recommend Track It Down to all students and staff for a hassle-free Track it down experience.</p>
              </div>
            </div>
          </div>
          <div className="carousel-item container-fluid">
            <div className="card text-center">
              <div className="card-Body" style={{ backgroundColor: '#71C9CE' }}>
                <h5 className="card-Title" style={{padding:"25px", color:"#000"}}>Michael Roberts</h5>
                <p className="card-Text" style={{color:"#000"}}>Track it down has always been a challenge in educational institutions, but Track It Down has brought a much-needed solution. As a teacher at KMIT, I witness countless lost items causing disruptions in our daily routines. Thanks to this application, our students can now report and locate their lost belongings effortlessly. The system's flexibility and comprehensive database make it a reliable tool for managing lost items on campus. It has truly simplified the process and saved valuable time for both students and staff.</p>
              </div>
            </div>
          </div>
          <div className="carousel-item container-fluid">
            <div className="card text-center">
              <div className="card-Body" style={{ backgroundColor: '#71C9CE' }}>
                <h5 className="card-Title" style={{padding:"25px", color:"#000"}}>Emily Anderson</h5>
                <p className="card-Text" style={{color:"#000"}}>Finally, a reliable and authentic Track it down platform for our college! I've tried various websites in the past, but none compared to Track It Down. The verification process ensures that only the rightful owner can claim a found item, preventing any misuse. The user experience is seamless, and the web application's design is visually appealing and easy to navigate. Thanks to Track It Down, I no longer worry about losing my valuables on campus. It's a must-have tool for everyone at KMIT!</p>
              </div>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#testimonial-carousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </a>
        <a className="carousel-control-next" href="#testimonial-carousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon"></span>
        </a>
      </div>
    </section>
  );
};

export default TestimonialsSection;
