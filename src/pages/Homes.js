// Pages/Home.js

import React from 'react';
import Header from '../components/home/Head';
import Body from '../components/home/Body';
import Footer from '../components/home/Footer';

function Homes() {
  return (
    <div className="home-page">
      {/* Phần nội dung khác của trang chủ */}
      <Header/>
      <Body/>
      <Footer />
    </div>
  );
}

export default Homes;