// FinishedProductsPage.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { deleteDoc,doc } from 'firebase/firestore';


const FinishedProductsPage = () => {
    const [finishedProducts, setFinishedProducts] = useState([]);

    useEffect(() => {
        const fetchFinishedProducts = async () => {
            // Lấy dữ liệu từ bộ sưu tập 'finishedProducts'
            const finishedProductCollection = collection(db, 'finishedProducts');
            const finishedProductDocs = await getDocs(finishedProductCollection);
            const products = finishedProductDocs.docs.map(doc => doc.data());
            setFinishedProducts(products);
        };

        fetchFinishedProducts();
    }, []);
    const handleDeleteProduct = async (productId) => {
        try {
            // Xóa sản phẩm từ bộ sưu tập 'finishedProducts' dựa vào productId
            const productRef = doc(db, 'finishedProducts', productId);
            await deleteDoc(productRef);
    
            // Sau khi xóa thành công, cập nhật danh sách sản phẩm
            const updatedProducts = finishedProducts.filter(product => product.id !== productId);
            setFinishedProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    
    const handleGoBack = () => {
        window.history.back();
      };
    return (
        <>
        <div className="container mt-5">
        <button className="btn btn-secondary mb-3" onClick={handleGoBack}>Back</button>
            <h1>Sản phẩm đã đấu giá thành công</h1>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá cuối cùng</th>
                        <th>Người bán</th>
                        <th>Người ra giá cuối cùng</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                {finishedProducts.map(product => (
                    <tr key={product.id}>
                        <td><img src={product.imageSrc} alt={product.title} width="50" /></td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.username}</td>
                        <td>{product.lastBuy}</td>
                        <td>
                            <button button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default FinishedProductsPage;
