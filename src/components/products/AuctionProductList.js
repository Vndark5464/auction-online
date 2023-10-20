import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductDataService from '../../services/product.services';
import Header from "../home/Head";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productDataService = new ProductDataService();
        productDataService.getAllProduct().then(querySnapshot => {
            const productsData = querySnapshot.docs.map(doc => ({
                ...doc.data(), 
                id: doc.id
            }));
            setProducts(productsData);
        }).catch(err => console.error(err));
    }, []);

    return (
        <>
        
        <div className="title-product">
            <h3>Danh sách sản phẩm</h3>
        </div>
        <div className="products row row-small align-equal">
            {products.map(product => <ProductCard key={product.id} product={product}/>)}
        </div>
        </>
    );
};

export default ProductList;