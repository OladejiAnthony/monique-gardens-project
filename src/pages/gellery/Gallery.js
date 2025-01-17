//News.js
import React, { useEffect } from "react";
import "./Gallery.scss";
import HeaderImage from "../../components/about/HeaderImage";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { STORE_NEWS } from "../../redux/slice/newsSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";
import spinnerImg from "../../assets/spinner.jpg";

const Gallery = () => {
  const { data, isLoading } = useFetchCollection("news"); //reading products data from db
  const dispatch = useDispatch();
  console.log({ data });

  //store the products data coming from db to redux
  useEffect(() => {
    dispatch(
      STORE_NEWS({
        newss: data,
      })
    );
  }, [dispatch, data]);

  //function to shorten texts
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const formatDateToText = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    const options = { year: "numeric", month: "long", day: "numeric" }; // Customize format
    return new Intl.DateTimeFormat("en-US", options).format(date); // Outputs "January 13, 2025"
  };
  return (
    <>
      <HeaderImage />
      <div className="news__section">
        <div className="heading">
          <div className="header__box">
            <div className="upper_line"></div>
            <h2>Videos Clips</h2>
            <div className="lower_line"></div>
          </div>
        </div>
        {/*First Section: 4 cards only */}
        <div className="news__card">
          {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading.."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <>
              {data.slice(0, 4).map((n) => (
                <Link to={`/gallery/${n.id}`} className="news" key={n.id}>
                  <img src={n.imageURL} alt={n.name} />
                  <h3>{n.name}</h3>
                  <p>{shortenText(n.desc, 200)}</p>
                  <span>{formatDateToText(n.createdAt)}</span>
                </Link>
              ))}
            </>
          )}
        </div>

        <div className="heading">
          <div className="header__box">
            <div className="upper_line"></div>
            <h2>Image Gallery</h2>
            <div className="lower_line"></div>
          </div>
        </div>
        {/*Second Section: unlimited cards */}
        <div className="news__card">
          {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading.."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <>
              {data.map((n) => (
                <Link to={`/gallery/${n.id}`} className="news" key={n.id}>
                  <img src={n.imageURL} alt={n.name} />
                  <h3>{n.name}</h3>
                  <p>{shortenText(n.desc, 200)}</p>
                  <span>{formatDateToText(n.createdAt)}</span>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;
