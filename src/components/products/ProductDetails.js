import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDataService from "../../services/product.services";
import { db } from "../../firebase-config";
import { getAuth } from "firebase/auth";
import {
    addDoc,
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    getDoc,
    doc,
  } from "firebase/firestore";
  

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [newBid, setNewBid] = useState(0);
  const [bidHistory, setBidHistory] = useState([]);

  const auth = getAuth(); // Lấy thông tin đăng nhập từ Firebase Authentication
  const uid = auth.currentUser ? auth.currentUser.uid : null;


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await ProductDataService.getProduct(id);
        if (productData.exists()) {
          setProduct(productData.data());
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);


  useEffect(() => {
    // Lấy lịch sử đấu giá từ Firestore và sắp xếp theo thời gian
    const historyCollectionRef = collection(db, "bidHistory");
    const historyQuery = query(
      historyCollectionRef,
      where("productId", "==", id),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(historyQuery, (snapshot) => {
      const history = [];
      snapshot.forEach((doc) => {
        history.push(doc.data());
      });
      setBidHistory(history);
    });

    return unsubscribe;
  }, [id]);

  const handleNewBid = async () => {
    if (!uid) {
      console.log("Bạn chưa đăng nhập."); // Kiểm tra xem người dùng có đăng nhập không
      return;
    }

    if (uid === product.userId) {
      console.log("Bạn không được đấu giá sản phẩm của chính bạn.");
      return;
    }
    let bidderUsername = "";
    try {
        const userDoc = await getDoc(doc(db, "Users", uid));
        if (userDoc.exists()) {
          bidderUsername = userDoc.data().username;
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }

    // Kiểm tra newBid có hợp lệ (lớn hơn giá hiện tại) và cập nhật dữ liệu sản phẩm
    if (newBid > product.price) {
      try {
        // Tạo một đối tượng để cập nhật giá mới
        const updatedProduct = {
          price: newBid,
          // Các thông tin khác của sản phẩm
        };

        await ProductDataService.updateProduct(id, updatedProduct);
         // Thêm thông tin đấu giá mới vào lịch sử đấu giá
         const newBidRecord = {
            userId: uid,
            username: bidderUsername, 
            bidAmount: newBid,
            timestamp: new Date().toISOString(),
            productId: id,
          };
  
          // Thêm dữ liệu vào Firestore
          await addDoc(collection(db, "bidHistory"), newBidRecord);  
        console.log("Ra giá mới thành công!");
        // Cập nhật lại thông tin sản phẩm sau khi ra giá mới
        setProduct((prevProduct) => ({
          ...prevProduct,
          price: newBid,
        }));
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {
      console.log("Giá đấu giá mới phải lớn hơn giá hiện tại.");
    }
  };


useEffect(() => {
    const calculateTimeRemaining = () => {
        if (product && product.approvedTime) {
            const approvedTime = new Date(product.approvedTime);
            const endTime = new Date(approvedTime.getTime() + 86400000); // Thêm 24 tiếng
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

    calculateTimeRemaining();
    const intervalId = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(intervalId);
}, [product]);



return (
    <div className="product-details container mt-5 d-flex flex-column flex-md-row align-items-start align-items-md-stretch" role="main">
    {product ? (
      <>
          <div className="col-md-4 p-0 position-relative">
            <div className="card w-100 h-100">
              <img src={product.imageSrc} alt={product.imageAlt} className="img-fluid rounded-start h-100 w-100 object-fit-cover" style={{height: '300px', width: '300px'}}/>
            </div>
          </div>
        
          <div className="col-md-4 p-0 d-flex flex-column justify-content-between mx-md-3 mx-0">
            <div className="card-body">
              <h2 className="card-title mb-3">{product.title}</h2>
              <p className="mb-2"><span className="fw-bold">Năm:</span> {product.excerpt}</p>
              <p className="mb-2"><span className="fw-bold">Giá hiện tại:</span> {product.price}</p>
              <p className="mb-2"><span className="fw-bold">Thời gian còn lại:</span>: {timeRemaining}</p>
              <p className="mb-2"><span className="fw-bold">Người bán:</span> {product.username}</p>
            </div>
            <div className="bid-section p-3">
              <h3>Ra giá mới</h3>
              <label htmlFor="newBid" className="visually-hidden">Nhập giá mới</label>
              <input
                type="number"
                id="newBid"
                value={newBid}
                onChange={(e) => setNewBid(Number(e.target.value))}
                required
                min={product.price + 1}
                aria-label="Nhập giá mới"
              />
              <button onClick={handleNewBid}>Ra giá mới</button>
            </div>
          </div>

          <div className="col-md-4 p-0">
            <div className="bid-history h-100" style={{backgroundColor: '#dcd6f7'}}>
              <h3 className="p-3">Lịch sử đấu giá</h3>
              <ul className="p-3">
                {bidHistory.map((bid, index) => (
                  <li key={index}>
                    Thời gian : {bid.timestamp}, Người đấu giá: {bid.username}, Giá: {bid.bidAmount}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetails;
