import { useState } from "react";
import "./AddGallery.scss";
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
import { selectGallery } from "../../../redux/slice/gallerySlice";

const initialState = {
  name: "",
  imageURL: "",
  otherImages: "",
  thirdImages: "",
  fourthImages: "",
  desc: "",
};

const AddGallery = () => {
  //-Edit Product code-
  const { id } = useParams(); //console.log(id)
  const news = useSelector(selectGallery); //from redux console.log(news);
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
  const [uploadThirdProgress, setUploadThirdProgress] = useState(0);
  const [uploadFourthProgress, setUploadFourthProgress] = useState(0);
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
          toast.success("Image uploaded succesfully.");
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
            thirdImages: downloadURL,
          });
          toast.success("Image uploaded succesfully.");
        });
      }
    );
  };

  const handleFourthImageChange = (e) => {
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
        setUploadFourthProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //console.log(downloadURL);
          setNewss({
            ...newss,
            fourthImages: downloadURL,
          });
          toast.success("Image uploaded succesfully.");
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
      const docRef = addDoc(collection(db, "gallery"), {
        //pass this parameters to db
        name: newss.name,
        imageURL: newss.imageURL,
        otherImages: newss.otherImages, //add more images if needed
        thirdImages: newss.thirdImages,
        fourthImages: newss.fourthImages,
        desc: newss.desc,
        createdAt: Timestamp.now().toDate(),
      });
      console.log(docRef);
      setIsLoading(false);
      setUploadProgress(0);
      setUploadOtherProgress(0);
      setUploadThirdProgress(0);
      setUploadFourthProgress(0);
      setNewss({ ...initialState }); //set products field back to empty
      toast.success("Content Uploaded successfully.");
      navigate("/admin/all-gallery");
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
      newss.thirdImages !== newEdit.thirdImages &&
      newss.fourthImages !== newEdit.fourthImages
    ) {
      const storageRef = ref(
        storage,
        newEdit.imageURL,
        newEdit.otherImages,
        newEdit.thirdImages,
        newEdit.fourthImages
      );
      deleteObject(storageRef);
    }

    try {
      // Add a new document in collection "news"
      setDoc(doc(db, "gallery", id), {
        name: newss.name,
        imageURL: newss.imageURL,
        otherImages: newss.otherImages, //add more images if needed
        thirdImages: newss.thirdImages,
        fourthImages: newss.fourthImages,
        desc: newss.desc,
        createdAt: newEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });

      setIsLoading(false);
      toast.success("Content Edited successfully.");
      navigate("/admin/all-gallery");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="gallery">
        <h2>{detectForm(id, "Add Gallery", "Edit Gallery")}</h2>
        <Card cardClass="card">
          <form onSubmit={detectForm(id, addNews, editNews)}>
            <label> Header:</label>
            <input
              type="text"
              required
              placeholder=""
              name="name"
              value={newss.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Main Image:</label>
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
                placeholder="3rd Image"
                name="image"
                onChange={(e) => handleThirdImageChange(e)}
              />

              {newss.thirdImages === "" ? null : (
                <input
                  type="text"
                  placeholder="Image URL"
                  //required
                  name="thirdImages"
                  value={newss.thirdImages}
                  disabled
                />
              )}
            </Card>

            <label>Fourth Image:</label>
            <Card cardClass="group">
              {uploadFourthProgress === 0 ? null : (
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${uploadFourthProgress}%` }}
                  >
                    {uploadFourthProgress < 100
                      ? `uploading ${uploadFourthProgress}`
                      : `Upload Complete ${uploadFourthProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="4th Image"
                name="image"
                onChange={(e) => handleFourthImageChange(e)}
              />

              {newss.fourthImages === "" ? null : (
                <input
                  type="text"
                  placeholder="Image URL"
                  //required
                  name="fourthImages"
                  value={newss.fourthImages}
                  disabled
                />
              )}
            </Card>

            <label>Description:</label>
            <textarea
              name="desc"
              value={newss.desc}
              required
              onChange={(e) => handleInputChange(e)}
            ></textarea>

            <button className="--btn  --btn-primary">
              {detectForm(id, "Save Gallery", "Edit Gallery")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddGallery;

//Note - Input Tag accept attribute:
//accept='file_extension | image/*'
