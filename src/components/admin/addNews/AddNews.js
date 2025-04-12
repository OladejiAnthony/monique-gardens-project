import { useState } from "react";
import "./AddNews.scss";
import Card from "../../card/Card";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import { useSelector } from "react-redux";
import { selectNews } from "../../../redux/slice/newsSlice";

const initialState = {
  name: "",
  imageURL: "",
  otherImages: "",
  secondImage: "",
  thirdImage: "",
  desc: "",
};

const AddNews = () => {
  //-Edit Product code-
  const { id } = useParams(); //console.log(id)
  const news = useSelector(selectNews); //from redux console.log(news);
  const newEdit = Array.isArray(news)
    ? news.find((item) => item.id === id)
    : undefined;
  //console.log(newsEdit)

  //-Add News Code-
  //const [newss, setNewss] = useState({ ...initialState });
  const [newss, setNewss] = useState(() => {
    const newState = detectForm(id, { ...initialState }, newEdit);
    return newState;
  });
  //console.log(new) //displays the news initial states

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadOtherProgress, setUploadOtherProgress] = useState(0);
  const [uploadSecondProgress, setUploadSecondProgress] = useState(0);
  const [uploadThirdProgress, setUploadThirdProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewss({ ...newss, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; //console.log(file);
    //const storageRef = ref(storage, `eshop/${file.name}`);
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`); //in our firebase storage we created an eshop folder and we store the files by date & name into it
    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //console.log(downloadURL);
          setNewss({
            ...newss,
            imageURL: downloadURL,
          });
          toast.success("Image uploaded succesfully.");
        });
      }
    );
  };

  const handleOtherImageChange = (e) => {
    const file = e.target.files[0]; //console.log(file);
    //const storageRef = ref(storage, `eshop/${file.name}`);
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`); //in our firebase storage we created an eshop folder and we store the files by date & name into it
    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadOtherProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //console.log(downloadURL);
          setNewss({
            ...newss,
            otherImages: downloadURL,
          });
          toast.success("Other Image uploaded succesfully.");
        });
      }
    );
  };
  const handleSecondImageChange = (e) => {
    const file = e.target.files[0]; //console.log(file);
    //const storageRef = ref(storage, `eshop/${file.name}`);
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`); //in our firebase storage we created an eshop folder and we store the files by date & name into it
    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadSecondProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //console.log(downloadURL);
          setNewss({
            ...newss,
            secondImage: downloadURL,
          });
          toast.success("Second Image uploaded succesfully.");
        });
      }
    );
  };
  const handleThirdImageChange = (e) => {
    const file = e.target.files[0]; //console.log(file);
    //const storageRef = ref(storage, `eshop/${file.name}`);
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`); //in our firebase storage we created an eshop folder and we store the files by date & name into it
    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadThirdProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //console.log(downloadURL);
          setNewss({
            ...newss,
            thirdImage: downloadURL,
          });
          toast.success("Third Image uploaded succesfully.");
        });
      }
    );
  };

  const addNews = (e) => {
    e.preventDefault();
    //console.log(new);
    setIsLoading(true);

    try {
      // Add a new document with a generated id.
      const docRef = addDoc(collection(db, "news"), {
        //pass this parameters to db
        name: newss.name,
        imageURL: newss.imageURL,
        otherImages: newss.otherImages, //add more images if needed
        secondImage: newss.secondImage,
        thirdImage: newss.thirdImage,
        desc: newss.desc,
        createdAt: Timestamp.now().toDate(),
      });
      //console.log(docRef);
      setIsLoading(false);
      setUploadProgress(0);
      setUploadOtherProgress(0);
      setUploadSecondProgress(0);
      setUploadThirdProgress(0);
      setNewss({ ...initialState }); //set products field back to empty
      toast.success("News Uploaded successfully.");
      navigate("/admin/all-news");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  //Edit news functionality
  //const { id } = useParams();
  //console.log(id);
  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
    //f1 & f2 can be a function or strings.
  }
  //const news = useSelector(selectNews);
  //console.log(news);
  //const newEdit = news.find((item) => item.id === id)
  //console.log(newEdit);

  const editNews = (e) => {
    e.preventDefault();
    setIsLoading(true);

    //delete existing image
    if (
      newss.imageURL !== newEdit.imageURL &&
      newss.otherImages !== newEdit.otherImages &&
      newss.secondImage !== newEdit.secondImage &&
      newss.thirdImage !== newEdit.thirdImage
    ) {
      const storageRef = ref(
        storage,
        newEdit.imageURL,
        newEdit.otherImages,
        newEdit.secondImage,
        newEdit.thirdImage
      );
      deleteObject(storageRef);
    }

    try {
      // Add a new document in collection "news"
      setDoc(doc(db, "news", id), {
        name: newss.name,
        imageURL: newss.imageURL,
        otherImages: newss.otherImages, //add more images if needed
        secondImage: newss.secondImage,
        thirdImage: newss.thirdImage,
        desc: newss.desc,
        createdAt: newEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });

      setIsLoading(false);
      toast.success("News Edited successfully.");
      navigate("/admin/all-news");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="news">
        <h2>{detectForm(id, "Add News", "Edit News")}</h2>
        <Card cardClass="card">
          <form onSubmit={detectForm(id, addNews, editNews)}>
            <label>News Header:</label>
            <input
              type="text"
              required
              placeholder=""
              name="name"
              value={newss.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>News Main Image:</label>
            <Card cardClass="group">
              {uploadProgress === 0 ? null : (
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="News Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {newss.imageURL === "" ? null : (
                <input
                  type="text"
                  placeholder="Image URL"
                  //required
                  name="imageURL"
                  value={newss.imageURL}
                  disabled
                />
              )}
            </Card>
            <label>Second Image:</label>
            <Card cardClass="group">
              {uploadOtherProgress === 0 ? null : (
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${uploadOtherProgress}%` }}
                  >
                    {uploadOtherProgress < 100
                      ? `uploading ${uploadOtherProgress}`
                      : `Upload Complete ${uploadOtherProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Another Image"
                name="image"
                onChange={(e) => handleOtherImageChange(e)}
              />

              {newss.otherImages === "" ? null : (
                <input
                  type="text"
                  placeholder="Image URL"
                  //required
                  name="otherImages"
                  value={newss.otherImages}
                  disabled
                />
              )}
            </Card>
            <label>Third Image:</label>
            <Card cardClass="group">
              {uploadSecondProgress === 0 ? null : (
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${uploadSecondProgress}%` }}
                  >
                    {uploadSecondProgress < 100
                      ? `uploading ${uploadSecondProgress}`
                      : `Upload Complete ${uploadSecondProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Another Image"
                name="image"
                onChange={(e) => handleSecondImageChange(e)}
              />

              {newss.secondImage === "" ? null : (
                <input
                  type="text"
                  placeholder="Image URL"
                  //required
                  name="secondImage"
                  value={newss.secondImage}
                  disabled
                />
              )}
            </Card>
            <label>Fourth Images:</label>
            <Card cardClass="group">
              {uploadThirdProgress === 0 ? null : (
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${uploadThirdProgress}%` }}
                  >
                    {uploadThirdProgress < 100
                      ? `uploading ${uploadThirdProgress}`
                      : `Upload Complete ${uploadThirdProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Another Image"
                name="image"
                onChange={(e) => handleThirdImageChange(e)}
              />

              {newss.thirdImage === "" ? null : (
                <input
                  type="text"
                  placeholder="Image URL"
                  //required
                  name="thirdImage"
                  value={newss.thirdImage}
                  disabled
                />
              )}
            </Card>

            <label>News description:</label>
            <textarea
              name="desc"
              value={newss.desc}
              required
              onChange={(e) => handleInputChange(e)}
            ></textarea>

            <button className="--btn  --btn-primary">
              {detectForm(id, "Save News", "Edit News")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddNews;

//Note - Input Tag accept attribute:
//accept='file_extension | image/*'
