/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./VisionMission.scss";
import abt from "../../assets/vision-2.jpeg";

const VisionMission = () => {
  return (
    <div className="vision__section">
      <div className="vision__image">
        <img src={abt} alt="VM image" />
      </div>
      <div className="vision__text">
        <div className="header__box">
          <div className="upper_line"></div>
          <h2>Vision</h2>
          <div className="lower_line"></div>
        </div>
        <p>
          To be the leading professional body in Lagos State, setting the
          standard for excellence in automotive repair and maintenance, and
          empowering auto technicians with the skills, knowledge, and ethical
          practices to excel in their craft. We envision a future where every
          vehicle owner enjoys reliable, high-quality service from trusted and
          certified technicians, contributing to the safety and well-being of
          our community.
        </p>
      </div>
    </div>
  );
};

export default VisionMission;
