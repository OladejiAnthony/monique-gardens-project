import React from "react";
import styles from "./HeaderImage.module.scss";
import img from "../../assets/product-nursery.jpg";
const HeaderImage = () => {
  return (
    <div className={styles.container}>
      <img src={img} alt="HeaderImage" className={styles.bgImage} />
      <div className={styles.overlay}>
        <h1>Welcome to Monique Gardens</h1>
        <p>Discover our beautiful garden</p>
      </div>
    </div>
  );
};

export default HeaderImage;
