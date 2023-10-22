import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc,setDoc } from 'firebase/firestore';
import Header from '../components/home/Head';
import "../assets/css/style.css";
import { getAuth } from 'firebase/auth';
import uploadImage from '../services/uploadImage';

const UserProfile = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  
    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);
  

  useEffect(() => {
    
    const fetchUserData = async () => {
      if (currentUser) {
        const db = getFirestore();
        const userDoc = doc(db, 'Users', currentUser.uid);
        console.log("Fetching data for user:", currentUser.uid); 
        const userSnapshot = await getDoc(userDoc);
        console.log("Fetched data:", userSnapshot.exists())
        if (userSnapshot.exists()) {
          console.log("Data from Firestore:", userSnapshot.data());
          setUserDetails(userSnapshot.data());
        }
      }
    };
  
    fetchUserData();
  }, [currentUser]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const imageSrc = e.target.result;
      setUploadedImage(imageSrc);
    }
  
    if (file) {
      reader.readAsDataURL(file);
      if (currentUser) {
        const imageUrl = await uploadImage(file, currentUser.uid, 'profile_images');
        const db = getFirestore();
        const userDocRef = doc(db, 'Users', currentUser.uid);
        await setDoc(userDocRef, { profileImageURL: imageUrl }, { merge: true });
        setUserDetails(prevDetails => ({
          ...prevDetails,
          profileImageURL: imageUrl
        }));
      }
    }
  }

  const handleUpdateUserData = async () => {
    if (!currentUser) return;
  
    const updatedData = {
      username: document.getElementById('inputUsername').value,
      firstName: document.getElementById('inputFirstName').value,
      lastName: document.getElementById('inputLastName').value,
      address: document.getElementById('inputOrgName').value,
      dob: document.getElementById('inputBirthday').value,
    };
  
    const db = getFirestore();
    const userDocRef = doc(db, 'Users', currentUser.uid);
    await setDoc(userDocRef, updatedData, { merge: true });
  
    // Cập nhật trạng thái userDetails
    setUserDetails(prevDetails => ({
      ...prevDetails,
      ...updatedData
    }));

    alert('Thông tin của bạn đã được cập nhật thành công!');
    window.location.reload();
  };
  
  return (
    <>
      <Header />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <div className="container-xl px-4 mt-4">
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src={userDetails?.profileImageURL }
                  alt=""
                />
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Username (how your name will appear to other users on the site)
                  </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your username"
                    defaultValue={userDetails ? userDetails.username : ''}
                  />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        First name
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                        defaultValue={userDetails ? userDetails.firstName : ''}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Last name
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                        defaultValue={userDetails ? userDetails.lastName : ''}
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputOrgName">
                        Location 1
                      </label>
                      <input
                        className="form-control"
                        id="inputOrgName"
                        type="text"
                        placeholder="Enter your organization name"
                        defaultValue={userDetails ? userDetails.address : ''}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    id="inputEmailAddress"
                    type="email"
                    placeholder="Enter your email address"
                    defaultValue={currentUser ? currentUser.email : ''}
                    readOnly
                  />
                </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputPhone">
                        Phone number
                      </label>
                      <input
                        className="form-control"
                        id="inputPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        defaultValue="Phone Number"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputBirthday">
                        Birthday
                      </label>
                      <input
                        className="form-control"
                        id="inputBirthday"
                        type="text"
                        name="birthday"
                        placeholder="Enter your birthday"
                        defaultValue={userDetails ? userDetails.dob : ''}
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary" type="button" onClick={handleUpdateUserData}>
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
