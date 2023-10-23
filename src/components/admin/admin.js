import React from 'react';
import { signOut } from 'firebase/auth'; 
import { auth } from '../../firebase-config'; 
import Dashboard from './Dashboard';
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../users/AuthContext';
import MenuAdmin from './menu-admin';

const Admin = () => {

    const navigate = useNavigate();
    const { setIsLoggedIn, setUserData } = useAuth();

    const handleLogout = () => {
        signOut(auth).then(() => {
          setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
          setUserData(null);    // Xóa dữ liệu người dùng
          navigate('/login');   // Chuyển hướng đến trang đăng nhập
        }).catch((error) => {
          console.error("Error signing out: ", error);
        });
      };
      
  return (
    <>
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Trang Quản Lý</h1>
        <button className="btn btn-danger" onClick={handleLogout}>Đăng xuất</button>
      </div>
             <MenuAdmin />
        <div className="col-md-9">
          <Dashboard />
        </div>
      </div>
    </>
  );
}

export default Admin;
