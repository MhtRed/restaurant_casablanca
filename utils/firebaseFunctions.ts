import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { fireStore } from "../firebase.config";

// Set New Meal
export const saveMeal = async (meal) => {
  await setDoc(doc(fireStore, "foodItems", `${Date.now()}`), meal, {
    merge: true,
  });
};

// Get All Meals
export const getAllMeals = async () => {
  const meals = await getDocs(
    query(collection(fireStore, "foodItems"), orderBy("id", "desc"))
  );
  return meals.docs.map((doc) => doc.data());
};
