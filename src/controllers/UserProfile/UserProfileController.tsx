/* eslint-disable import/no-anonymous-default-export */

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import TenantProfileController from "../TenantProfile/TenantProfileController";

async function updateTenantPicture(userId: string, image: any) {
  const storage = getStorage();
  const storageRef = ref(storage, `images/users/${userId}.jpg`);
  const uploadTask = uploadBytesResumable(storageRef, image);
  await uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    async () => {
    return await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log(downloadURL)
        return await TenantProfileController.updateUserProfile(userId, { userImage: downloadURL });
      });
    }
  );
}

export default {
  updateTenantPicture,
};
