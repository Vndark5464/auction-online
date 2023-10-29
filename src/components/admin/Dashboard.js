import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import 'firebase/compat/firestore';
import { db } from '../../firebase-config';


const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalMoneyInWeek: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Fetching total number of users
      const userDocs = await getDocs(collection(db, 'Users'));
      const totalUsers = userDocs.size;

      // Fetching total number of products
      const productDocs = await getDocs(collection(db, 'products'));
      const totalProducts = productDocs.size;

      // Fetching total amount of money for the week
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      const weekProductsQuery = query(
        collection(db, "finishedProducts"),
        where("approvedTime", ">=", oneWeekAgo),
        orderBy("approvedTime", "asc")
      );

      const weekProductsSnap = await getDocs(weekProductsQuery);
      const totalMoneyInWeek = weekProductsSnap.docs.reduce((total, doc) => total + parseFloat(doc.data().price), 0);

      setStats({ totalUsers, totalProducts, totalMoneyInWeek });
    };

    fetchStats();
  }, []);


  return (
    <>
    <div className="container mt-5">
      <h1 className="mb-4">Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Tổng số người dùng</h5>
              <p className="card-text display-4">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Tổng số sản phẩm</h5>
              <p className="card-text display-4">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Tổng số tiền trong tuần</h5>
          <p className="card-text display-4">{stats.totalMoneyInWeek}</p>
        </div>
      </div>
    </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
