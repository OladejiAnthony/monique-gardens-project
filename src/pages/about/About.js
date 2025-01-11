import React from "react";
import styles from "./About.module.scss";
import HeaderImage from "../../components/about/HeaderImage";
import CeoProfile from "../../components/about/CeoProfile";
import CompanyBrief from "../../components/about/CompanyBrief";
import Team from "../../components/about/Team";
import Clients from "../../components/about/Clients";

const About = () => {
  return (
    <>
      <HeaderImage />
      <div className={styles.about}>
        <CeoProfile />
        <CompanyBrief />
        <Clients />
        <Team />
      </div>
    </>
  );
};

export default About;
