import React from "react";

const TestiSlide = ({ description, src, name, position }) => {
  return (
    <li>
      <div className="top">
        <img src={src} alt="icon" />
        <div>
          <h3>{name}</h3>
          <p>{position}</p>
        </div>
      </div>
      <div className="bottom">
        <p>{description}</p>
      </div>
    </li>
  );
};

export default TestiSlide;
