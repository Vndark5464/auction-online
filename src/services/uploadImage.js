import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const uploadImage = async (file, userId, folderName) => {
  const storage = getStorage();
  const storageRef = ref(storage, `${folderName}/${userId}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {

      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export default uploadImage;
