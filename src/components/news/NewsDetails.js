// src/components/news/NewsDetails.js
import React from "react";
import { Link, useParams } from "react-router-dom";
import newsData from "./newsData";
import "./NewsDetails.scss";

const NewsDetails = () => {
  const { id } = useParams();
  console.log({ id });
  const newsItem = newsData.find((news) => news.id === parseInt(id));
  console.log({ newsItem });
  console.log({ newsData });

  if (!newsItem) {
    return <div>News not found</div>;
  }

  return (
    <div className="news__details">
      <div className="technician-training-card">
        <img
          src={newsItem.image}
          alt={newsItem.title}
          className="training-image"
        />
        <div className="training-content">
          <h2>{newsItem.title}</h2>
          <p className="training-date">{newsItem.date}</p>
          <p>{newsItem.fullDescription}</p>
        </div>
      </div>

      <div className="heading">
        <div className="header__box">
          <div className="upper_line"></div>
          <h2>Latest News and Events</h2>
          <div className="lower_line"></div>
        </div>
      </div>
      <div className="news__card">
        {newsData.map((news) => (
          <Link to={`/news-details/${news.id}`} className="news" key={news.id}>
            <img src={news.image} alt={news.title} />
            <h3>{news.title}</h3>
            <p>{news.description}</p>
            <span>{news.date}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsDetails;
