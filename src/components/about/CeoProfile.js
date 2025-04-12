import React from "react";
import styles from "./CeoProfile.module.scss";
import ceoImage from "../../assets/Ceo-profile.jpg";

const CeoProfile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftHS}>
        <h2>CEO Monique Gardens</h2>
        <p>
          Monica Onyeche Sunnie-Ododo is a Botanist/Agronomist with a PhD in
          Agronomy. She is a Heritage Professional with specialty in
          Agricultural Heritage. She currently works as an Assistant Director
          with the National Commission for Museums and Monuments in the
          Department of Monuments, Heritage and Sites. And she has worked with
          and offered several insightful contributions to the commission in the
          last 20 years. Dr Monica Sunnie-Ododo is the notable CEO of Monique
          Gardens and Horticultural Arena; an agricultural outfit that
          distributes tree crops, vegetables, Birds (eg, Broiler, Noiler, Layer,
          Turkey, Guinea fowl and fish). It also offers training and
          agricultural tourism services. She is happily married and blessed with
          beautiful children.
        </p>
      </div>
      <div className={styles.Rhs}>
        <img src={ceoImage} alt="ceo" className={styles.ceoImage} />
      </div>
    </div>
  );
};

export default CeoProfile;
