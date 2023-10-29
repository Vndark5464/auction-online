import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.css';

function SellerRankingPage() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchTopSellers = async () => {
      const productsRef = collection(getFirestore(), 'finishedProducts');
      const sellersSnapshot = await getDocs(productsRef);
      
      const sellerCounts = {};
      sellersSnapshot.docs.forEach(doc => {
        const sellerUsername = doc.data().username;
        if (sellerUsername) {
          sellerCounts[sellerUsername] = (sellerCounts[sellerUsername] || 0) + 1;
        }
      });

      const sortedSellers = Object.entries(sellerCounts)
        .map(([username, count]) => ({ username, count }))
        .sort((a, b) => b.count - a.count);

      setSellers(sortedSellers);
    };

    fetchTopSellers();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Top Sellers Ranking</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Seller Username</th>
            <th>Finished Products</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller, index) => (
            <tr key={seller.username}>
              <td>{index + 1}</td>
              <td>{seller.username}</td>
              <td>{seller.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SellerRankingPage;