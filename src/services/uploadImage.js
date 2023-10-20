import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const uploadImage = async (file, userId, folder) => {
    const storage = getStorage();
    const storageRef = ref(storage, `${folder}/${userId}/${file.name}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }
  
  export default uploadImage;