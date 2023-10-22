import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductDataService from '../../services/product.services';
import Header from "../home/Head";
import unidecode from "unidecode";

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
            const searchTermWithoutDiacritics = unidecode(searchTerm).toLowerCase();
    
            const filteredProducts = allProducts.filter(product => {
                // Chuyển đổi title thành chữ thường và bỏ qua dấu
                const lowercaseTitle = unidecode((product.title || '')).toLowerCase();
    
                return lowercaseTitle.includes(searchTermWithoutDiacritics);
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
                <div className="col"></div>
                {products.map(product => (
                    <div  key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}

            </div>
        </div>
        </>
    );
};

export default ProductList;
