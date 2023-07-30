import React from 'react';
import './HomeStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileAlt, faFileUpload, faDatabase, faShieldAlt,faBell } from '@fortawesome/free-solid-svg-icons';
const FeaturesSection = () => {
  return (
    <section className="white-section" id="features">
      <div className="container-fluid">
        <div className="row" style={{ color: 'hsl(180, 70%, 70%)'}}>
          <div className="feature-box col-lg-4">
            <FontAwesomeIcon className="icon-distance" icon={faUser} size="4x" />
            <h3 className="feature-title">User Registration and Authentication</h3>
            <p className="feature-desc">Allow users, both students, and college administration, to register and create accounts. Implement a robust authentication system to ensure secure access to the application, protecting users' personal information.</p>
          </div>
          <div className="feature-box col-lg-4">
            <FontAwesomeIcon className="icon-distance" icon={faFileAlt} size="4x" />
            <h3 className="feature-title">Lost Item Reporting</h3>
            <p className="feature-desc">Enable users to report their lost items through a simple and intuitive interface. Users can provide details such as the item's description, location where it was lost, and any relevant additional information.</p>
          </div>
          <div className="feature-box col-lg-4">
            <FontAwesomeIcon className="icon-distance" icon={faFileUpload} size="4x" />
            <h3 className="feature-title">Found Item Submission</h3>
            <p className="feature-desc">Allow users who find lost items to submit a report with details about the found item. They can include a description, the location where they found it, and possibly upload a picture to help with identification.</p>
          </div>
          <div className="feature-box col-lg-4">
            <FontAwesomeIcon className="icon-distance" icon={faDatabase} size="4x" />
            <h3 className="feature-title">Centralized Database</h3>
            <p className="feature-desc">mplement a MongoDB database to store all reported lost and found items. This database should be well-organized and easily searchable, allowing users to efficiently locate and claim their lost belongings.</p>
          </div>
          <div className="feature-box col-lg-4">
            <FontAwesomeIcon className="icon-distance" icon={faShieldAlt} size="4x" />
            <h3 className="feature-title">Verification Process for Claiming Items</h3>
            <p className="feature-desc">Introduce an authentication mechanism, such as security questions, to verify the rightful owner of a found item. This step is essential to ensure that items are returned to the correct person and prevent any misuse.</p>
          </div>
          <div className="feature-box col-lg-4">
          <FontAwesomeIcon className="icon-distance" icon={faBell} size="4x" />
            <h3 className="feature-title">User Dashboard and Notifications</h3>
            <p className="feature-desc">Provide users with personalized dashboards where they can view their reported lost items and the status of their claims. Implement a notification system to update users on the progress of their lost item reports and any responses from the platform.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
