import React ,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homes from './pages/Homes';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import UserProfile from './pages/Profile';
import AuctionProductList from './components/products/AuctionProductList';
import UploadProduct from './components/products/UploadProduct';
import Admin from './components/admin/admin';
import UserManagement from './components/admin/UserManagement';
import ProductManagement from './components/admin/ProductManagement';
import Notification from './components/home/Notification';

const App = () => {

  const[userId,setUserId] = useState("");
  const getUserIdHandler = (id) =>{
    console.log("The Id : ",id);
    setUserId(id);
  };

  // make sure to implement routing focus management to ensure keyboard navigation  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/products" element={<AuctionProductList />} />
        <Route path="/upload-products" element={<UploadProduct />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/product-management" element={<ProductManagement />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </Router>
  );
}

export default App;