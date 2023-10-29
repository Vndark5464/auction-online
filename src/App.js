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
import NotificationPage from './components/home/NotificationPage';
import MyProducts from './components/products/MyProducts';
import ProductDetails from './components/products/ProductDetails';
import FinishedProductsPage from './components/admin/FinishedProductsPage';
import AdminApprovalPage from './components/admin/AdminApprovalPage';
import ReportViolationForm from './pages/ReportViolationForm';
import AdminReportPage from './components/admin/AdminReportPage';

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
        <Route path="/notification-page" element={<NotificationPage />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/admin/finished-products" element={<FinishedProductsPage />} />
        <Route path='/admin/approval-products' element={<AdminApprovalPage />} />
        <Route path='/report' element={<ReportViolationForm />} />
        <Route path='admin/report' element={<AdminReportPage/>} />

      </Routes>
    </Router>
  );
}

export default App;