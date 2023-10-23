import React from 'react';
import { signOut } from 'firebase/auth'; 
import { auth } from '../../firebase-config'; 
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
        navigate('/login'); 
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Trang Quản Lý</h1>
        <button className="btn btn-danger" onClick={handleLogout}>Đăng xuất</button>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
              Dashboard
            </a>
            <a href="#" className="list-group-item list-group-item-action">Quản lý người dùng</a>
            <a href="#" className="list-group-item list-group-item-action">Quản lý sản phẩm</a>
          </div>
        </div>
        <div className="col-md-9">
          <Dashboard />
          {/* You can add other components here for user and product management */}
        </div>
      </div>
    </div>
  );
}

export default Admin;
