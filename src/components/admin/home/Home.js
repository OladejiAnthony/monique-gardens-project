import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import InfoBox from "../../infoBox/InfoBox";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  selectOrderHistory,
  selectTotalOrderAmount,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Chart from "../../chart/Chart";

//Icons
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;

const Home = () => {
  //read data from redux
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);
  //const formattedTotalOrderAmount = Number(totalOrderAmount.toFixed(0)); //round up the number
  //console.log(formattedTotalOrderAmount);
  // Check if totalOrderAmount is not null before using it
  const formattedTotalOrderAmount =
    totalOrderAmount !== null ? Number(totalOrderAmount.toFixed(0)) : null;
  console.log(formattedTotalOrderAmount);

  //read data from firebase db
  const fbProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );
    dispatch(STORE_ORDERS(data));
    dispatch(CALC_TOTAL_ORDER_AMOUNT());
  }, [dispatch, data, fbProducts]);

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`$${formattedTotalOrderAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={products.length} //total no of products
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={orders.length} //total no of orders
          icon={ordersIcon}
        />
      </div>
      {/*Bar Chart */}
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Home;
