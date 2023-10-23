import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc,getDoc,addDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import MenuAdmin from './menu-admin';

const ProductManagement = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);


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
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setDisplayedProducts(filteredProducts);
        } else {
            setDisplayedProducts(allProducts);
        }
    }, [searchTerm, allProducts]);

    const handleDelete = async (productId) => {
        // Xóa sản phẩm từ cơ sở dữ liệu
        await deleteDoc(doc(db, 'products', productId));
    
        // Lấy thông tin sản phẩm
        const productDoc = await getDoc(doc(db, 'products', productId));
        const productData = productDoc.data();
    
        // Tạo thông báo mới cho người dùng
        const notification = {
            userId: productData.userId, // giả định mỗi sản phẩm có trường userId để xác định người dùng đã tải lên
            message: "Admin đã xóa sản phẩm của bạn do vi phạm chính sách",
            read: false,
            timestamp: new Date()
        };
    
        await addDoc(collection(db, 'notifications'), notification);
    
        setProducts(products.filter(product => product.id !== productId));
    };
    

    return (
        <>
        <div className="container mt-5">
        <MenuAdmin />
      </div>
        <div className="container mt-5">
            <h1>Quản lý sản phẩm</h1>
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
                            <td>{product.sellerName}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default ProductManagement;
