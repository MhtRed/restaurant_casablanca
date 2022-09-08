import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { fireStore } from "../firebase.config";

/*################## Meal #####################*/
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

/*################## Orders #####################*/
// Set New Order
export const saveOrder = async (order) => {
  await setDoc(doc(fireStore, "orders", `${Date.now()}`), order, {
    merge: true,
  });
};

// Get All Orders
export const getAllOrders = async () => {
  const orders = await getDocs(
    query(collection(fireStore, "orders"), orderBy("id", "desc"))
  );
  return orders.docs.map((doc) => doc.data());
};
