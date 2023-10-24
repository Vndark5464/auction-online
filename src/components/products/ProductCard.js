import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import '../../assets/css/product.css'

const ProductCard = ({ product }) => {
    const [timeRemaining, setTimeRemaining] = useState('');

    useEffect(() => {
        // Method to calculate and update the time remaining
        const calculateTimeRemaining = () => {
            if (product.endTime) {
                const endTime = new Date(product.endTime);
                const now = new Date();
                const timeRemainingInMilliseconds = endTime - now;

                if (timeRemainingInMilliseconds <= 0) {
                    setTimeRemaining('Auction ended');
                } else {
                    const hours = Math.floor(timeRemainingInMilliseconds / 1000 / 60 / 60);
                    const minutes = Math.floor(timeRemainingInMilliseconds / 1000 / 60) % 60;
                    const seconds = Math.floor(timeRemainingInMilliseconds / 1000) % 60;

                    setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                }
            } else {
                setTimeRemaining('Auction time not available');
            }
        };

        // Call calculateTimeRemaining immediately and every second afterwards 
        calculateTimeRemaining();
        const intervalId = setInterval(calculateTimeRemaining, 1000);

        // Clean up our interval timer on unmount
        return () => clearInterval(intervalId);
    }, [product.endTime]);

    return (
        <div className="product-card">
            <div className="product-thumbnail">
                <img src={product.imageSrc || "placeholder.jpg"} alt={product.imageAlt || "Product Image"} />
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description"><b>Năm:</b> &emsp; {product.excerpt || "No description available"}</p>
                <div className="product-foot"><b>Giá khởi điểm:</b>
                    <span className="product-price"> {product.price}</span>                 
                </div>
                <div className="product-foot">
                    <span className="product-time-remaining"><b>Thời gian còn lại:</b> &emsp; {timeRemaining}</span>
                </div>
                <div className="product-foot">
                    <b>Người bán:</b> &emsp; {product.username || "Unknown Seller"}
                </div>

            </div>
        </div>

    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        title: PropTypes.string,
        imageSrc: PropTypes.string,
        imageAlt: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.string,
        endTime: PropTypes.number,
    }).isRequired,
};

export default ProductCard;