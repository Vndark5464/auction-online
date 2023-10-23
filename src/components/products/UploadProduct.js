import React, { useState, useEffect } from 'react';
import ProductDataService from '../../services/product.services';
import Header from '../home/Head';
import { getAuth } from 'firebase/auth';
import uploadImage from '../../services/uploadImage';

const UploadProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    excerpt: '',
    price: '',
    imageSrc: null,
    imageAlt: '',
    endTime: ''
  });
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [sellerName, setSellerName] = useState(""); // Tên người đăng sản phẩm


  const isAuctionTimeValid = () => {
    const now = new Date();
    const selectedEndTime = new Date(product.endTime);
    const minEndTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); // Thời gian hiện tại + 2 giờ

    // Kiểm tra thời gian đã chọn phải sau thời gian hiện tại và ít nhất cách 2 tiếng
    if (selectedEndTime <= now || selectedEndTime < minEndTime) {
        setErrorMessage('Thời gian đấu giá không hợp lệ. Thời gian phải sau thời gian hiện tại và ít nhất cách 2 tiếng.');
        return false;
    }

    return true;
};
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid); // Lưu ID của người dùng đăng nhập
        setSellerName(user.displayName); // Lưu tên người đăng sản phẩm
      } else {
        setUserId(null); // Reset ID nếu không có người dùng đăng nhập
        setSellerName(""); // Reset tên người đăng
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

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
    if (!isAuctionTimeValid()) {
        return;
    }

    try {
      const imageUrl = await uploadImage(product.imageSrc, userId, 'products');
      const productToSave = {
        ...product,
        imageSrc: imageUrl,
        sellerName:sellerName
      };

      const productDataService = new ProductDataService();
      await productDataService.addProduct(productToSave);
      alert("Product successfully uploaded.");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleGoBack = () => {
    // Điều hướng người dùng đến trang trước đó
    window.history.back();
  };

  return (
    <>
      <Header />
      <button onClick={handleGoBack}>Back</button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Name</label>
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
        <div className="form-group">
          <label htmlFor="excerpt">Description:</label>
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
        <div className="form-group">
          <label htmlFor="price">Price:</label>
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
        <div className="form-group">
          <label htmlFor="imageSrc">Image:</label>
          <input
            type="file"
            className="form-control-file"
            id="imageSrc"
            name="imageSrc"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageAlt">Image Alt Text:</label>
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
        <div className="form-group">
          <label htmlFor="endTime">Auction End Time:</label>
          <input
            type="datetime-local"
            className="form-control"
            id="endTime"
            name="endTime"
            value={product.endTime}
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