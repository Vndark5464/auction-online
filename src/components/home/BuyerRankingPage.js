import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.css';

function BuyerRankingPage() {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    const fetchTopBuyers = async () => {
      const finishedProductsRef = collection(getFirestore(), 'finishedProducts');
      const buyersSnapshot = await getDocs(finishedProductsRef);
      
      const buyerCounts = buyersSnapshot.docs.reduce((acc, doc) => {
        const buyer = doc.data().lastBuy;
        acc[buyer] = (acc[buyer] || 0) + 1;
        return acc;
      }, {});

      const sortedBuyers = Object.entries(buyerCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([lastBuy, count]) => ({ lastBuy, purchases: count }));

      setBuyers(sortedBuyers);
    };
    fetchTopBuyers();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Top Buyers Ranking</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Buyer</th>
            <th>Purchases</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((buyer, index) => (
            <tr key={buyer.lastBuy}>
              <td>{index + 1}</td>
              <td>{buyer.lastBuy}</td>
              <td>{buyer.purchases}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BuyerRankingPage;