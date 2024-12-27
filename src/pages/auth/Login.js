import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const previousURL = useSelector(selectPreviousURL); //cartSlice

  const navigate = useNavigate();

  //Login with Email & Password
  const loginUser = (e) => {
    e.preventDefault();
    //console.log(email, password)
    setIsLoading(true);

    //Login Already Registred Users
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Login Successful");
        //navigate("/")
        redirectUser(); //login, cart & checkout function
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  //Login with Google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Login Successful");
        //navigate("/") - go back to home
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  //cart & checkout functionalities
  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
      //from cart page to login back to cart page
    }
    navigate("/"); //else go to home page
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                autoComplete="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="--btn --btn-deepgreen --btn-block"
              >
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            {/*Google Sign In*/}
            <button className={styles.loginBtn} onClick={signInWithGoogle}>
              <FaGoogle color="#fff" />
              Login With Google
            </button>
            <span className={styles.register}>
              <p>
                Don't have an account?
                <Link
                  to="/register"
                  style={{
                    fontWeight: "bold",
                    marginLeft: "1rem",
                    color: "#66af46",
                  }}
                >
                  Register
                </Link>
              </p>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
