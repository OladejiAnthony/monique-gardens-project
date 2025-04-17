/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./Mission.scss";
import abt from "../../assets/train.jpg";

const Mission = () => {
  return (
    <div className="mission__section">
      <div className="mission__text">
        <div className="header__box">
          <div className="upper_line"></div>
          <h2>Mission</h2>
          <div className="lower_line"></div>
        </div>
        <p>
          We are dedicated to empowering women and youth by providing the
          knowledge, skills, and resources they need to excel in agriculture and
          agribusinesses. Through strategic training, capacity development, and
          awareness initiatives, we champion research-based practices, efficient
          land use, and the integration of cutting-edge technology. Our mission
          is to foster sustainable livelihoods and nurture the next generation
          of agricultural leaders and  millionaires.
        </p>
      </div>
      <div className="mission__image">
        <img src={abt} alt="VM image" />
      </div>
    </div>
  );
};

export default Mission;
