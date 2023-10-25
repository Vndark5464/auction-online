import React, { useState, useEffect } from 'react';
import ProductDataService from '../../services/product.services';
import { getAuth } from 'firebase/auth';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../../firebase-config';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUserId(currentUser.uid);
      fetchUserProducts(currentUser.uid);
    }
  }, []);

  const fetchUserProducts = async (uid) => {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const productsData = [];
    querySnapshot.forEach((doc) => {
      productsData.push(doc.data());
    });
    setProducts(productsData);
  };
  const handleGoBack = () => {
    window.history.back();
  };


  return (
    <div className="container mt-5">
        <button className="btn btn-secondary mb-3" onClick={handleGoBack}>Back</button>
      <h2>Sản phẩm của tôi</h2>
      <ul className="list-group">
        {products.map(product => (
          <li key={product.id} className="list-group-item">
            <h5>{product.title}</h5>
            <p>{product.price}</p>
            {product.isApproved ? (
              <p className="text-success">Đang đấu giá - còn {product.remainingTime} giờ</p>
            ) : (
              <p className="text-warning">Chờ phê duyệt từ admin</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProducts;
