import React, { useState, useEffect , useRef} from "react";
import ProductCard from "./ProductCard";
import ProductDataService from '../../services/product.services';
import Header from "../home/Head";
import SearchBar from "../home/SearchBar";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const searchBarInputRef = useRef(null);   

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
        <Header />
        <div className="title-product">
            <h3>Danh sách sản phẩm</h3>
        </div>
        <div><SearchBar InputRef ={searchBarInputRef}/></div>
        <div>
        
            {products.map(product => <ProductCard key={product.id} product={product}/>)}
        </div>
        </>
    );
};

export default ProductList;