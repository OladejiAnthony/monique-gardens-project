import React, { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import Product from "../../components/product/Product";
import VisionMission from "../../components/home/VisionMission";
import Mission from "../../components/home/Mission";

const Home = () => {
  const url = window.location.href;
  //alert(url);

  //scroll to product section based on what we have in the url
  const scrollToProducts = () => {
    if (url.includes("#products")) {
      //products id is inside ProductList and Slider component
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });
      return;
    }
  };
  //useEffect fires the function on every rerender
  useEffect(() => {
    scrollToProducts();
  }, []);

  return (
    <div>
      <Slider />
      <VisionMission />
      <Mission />
      <Product />
    </div>
  );
};

export default Home;
