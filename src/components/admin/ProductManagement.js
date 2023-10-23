import React, { useState, useEffect } from 'react';
import { db } from '../../firebase-config';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Lấy danh sách sản phẩm từ cơ sở dữ liệu
        const fetchProducts = async () => {
            const productDocs = await db.collection('products').get();
            setProducts(productDocs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        // Xóa sản phẩm từ cơ sở dữ liệu
        await db.collection('products').doc(productId).delete();
        setProducts(products.filter(product => product.id !== productId));
    };

    return (
        <div className="container mt-5">
            <h1>Quản lý sản phẩm</h1>
            <table className="table table-striped">
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
                    {products.map(product => (
                        <tr key={product.id}>
                            <td><img src={product.imageSrc} alt={product.title} width="50" /></td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.sellerName}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductManagement;
