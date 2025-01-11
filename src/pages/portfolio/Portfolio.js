import React from "react";
import styles from "./Portfolio.module.scss";
import HeaderImage from "../../components/about/HeaderImage";

const Portfolio = () => {
  return (
    <>
      <HeaderImage />
      <div className={styles.portfolio}>Portfolio</div>
    </>
  );
};

export default Portfolio;
