import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductDataService from '../../services/product.services';
import Header from "../home/Head";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allProducts, setAllProducts] = useState([]); // Lưu trữ tất cả sản phẩm ban đầu

    useEffect(() => {
        const productDataService = new ProductDataService();
        productDataService.getAllProduct().then(querySnapshot => {
            const productsData = querySnapshot.docs.map(doc => ({
                ...doc.data(), 
                id: doc.id
            }));
            setProducts(productsData);
            setAllProducts(productsData); // Lưu tất cả sản phẩm ban đầu
        }).catch(err => console.error(err));
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
    
        if (!searchTerm) {
            // Nếu không có ký tự tìm kiếm, hiển thị lại tất cả sản phẩm ban đầu
            setProducts(allProducts);
            return;
        }
    
        try {
            const filteredProducts = allProducts.filter(product => {
                // Kiểm tra xem product.title tồn tại và không phân biệt hoa thường
                const lowercaseTitle = (product.title || '').toLowerCase();
                const lowercaseSearchTerm = searchTerm.toLowerCase();
    
                return lowercaseTitle.includes(lowercaseSearchTerm);
            });
    
            setProducts(filteredProducts);
        } catch (error) {
            console.error("Error searching products:", error);
        }
    };
    
    
    return (
        <>
        <Header />
        <div className="container-xl px-4 mt-4">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                    <h2 className="mb-3">Danh sách sản phẩm đấu giá</h2>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm sản phẩm"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={handleSearch}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                {products.map(product => (
                    <div className="col" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}

            </div>
        </div>
        </>
    );
};

export default ProductList;
