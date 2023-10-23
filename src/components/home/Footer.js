import React from 'react';
import '../../assets/css/footer.css';

const Footer = () => {
    return (
        <footer className="blockcode">
        <div className="page-footer shadow">
            <div className=" mx-auto " style={{width: '80%'}}>
            <div className="d-flex flex-wrap justify-content-between">
                <div>
                <p className="my-3" style={{width: '250px'}}>
                ABC Auction is a leading auction platform that connects buyers and sellers worldwide.
                 With over 10 years of experience, we are committed to providing a reliable and professional experience.
                  Join us and explore the diverse world of art and culture through our exceptional auction sessions!
                </p>
                <span className="mt-4">
                    <button className="btn btn-dark btn-flat p-2" aria-label="Facebook">
                    <i className="fa fa-facebook"></i>
                    </button>
                    <button className="btn btn-dark btn-flat p-2" aria-label="Twitter">
                    <i className="fa fa-twitter"></i>
                    </button>
                    <button className="btn btn-dark btn-flat p-2" aria-label="Instagram">
                    <i className="fa fa-instagram"></i>
                    </button>
                </span>
                </div>
                <div>
                <p className="h5 mb-4" style={{fontWeight: '600'}}>Devwares</p>
                <ul className="p-0" style={{listStyle: 'none', cursor: 'pointer'}}>
                    <li className="my-2">
                    <a className="text-dark" href="/">Resources</a>
                    </li>
                    <li className="my-2">
                    <a className="text-dark" href="/">About Us</a>
                    </li>
                    <li className="my-2">
                    <a className="text-dark" href="/">Contact</a>
                    </li>
                    <li className="my-2">
                    <a className="text-dark" href="/">Blog</a>
                    </li>
                </ul>
                </div>
                <div>
                <p className="h5 mb-4" style={{fontWeight: '600'}}>Help</p>
                <ul className="p-0" style={{listStyle: 'none', cursor: 'pointer'}}>
                    <li className="my-2">
                    <a className="text-dark" href="/">Support</a>
                    </li>
                    <li className="my-2">
                    <a className="text-dark" href="/">Sign Up</a>
                    </li>
                    <li className="my-2">
                    <a className="text-dark" href="/">Sign In</a>
                    </li>
                </ul>
                </div>
            </div>
            <small className="text-footer-center">&copy; ABC Auction, 2020. All rights reserved.</small>
            </div>
        </div>
        </footer>
    );
};

export default Footer;