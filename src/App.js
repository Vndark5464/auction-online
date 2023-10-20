import React ,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homes from './pages/Homes';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import UserProfile from './pages/Profile';
import AuctionProductList from './components/products/AuctionProductList';
import UploadProduct from './components/products/UploadProduct';

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
      </Routes>
    </Router>
  );
}

export default App;