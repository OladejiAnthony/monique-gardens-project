import React from "react";
import "./Team.scss";
import leader1 from "../../assets/Ceo.jpg";
import leader2 from "../../assets/mrs-vic.jpg";
import leader3 from "../../assets/mr-yinka.jpg";
import leader4 from "../../assets/dr-fisayo.jpg";
import leader5 from "../../assets/dr-olawepo.jpg";
import leader6 from "../../assets/prof-atteh.jpg";
import leader7 from "../../assets/mr-ojo.jpg";
import leader8 from "../../assets/sophia.jpg";
import leader9 from "../../assets/dr-femi.jpg";
import leader10 from "../../assets/abiola.jpg";
import leader11 from "../../assets/prof-akanbi.jpg";
import leader12 from "../../assets/dr-riha.jpg";

const Team = () => {
  return (
    <div className="leaders__section">
      <div className="heading">
        <h2>Meet Our Team</h2>
      </div>
      <div className="leaders__images">
        <div className="leader_image">
          <img src={leader1} alt="leader1" />
          <h3>Dr Mrs Monica Ododo</h3>
          <p>CEO</p>
        </div>
        <div className="leader_image">
          <img src={leader2} alt="leader2" />
          <h3>Mrs Victoria Adeyemi</h3>
          <p>Asst. Director</p>
        </div>
        <div className="leader_image">
          <img src={leader6} alt="leader6" />
          <h3>Professor Atteh</h3>
          <p>Poultry Farming Lecturer</p>
        </div>
        <div className="leader_image">
          <img src={leader3} alt="leader3" />
          <h3>Mr Yinka Adeleke </h3>
          <p>Poultry Farming Trainer</p>
        </div>
        <div className="leader_image">
          <img src={leader7} alt="leader7" />
          <h3>Mr Stephen Ojo Alasi</h3>
          <p>Fishery Lecturer (Animal Husbandry)</p>
        </div>
        <div className="leader_image">
          <img src={leader4} alt="leader4" />
          <h3>Dr Fisayo </h3>
          <p>Animal Husbandry Lecturer</p>
        </div>
        <div className="leader_image">
          <img src={leader5} alt="leader5" />
          <h3>Dr Taiye Olawepo </h3>
          <p>Crop Production Lecturer</p>
        </div>
        <div className="leader_image">
          <img src={leader8} alt="leader8" />
          <h3>Sophia Olanrewaju ESQ 1</h3>
          <p>Entreprenuership and Communication skills</p>
        </div>
        <div className="leader_image">
          <img src={leader9} alt="leader9" />
          <h3>Dr Femi Olabanji</h3>
          <p>Animal Husbandry Lecturer</p>
        </div>
        <div className="leader_image">
          <img src={leader10} alt="leader10" />
          <h3>Dr Abiola Ojeleye </h3>
          <p>Post Harvest Lecturer</p>
        </div>
        <div className="leader_image">
          <img src={leader11} alt="leader11" />
          <h3>Prof Akanbi</h3>
          <p>Crop Production Lecturer</p>
        </div>
        <div className="leader_image">
          <img src={leader12} alt="leader12" />
          <h3>Dr Rihanat Asafa </h3>
          <p>Crop Production Lecturer 2</p>
        </div>
      </div>
    </div>
  );
};

export default Team;
