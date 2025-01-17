import { useEffect, useState } from "react";
import styles from "./ViewNews.module.scss";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { STORE_NEWS, selectNews } from "../../../redux/slice/newsSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import {
  FILTER_BY_NEWS_SEARCH,
  selectFilteredNews,
} from "../../../redux/slice/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";

const ViewNews = () => {
  const { data, isLoading } = useFetchCollection("news"); //Reading products data from db
  //console.log(data);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  //store the products data coming from db to redux
  useEffect(() => {
    dispatch(
      STORE_NEWS({
        news: data,
      })
    );
  }, [dispatch, data]); //dispatch products when data changes

  //read products data from redux
  const news = useSelector(selectNews);
  const filteredNews = useSelector(selectFilteredNews); //read the same products data from redux and display on the screen. Remember the filteredProducts contain temporary products
  console.log(filteredNews);
  //Note - we are reading all our products data displayed on this page from the redux filteredProducts state.

  //delete Dialog Box
  const confirmDelete = (id, imageURL, otherImages) => {
    //modal open
    Notiflix.Confirm.show(
      "Delete News!!!",
      "You are about to delete this news",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL, otherImages);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
        // etc...
      }
    );
  };

  const deleteProduct = async (id, imageURL, otherImages) => {
    try {
      //Delete documents from db
      await deleteDoc(doc(db, "news", id));
      //Delete files from Cloud Storage
      const storageRef = ref(storage, imageURL, otherImages);
      await deleteObject(storageRef);

      toast.success("News deleted successfully.");
    } catch (error) {
      toast.error(error.messsage);
    }
  };

  //Search Filter logic
  useEffect(() => {
    //console.log(search);
    dispatch(
      FILTER_BY_NEWS_SEARCH({
        news,
        search,
      })
    );
  }, [search, news, dispatch]);

  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  //Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredNews.slice(
    //performs slice operation on the filtered product
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All News</h2>
        {/*Search Input */}
        <div className={styles.search}>
          <p>
            <b>{filteredNews.length}</b> news found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/*Note - before implementing the search filter function, we were filtering originally through the "products" state from redux */}

        {filteredNews.length === 0 ? (
          <p>No News found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>image</th>
                <th>Name</th>
                <th>Other Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, imageURL, otherImages } = product; //filteredNews properties
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>
                      <img
                        src={otherImages}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-news/${id}`}>
                        <FaEdit size={20} fgcolor="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {/*Pagination */}
        <Pagination
          productsPerPage={productsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredNews.length}
        />
      </div>
    </>
  );
};

export default ViewNews;
