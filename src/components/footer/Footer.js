import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import newLogo from "../../assets/logo_top3.png";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.about}>
          <Link to="/">
            <img src={newLogo} alt="logo" className={styles.logo} />
          </Link>

          <p>
            Monique Gardens is an agricultural outfit that is into production &
            distribution of seedlings, tree planting, nursery, training &
            excursions.
          </p>
          <div className={styles.socialLinks}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className={styles.quickLinks}>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/about"> About Us </Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/news">News Update</Link>
            </li>
            <li>
              <Link to="/order-history">Order History</Link>
            </li>
          </ul>
        </div>
        <div className={styles.tagCloud}>
          <h4>Tag Cloud</h4>
          <div className={styles.tags}>
            <span>Agripreneurship</span>
            <span>Career Talk</span>
            <span>MoU & Tour</span>
            <span>Polyclonal Cashew</span>
            <span>Request Produce</span>
            <span>Training</span>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>
          &copy; {year} Monique Gardens & Horticultural Arena. Designed and
          Developed by ICT guru.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
