import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore/lite";
import { db } from "../firebase.config";

/*################## Meal #####################*/
// Set New Meal
export const saveMeal = async (meal) => {
  await setDoc(doc(db, "foodItems", `${Date.now()}`), meal, {
    merge: true,
  });
};

// Get All Meals
export const getAllMeals = async () => {
  const meals = await getDocs(
    query(collection(db, "foodItems"), orderBy("id", "desc"))
  );
  return meals.docs.map((doc) => doc.data());
};

/*################## Orders #####################*/
// Set New Order
export const saveOrder = async (order) => {
  await setDoc(doc(db, "orders", `${Date.now()}`), order, {
    merge: true,
  });
};

// Get All Orders
export const getAllOrders = async () => {
  const orders = await getDocs(
    query(collection(db, "orders"), orderBy("id", "desc"))
  );
  return orders.docs.map((doc) => doc.data());
};
