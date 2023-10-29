import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import Modal from 'react-modal';

import MenuAdmin from './menu-admin';

const ProductManagement = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [productToDelete, setProductToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const productCollection = collection(db, 'products');
      const productDocs = await getDocs(productCollection);
      const products = productDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllProducts(products);
      setDisplayedProducts(products);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredProducts = allProducts.filter(product =>
        product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedProducts(filteredProducts);
    } else {
      setDisplayedProducts(allProducts);
    }
  }, [searchTerm, allProducts]);
  

  const handleDelete = async (productId) => {
    const productToDelete = allProducts.find(p => p.id === productId);

    if (!productToDelete || !productToDelete.userId) {
      console.error("Product not found or doesn't have a userId");
      return;
    }

    // Set the product to delete and show the delete modal
    setProductToDelete(productToDelete);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) {
      return;
    }

    try {
      // Xóa sản phẩm
      await deleteDoc(doc(db, 'products', productToDelete.id));

      // Tạo thông báo mới cho người dùng
      const notification = {
        userId: productToDelete.userId,
        message: `Admin đã xóa sản phẩm ${productToDelete.title} của bạn do vi phạm chính sách`,
        read: false,
        timestamp: new Date()
      };

      await addDoc(collection(db, 'notifications'), notification);

      // Cập nhật danh sách sản phẩm sau khi xóa
      const updatedProducts = allProducts.filter(product => product.id !== productToDelete.id);
      setAllProducts(updatedProducts);
      setDisplayedProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }

    // Đóng modal
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  return (
    <>
 <div className="container mt-5">
    <MenuAdmin />
</div>
<div className="container mt-5">
    <div className="row">
        <div className="col-md-8">
            <h1>Quản lý sản phẩm</h1>
        </div>
        <div className="col-md-4 text-end">
            <button onClick={() => window.location.href="/admin/approval-products"} className="btn btn-primary me-2">Approval</button>
            <button onClick={() => window.location.href="/admin/finished-products"} className="btn btn-primary">Finished Products</button>
        </div>
    </div>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm theo tên..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Người bán</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map(product => (
              <tr key={product.id}>
                <td><img src={product.imageSrc} alt={product.title} width="50" /></td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.username}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      

      {/* Delete confirmation modal */}
      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        contentLabel="Xác nhận xóa sản phẩm"
      >
        <h2>Xác nhận xóa sản phẩm</h2>
        {productToDelete && (
          <>
            <p>Bạn có chắc chắn muốn xóa sản phẩm "{productToDelete.title}" không?</p>
            <button onClick={confirmDelete}>Xác nhận</button>
            <button onClick={() => setShowDeleteModal(false)}>Hủy</button>
          </>
        )}
      </Modal>
    </>
  );
};

export default ProductManagement;
