import React from "react";
import styles from "./CompanyBrief.module.scss";
import companyImage from "../../assets/vision.jpg";
import { Link } from "react-router-dom";

const CompanyBrief = () => {
  return (
    <div className={styles.container}>
      <div className={styles.Rhs}>
        <img src={companyImage} alt="ceo" className={styles.ceoImage} />
      </div>
      <div className={styles.leftHS}>
        <h2>Brief History</h2>
        <p>
          Monique Gardens and Horticultural Arena began with an idea; and Mrs
          Monica Sunnie-Ododo, PhD was and remained determined in the
          translation of the idea. Little wonder Dr Monica Sunnie-Ododo’s wealth
          of experience as an agronomist as well as background in botany,
          aquaponics has played a vital role. Monique Gardens and Horticultural
          Arena is an agricultural outfit that distributes tree crops,
          vegetables, Birds (eg, Broiler, Noiler, Layer, Turkey, Guinea fowl and
          fish. They also produce seedling for small and large scale farmers who
          may want to buy in bulks. Seedlings like oil palm, coconut, cocoa,
          coffea, oranges/citrus, shadoc, guava, mango, date-palm amongst
          others. Monique Gardens as popularly known also provides consulting
          services, training services, excursions and to show our results and
          lead by example we also produce and deliver harvested products.
        </p>
        <Link to="/contact" className="--btn-deepgreen --p">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default CompanyBrief;
