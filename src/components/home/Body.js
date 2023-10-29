import React from "react";
import SellerRankingPage from "./SellerRankingPage";
import BuyerRankingPage from "./BuyerRankingPage";
import 'bootstrap/dist/css/bootstrap.css';

function Body() {
    function goToPage2() {
        
    }
    return(
        <>
        <div id="main-body" className="container mt-4" style={{maxWidth: '100vw', overflowX: 'hidden'}}>
            <div className="hero-area hero-style-three">
                <img alt="Banner image" src="https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/hinh-anh-anime-buon_103502006.jpg" className="home3-banner img-fluid mx-auto d-block" style={{height: '550px', objectFit: 'contain', width: '100%'}}/>
                <div className="container-lg">
                <div className="row align-items-end">
                    <div className="col-xl-5 col-lg-5">
                    <div className="banner3-content py-5">
                        <div className="fw-bold my-2">
                        <div className="text-dark fs-4">Welcome to ABC Auction</div>
                        </div>
                        <div className="text-dark fw-bold my-2 fs-5">
                        Vietnam's leading online auction platform
                        </div>
                        <p className="text-dark">
                        Proud to be one of the largest auction houses in Vietnam, 
                        Auction has always been a pioneer in applying information technology to auction activities,
                        opening a new chapter for the country's auction activities.
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <SellerRankingPage />
            <BuyerRankingPage />
        </div>
      </>
    );
}

export default Body