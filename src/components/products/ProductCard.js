import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import '../../assets/css/product.css';
import { db } from "../../firebase-config";
import { deleteDoc, doc, runTransaction, collection, where, orderBy, getDocs, query ,limit} from "firebase/firestore";

const ProductCard = ({ product }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const calculateTimeRemaining = async () => {
        if (product.approvedTime) {
            const approvedTime = new Date(product.approvedTime);
            const endTime = new Date(approvedTime.getTime() + 7200000); // Thêm 2 tiếng
            const now = new Date();
            const timeRemainingInMilliseconds = endTime - now;

            if (timeRemainingInMilliseconds <= 0) {
              setTimeRemaining('Auction ended');
          
              const bidHistoryRef = collection(db, "bidHistory");
              const bidQuery = query(
                  bidHistoryRef,
                  where("productId", "==", product.id),
                  orderBy("timestamp", "desc"),
                  limit(1)
              );
          
              const bidSnapshot = await getDocs(bidQuery);
              const lastBid = bidSnapshot.docs[0]?.data();
          
              const oldProductRef = doc(db, "products", product.id);
              const newProductRef = doc(db, "finishedProducts", product.id);
          
              let newProductData;
              if (lastBid) {
                  const lastBuyer = lastBid.username;
                  newProductData = {
                      ...product,
                      lastBuy: lastBuyer,
                  };
              } else {
                  // Trường hợp không có lượt đấu giá
                  newProductData = {
                      ...product,
                      lastBuy: "No buyer",
                  };
              }
          
              runTransaction(db, async (transaction) => {
                  transaction.delete(oldProductRef);
                  transaction.set(newProductRef, newProductData);
              }).catch((error) => {
                  console.error('Error moving document: ', error);
              });
          
              return;
          }          
            
            const hours = Math.floor(timeRemainingInMilliseconds / 1000 / 60 / 60);
            const minutes = Math.floor(timeRemainingInMilliseconds / 1000 / 60) % 60;
            const seconds = Math.floor(timeRemainingInMilliseconds / 1000) % 60;

            setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
            setTimeRemaining('Auction time not available');
        }
    };

    calculateTimeRemaining();
    const intervalId = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(intervalId);
  }, [product.isApproved, product.approvedTime, product.id]);

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
    id: PropTypes.string,
    username: PropTypes.string,
    approvedTime: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
