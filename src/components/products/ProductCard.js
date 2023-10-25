import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import '../../assets/css/product.css'

const ProductCard = ({ product }) => {
    const [timeRemaining, setTimeRemaining] = useState('');

    useEffect(() => {
        // Method to calculate and update the time remaining
        const calculateTimeRemaining = () => {
            if (product.approvedTime) {
                const approvedTime = new Date(product.approvedTime);
                const endTime = new Date(approvedTime.getTime() + 86400000); // Thêm 2 tiếng
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

    // Kiểm tra nếu sản phẩm chưa được xét duyệt thì không hiển thị
    if (!product.isApproved) {
        return null;
    }

    return (
        <Link to={`/product-details/${product.id}`}>
        <div className="container m-3">
        <div className="card mb-4">
            <div className="row g-0">
                <div className="col-md-4">
                    <img alt={product.imageAlt || "Product Image"} src={product.imageSrc || "placeholder.jpg"}  className="img-fluid"/>
                </div>
                <div className="col-md-8">
                    <div className="card-body d-flex flex-column justify-content-between">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text"><b>Năm:</b> &emsp; {product.excerpt || "No description available"}</p>
                        <p className="card-text"><b>Giá khởi điểm:</b> {product.price}</p>
                        <p className="card-text"><b>Thời gian còn lại:</b> &emsp; {timeRemaining}</p>
                        <p className="card-text"><b>Người bán:</b> &emsp; {product.username || "Unknown Seller"}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Link>
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
        isApproved: PropTypes.bool,
    }).isRequired,
};

export default ProductCard;
