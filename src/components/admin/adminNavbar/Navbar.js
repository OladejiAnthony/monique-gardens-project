import React from "react";
import styles from "./Navbar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/slice/authSlice";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const userName = useSelector(selectUserName);
  console.log(userName);
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              View Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-news" className={activeLink}>
              View News
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-news/ADD" className={activeLink}>
              Add News
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-gallery" className={activeLink}>
              View Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-gallery/ADD" className={activeLink}>
              Add Gallery
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
