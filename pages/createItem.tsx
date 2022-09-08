import React, { useState } from "react";
import { motion } from "framer-motion";
import { categories } from "../data/data";
import Loader from "../components/Loader";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllMeals, saveMeal } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

function CreateContainer() {
  // useStateValue Provider
  const [, dispatch] = useStateValue();
  // The different states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  // The uploadImage function
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //This progress value is not used
        const uploadProgress =
          (100 * snapshot.bytesTransferred) / snapshot.totalBytes;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading... Try Again!");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setAlertStatus("success");
          setMsg("Image uploaded successfully");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };
  // The deleteImage function
  const deleteImage = () => {
    setIsLoading(true);
    const deletRef = ref(storage, imageAsset);
    deleteObject(deletRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setAlertStatus("success");
      setMsg("Image deleted successfully... Please upload an other one!");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  // The saveDetails function
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !category || !price || !imageAsset) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const meal = {
          id: `${Date.now()}`,
          title: title,
          price: price,
          qty: 1,
          category: category,
          calories: calories,
          imageURL: imageAsset,
        };
        saveMeal(meal);
        setIsLoading(false);
        setFields(true);
        setAlertStatus("success");
        clearData();
        fetchData();
        setMsg("Meal uploaded successfully!");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading... Try Again!");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };
  // The clear Data function
  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("");
  };
  // the fetch Data function
  const fetchData = async () => {
    await getAllMeals().then((data) =>
      dispatch({
        type: actionType.SET_MEALS,
        meals: data,
      })
    );
  };
  //Returning the JSX
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {/*The Msg field section */}
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        {/*The Title input */}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            placeholder="Type the title..."
            className="w-full h-full outline-none border-none placeholder:text-gray-400 text-textColor text-lg bg-transparent"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/*The Select Category input */}
        <div className="w-full">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="categories"
            id="category-select"
            className="w-full outline-none text-textColor text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="">Please choose a category...</option>
            {categories &&
              categories.map((cat) => (
                <option
                  key={cat.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={cat.urlParamName}
                >
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
        {/*The Upload Image div */}
        <div className="group flex items-center justify-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500  hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className=" absolute bottom-3 right-3 px-6 py-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-lg duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {/*The Calories & Price div */}
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="number"
              required
              placeholder="Set the amount of calories..."
              className="w-full h-full outline-none border-none placeholder:text-gray-400 text-textColor text-lg bg-transparent"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="number"
              required
              placeholder="Set the price..."
              className="w-full h-full outline-none border-none placeholder:text-gray-400 text-textColor text-lg bg-transparent"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        {/*The Button div */}
        <div className="w-full flex items-center">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateContainer;
