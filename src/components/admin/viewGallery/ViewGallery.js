import { useEffect, useState } from "react";
import styles from "./ViewGallery.module.scss";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import {
  FILTER_BY_GALLERY_SEARCH,
  selectFilteredGallery,
} from "../../../redux/slice/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";
import {
  selectGallery,
  STORE_GALLERY,
} from "../../../redux/slice/gallerySlice";

const ViewGallery = () => {
  const { data, isLoading } = useFetchCollection("gallery"); //Reading products data from db
  //console.log(data);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  //store the products data coming from db to redux
  useEffect(() => {
    dispatch(
      STORE_GALLERY({
        gallery: data,
      })
    );
  }, [dispatch, data]); //dispatch products when data changes

  //read products data from redux
  const gallery = useSelector(selectGallery);
  const filteredNews = useSelector(selectFilteredGallery); //read the same products data from redux and display on the screen. Remember the filteredProducts contain temporary products
  console.log(selectFilteredGallery);
  //Note - we are reading all our products data displayed on this page from the redux filteredProducts state.

  //delete Dialog Box
  const confirmDelete = (
    id,
    imageURL,
    otherImages,
    thirdImages,
    fourthImages
  ) => {
    //modal open
    Notiflix.Confirm.show(
      "Delete News!!!",
      "You are about to delete this news",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL, otherImages, thirdImages, fourthImages);
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

  const deleteProduct = async (
    id,
    imageURL,
    otherImages,
    thirdImages,
    fourthImages
  ) => {
    try {
      //Delete documents from db
      await deleteDoc(doc(db, "gallery", id));
      //Delete files from Cloud Storage
      const storageRef = ref(
        storage,
        imageURL,
        otherImages,
        thirdImages,
        fourthImages
      );
      await deleteObject(storageRef);

      toast.success("Gallery deleted successfully.");
    } catch (error) {
      toast.error(error.messsage);
    }
  };

  //Search Filter logic
  useEffect(() => {
    //console.log(search);
    dispatch(
      FILTER_BY_GALLERY_SEARCH({
        gallery,
        search,
      })
    );
  }, [search, gallery, dispatch]);

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
        <h2>Gallery Collection</h2>
        {/*Search Input */}
        <div className={styles.search}>
          <p>
            <b>{filteredNews.length}</b> Gallery found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/*Note - before implementing the search filter function, we were filtering originally through the "products" state from redux */}

        {filteredNews.length === 0 ? (
          <p>No Gallery found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Main Image</th>
                <th>Name</th>
                <th>Second Image</th>
                <th>Third Image</th>
                <th>Fourth Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const {
                  id,
                  name,
                  imageURL,
                  otherImages,
                  thirdImages,
                  fourthImages,
                } = product; //filteredNews properties
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
                    <td>
                      <img
                        src={thirdImages}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <img
                        src={fourthImages}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-gallery/${id}`}>
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

export default ViewGallery;
