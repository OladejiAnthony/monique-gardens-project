import React from "react";
import styles from "./Admin.module.scss";
import Navbar from "../../components/admin/adminNavbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../../components/admin/home/Home";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import ViewProduct from "../../components/admin/viewProduct/ViewProduct";
import Orders from "../../components/admin/orders/Orders";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";
import AddNews from "../../components/admin/addNews/AddNews";
import ViewNews from "../../components/admin/viewNews/ViewNews";
import AddGallery from "../../components/admin/addGallery/AddGallery";
import ViewGallery from "../../components/admin/viewGallery/ViewGallery";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        {/*Admin Nested Routes */}
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="all-products" element={<ViewProduct />} />
          <Route path="add-gallery/:id" element={<AddGallery />} />
          <Route path="all-gallery" element={<ViewGallery />} />
          <Route path="add-news/:id" element={<AddNews />} />
          <Route path="all-news" element={<ViewNews />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
