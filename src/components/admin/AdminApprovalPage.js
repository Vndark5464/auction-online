import React, { useState, useEffect } from 'react';
import { addDoc,collection } from 'firebase/firestore';
import ProductDataService from '../../services/product.services';
import { db } from '../../firebase-config';

const AdminApprovalPage = () => {
  const [pendingProducts, setPendingProducts] = useState([]);

  useEffect(() => {
    ProductDataService.getPendingProducts().then(products => {
      setPendingProducts(products);
    });
  }, []);

  const handleApprove = async (productId) => {
    // Lấy thông tin sản phẩm được xét duyệt
    const product = pendingProducts.find(p => p.id === productId);
  
    if (!product || !product.userId) {
      console.error("Product not found or doesn't have a userId");
      return;
    }
  
    try {
      // Đặt trạng thái của sản phẩm thành đã xét duyệt
      await ProductDataService.approveProduct(productId);
  
      // Xóa sản phẩm khỏi danh sách sản phẩm chờ xét duyệt
      setPendingProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  
      // Tạo thông báo cho người dùng
      const notification = {
        userId: product.userId,
        message: `Sản phẩm ${product.title} của bạn đã được xét duyệt và sẵn sàng tham gia đấu giá`,
        read: false,
        timestamp: new Date(),
      };
  
      // Lưu thông báo vào Firestore
      await addDoc(collection(db, 'notifications'), notification);
    } catch (error) {
      console.error("Error approving product:", error);
    }
  };
  const handleGoBack = () => {
    window.history.back();
  };
  
  return (
    <>
    <div className="container mt-5">
    <button className="btn btn-secondary mb-3" onClick={handleGoBack}>Back</button>
      <h1 id="adminPageTitle" className="mb-3">Products Awaiting Approval</h1>
      <table className="table table-striped table-hover" aria-labelledby="adminPageTitle">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.excerpt}</td>
              <td>{product.price}</td>
              <td><img src={product.imageSrc} alt={product.title} width="100"/></td>
              <td>
                <button 
                    className="btn btn-outline-primary" 
                    onClick={() => handleApprove(product.id)} 
                    aria-label={`Approve product ${product.title}`} 
                    aria-describedby={`product${index + 1}`}
                >
                    Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AdminApprovalPage;