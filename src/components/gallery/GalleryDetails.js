// src/components/news/NewsDetails.js
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./GalleryDetails.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch } from "react-redux";
import { STORE_GALLERY } from "../../redux/slice/gallerySlice";

const GalleryDetails = () => {
  const { id } = useParams();
  console.log({ id });
  const { data, isLoading } = useFetchCollection("gallery"); //reading products data from db
  const dispatch = useDispatch();
  console.log({ data });

  //store the products data coming from db to redux
  useEffect(() => {
    dispatch(
      STORE_GALLERY({
        newss: data,
      })
    );
  }, [dispatch, data]);
  const newsItem = data.find((news) => news.id.toString() === id);

  console.log({ newsItem });

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
    <div className="gallery__details">
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
      <div className="other__images">
        <img
          className="other-image"
          src={newsItem.otherImages}
          alt="otherPics"
        />
        <img
          className="other-image"
          src={newsItem.thirdImages}
          alt="thirdPics"
        />
        <img
          className="other-image"
          src={newsItem.fourthImages}
          alt="fourthPics"
        />
      </div>

      <div className="heading">
        <div className="header__box">
          <div className="upper_line"></div>
          <h2>Gallery Content</h2>
          <div className="lower_line"></div>
        </div>
      </div>
      <div className="news__card">
        {data.slice(0, 4).map((news) => (
          <Link
            to={`/gallery-details/${news.id}`}
            className="news"
            key={news.id}
          >
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
