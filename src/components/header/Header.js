/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLinks/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_CART_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import newLogo from "../../assets/new-logo.jpg";

const logo = (
  <div className={styles.logo}>
    <Link to="/" className={styles.logoLink}>
      <img src={newLogo} alt="logo" />
      {/* <h2>
        Monique{""} Gardens
         <span>Gardens</span> 
      </h2> */}
    </Link>
  </div>
);
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");
// const cart = (
//     <span className={styles.cart}>
//       <Link to="/cart">
//         Cart
//         <FaShoppingCart size={20} />
//         <p>1</p>
//       </Link>
//     </span>
// );

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState(""); //loggedin users name
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  //Sets scrollpage & navbar
  const fixedNavbar = () => {
    if (window.scrollY > 50) {
      //if we scroll on the vertical axis and it gets to 50px
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixedNavbar);

  //Monitor currently signedIn User with db
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        const uid = user.uid; //logged in user id from firebase
        console.log(uid);
        //console.log(user.displayName)
        //setdisplayName(user.displayName);

        if (user.displayName == null) {
          //create displayName from user's local login email
          const user1 = user.email.substring(0, user.email.indexOf("@")); //extract texts from the 1st letter to the @ symbol.
          //console.log(user1)
          const uName = user1.charAt(0).toUpperCase() + user1.slice(1); //convert the first letter Uppercase
          //console.log(uName)
          setdisplayName(uName);
        } else {
          setdisplayName(user.displayName);
        }

        //dispatch current user info to redux - authSlice.js
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
            //other parameters we can get from db :
            //photoURL: null,
            //phoneNumber: null,
            //accessToken:
          })
        );
      } else {
        // User is signed out or NO User
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER()); //remove current user from authSlice/redux
      }
    });
  }, [dispatch, displayName]);

  //Signout user db
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  //Display cart quantity on Header
  useEffect(() => {
    dispatch(CALCULATE_CART_TOTAL_QUANTITY());
  }, [dispatch]);

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          >
            {" "}
            {/*the dark nav wrapper on mobile */}
          </div>

          <ul onClick={hideMenu}>
            {/*hides menu when i click on any of the list item on Mobile view */}
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes
                size={22}
                color={"#fff"}
                onClick={hideMenu}
                cursor={"pointer"}
              />
            </li>

            <li>
              <AdminOnlyLink>
                <Link to="/admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                </Link>
              </AdminOnlyLink>
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li style={{ width: "90px" }}>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            {/*hides menu when i click on any of the list item */}
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                {/* Display Users Name */}
                <a
                  href="#home"
                  style={{
                    color: "#4aaf1d",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <FaUserCircle size={16} />
                  Hi,
                  {displayName}
                </a>
              </ShowOnLogin>

              {/* <NavLink to='/register' className={activeLink}>
                    Register
                  </NavLink>
             */}

              <ShowOnLogin>
                <NavLink
                  to="/order-history"
                  className={activeLink}
                  style={{ width: "90px" }}
                >
                  My Orders
                </NavLink>
              </ShowOnLogin>

              <ShowOnLogin>
                <NavLink to="/" onClick={logoutUser}>
                  Logout
                </NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
