/* eslint-disable import/no-anonymous-default-export */
import { getDatabase, ref, child, get, update } from "firebase/database";
import { TenantProfileInfo } from "../../interfaces/TenantProfileInfo";

async function getTenantProfile(userId: string) {
  const dbRef = ref(getDatabase());
  return await get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().tenantProfile;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

async function updateTenantProfile(userId: string, userProfileData: TenantProfileInfo) {
  const db = getDatabase();
  return await update(ref(db, `users/${userId}`), { tenantProfile: userProfileData });
}

async function updateUserProfile(userId: string, userProfileData: any) {
  const db = getDatabase();
  return await update(ref(db, `users/${userId}`), userProfileData);
}

export default {
  getTenantProfile,
  updateTenantProfile,
  updateUserProfile,
};
