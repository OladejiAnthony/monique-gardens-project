import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Pages
import {
  Home,
  Contact,
  About,
  Login,
  Register,
  Reset,
  Admin,
  News,
} from "./pages/index";
//Components
import {
  Footer,
  Header,
  NewsDetails,
  ProductDetails,
} from "./components/index";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";

import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import OrderHistory from "./pages/ordersHistory/OrderHistory";
import NotFound from "./pages/notFound/NotFound";
import Gallery from "./pages/gellery/Gallery";
import GalleryDetails from "./components/gallery/GalleryDetails";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="gallery-details/:id" element={<GalleryDetails />} />
          <Route path="news" element={<News />} />
          <Route path="news-details/:id" element={<NewsDetails />} />

          {/*Admin Route */}
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          {/*Product Details Route */}
          <Route path="/product-details/:id" element={<ProductDetails />} />
          {/*Cart */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />

          {/*Orders */}
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/review-product/:id" element={<ReviewProducts />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;

//Normal Routing techniques:
//import Home from './pages/home/Home'
//import Contact from './pages/contact/Contact'
