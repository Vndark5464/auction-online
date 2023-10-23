import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Lấy tổng số người dùng
      const userDocs = await getDocs(collection(db, 'Users'));
      const totalUsers = userDocs.size;

      // Lấy tổng số sản phẩm
      const productDocs = await getDocs(collection(db, 'products'));
      const totalProducts = productDocs.size;

      setStats({ totalUsers, totalProducts });
    };

    fetchStats();
  }, []);

  return (
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
      </div>
    </div>
  );
}

export default Dashboard;
