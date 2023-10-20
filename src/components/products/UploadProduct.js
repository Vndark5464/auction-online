import React, { useState } from 'react';
import ProductDataService from '../../services/product.services';

const UploadProduct = () => {
    const [product, setProduct] = useState({
        title: '',
        excerpt: '',
        price: '',
        imageSrc: '',
        imageAlt: '',
        endTime: ''
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const productDataService = new ProductDataService();
        productDataService.addProduct(product).then(() => alert("Product successfully uploaded.")).catch(err => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name
                <input type="text" name="title" value={product.title} onChange={handleInputChange} required />
            </label>
            <label>
                Description:
                <input type="text" name="excerpt" value={product.excerpt} onChange={handleInputChange} required />
            </label>
            <label>
                Price:
                <input type="number" name="price" value={product.price} onChange={handleInputChange} required />
            </label>
            <label>
                Image URL:
                <input type="url" name="imageSrc" value={product.imageSrc} onChange={handleInputChange} required />
            </label>
            <label>
                Image Alt Text:
                <input type="text" name="imageAlt" value={product.imageAlt} onChange={handleInputChange} required />
            </label>
            <label>
                Auction End Time:
                <input type="datetime-local" name="endTime" value={product.endTime} onChange={handleInputChange} required />
            </label>
            <button type="submit">Upload Product</button>
        </form>
    );
};

export default UploadProduct;