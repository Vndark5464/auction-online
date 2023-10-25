import React, { useState, useEffect } from 'react';
import ProductDataService from '../../services/product.services';
import Header from '../home/Head';
import { getAuth } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import uploadImage from '../../services/uploadImage';
import UserDataService from '../../services/uses.services';

const UploadProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    excerpt: '',
    price: '',
    imageSrc: null,
    imageAlt: ''
  });
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid); // Lưu ID của người dùng đăng nhập
        fetchUserData(user.uid); // Gọi hàm để truy vấn Firestore
      } else {
        setUserId(null); // Reset ID nếu không có người dùng đăng nhập
        setUsername(null); // Reset username
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    const userDocRef = await UserDataService.getUser(uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
        setUsername(userDocSnap.data().username);
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    setProduct({ ...product, imageSrc: file });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!userId) {
        setErrorMessage('User not logged in!');
        return;
    }

    try {
      const imageUrl = await uploadImage(product.imageSrc, userId, 'products');
      const productToSave = {
        ...product,
        imageSrc: imageUrl,
        userId: userId,
        username: username,
        isApproved: false
      };

      // change this line - directly use the ProductDataService
      await ProductDataService.addProduct(productToSave);
      alert("Product successfully uploaded.");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <Header />
      <button className="btn btn-secondary mb-3" onClick={handleGoBack}>Back</button>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="excerpt" className="form-label">Description:</label>
          <input
            type="text"
            className="form-control"
            id="excerpt"
            name="excerpt"
            value={product.excerpt}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageSrc" className="form-label">Image:</label>
          <input
            type="file"
            className="form-control"
            id="imageSrc"
            name="imageSrc"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageAlt" className="form-label">Image Alt Text:</label>
          <input
            type="text"
            className="form-control"
            id="imageAlt"
            name="imageAlt"
            value={product.imageAlt}
            onChange={handleInputChange}
            required
          />
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">
          Upload Product
        </button>
      </form>
    </>
  );
};

export default UploadProduct;