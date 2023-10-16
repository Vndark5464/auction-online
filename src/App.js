import React ,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homes from './pages/Homes';
import Register from './components/users/Register';
import Login from './components/users/Login';
import ForgotPassword from './components/users/ForgotPassword';

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
      </Routes>
    </Router>
  );
}

export default App;