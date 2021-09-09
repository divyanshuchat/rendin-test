/* eslint-disable import/no-anonymous-default-export */
import appartments from "../../mock/apartments.json";
import { getDatabase, ref, set } from "firebase/database";

function getAllAppartments(){
  return appartments;
}

async function addFavApartment(userInfo: { userId: any; }, apartmentData: any) {
  const db = getDatabase();
  return await set(ref(db, `users/${userInfo.userId}/favAppartments/${apartmentData.id}`), apartmentData);
}

async function addApplyApartment(userInfo: { userId: any; }, apartmentData: any) {
  const db = getDatabase();
  return await set(ref(db, `users/${userInfo.userId}/appliedAppartments/${apartmentData.id}`), apartmentData);
}

export default {
  getAllAppartments,
  addFavApartment,
  addApplyApartment
};
