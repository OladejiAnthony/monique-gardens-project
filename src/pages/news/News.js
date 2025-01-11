import React from "react";
import "./News.scss";
import HeaderImage from "../../components/about/HeaderImage";
import newsData, { latestData } from "../../components/news/newsData";
import { Link } from "react-router-dom";

const News = () => {
  console.log({ newsData });
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };
  return (
    <>
      <HeaderImage />
      <div className="news__section">
        <div className="heading">
          <div className="header__box">
            <div className="upper_line"></div>
            <h2>Latest News and Events</h2>
            <div className="lower_line"></div>
          </div>
        </div>
        <div className="news__card">
          {latestData.map((news) => (
            <Link
              to={`/news-details/${news.id}`}
              className="news"
              key={news.id}
            >
              <img src={news.image} alt={news.title} />
              <h3>{news.title}</h3>
              <p>{truncateDescription(news.fullDescription, 100)}</p>
              <span>{news.date}</span>
            </Link>
          ))}
        </div>

        <div className="heading">
          <div className="header__box">
            <div className="upper_line"></div>
            <h2>News and Events</h2>
            <div className="lower_line"></div>
          </div>
        </div>
        <div className="news__card">
          {newsData.map((news) => (
            <Link
              to={`/news-details/${news.id}`}
              className="news"
              key={news.id}
            >
              <img src={news.image} alt={news.title} />
              <h3>{news.title}</h3>
              <p>{truncateDescription(news.fullDescription, 100)}</p>
              <span>{news.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default News;
