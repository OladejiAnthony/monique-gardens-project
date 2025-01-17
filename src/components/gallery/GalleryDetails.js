// src/components/news/NewsDetails.js
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import newsData from "./newsData";
import "./GalleryDetails.scss";
import { STORE_NEWS } from "../../redux/slice/newsSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch } from "react-redux";

const GalleryDetails = () => {
  const { id } = useParams();
  console.log({ id });
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
  const newsItem = data.find((news) => news.id.toString() === id);

  console.log({ newsItem });
  console.log({ newsData });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!newsItem) {
    return <div>News not found</div>;
  }

  const formatDateToText = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    const options = { year: "numeric", month: "long", day: "numeric" }; // Customize format
    return new Intl.DateTimeFormat("en-US", options).format(date); // Outputs "January 13, 2025"
  };
  return (
    <div className="news__details">
      <div className="technician-training-card">
        <img
          src={newsItem.imageURL}
          alt={newsItem.name}
          className="training-image"
        />
        <div className="training-content">
          <h2>{newsItem.name}</h2>
          <p className="training-date">
            {formatDateToText(newsItem.createdAt)}
          </p>
          <p>{newsItem.desc}</p>
        </div>
      </div>
      <div>
        <img src={newsItem.otherImages} alt="otherPics" />
      </div>

      <div className="heading">
        <div className="header__box">
          <div className="upper_line"></div>
          <h2>News and Events</h2>
          <div className="lower_line"></div>
        </div>
      </div>
      <div className="news__card">
        {data.map((news) => (
          <Link to={`/news-details/${news.id}`} className="news" key={news.id}>
            <img src={news.imageURL} alt={news.name} />
            <h3>{news.name}</h3>
            <p>{news.desc}</p>
            <span>{formatDateToText(news.createdAt)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GalleryDetails;
