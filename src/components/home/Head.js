import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoABC from '../../assets/img/logo_abc _.jpg';
import ServerTimeClock from '../ServerTimeClock';
import { useAuth } from '../users/AuthContext';
import { Dropdown } from 'bootstrap';
import Notification from './Notification';


function Header() {
  const { isLoggedIn, userData, setIsLoggedIn, setUserData } = useAuth();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  }
   useEffect(() => {
    let dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
    let dropdownList = dropdownElementList.map(dropdownToggleEl => new Dropdown(dropdownToggleEl))

    return () => {
      dropdownList.map(dropdown => dropdown.dispose());
    }
  }, []);
  console.log("User's profile image URL:", userData?.profileImageURL);
  return (
    <header id='head-head' role="banner" className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link to="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
            <img className="logo-abc" src={logoABC} alt="Logo of Your Website Name" width="50px" height="50px" aria-label="Home" />
            <ServerTimeClock />
          </Link>
          <nav className='menu' role="navigation" aria-label="main navigation">
            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <Link to="/products" className="nav-link text-secondary">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="nav-link text-white">
                  About
                </Link>
              </li>
              <li className="nav-link text-white">
                  <Notification />
              </li>

              {isLoggedIn ? (
                <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle text-white" to="#" id="navbarDropdown" role="menuitem" data-bs-toggle="dropdown" aria-expanded="false">
                <img 
                  src={userData?.profileImageURL}
                  alt="User Avatar"
                  width="60" 
                  className="rounded-circle"
                />
                
                </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className='dropdown-item'>{userData ? userData.lastName : ''}</li>
                  <br/>
                    <li>
                      <Link to="/user-profile" className="dropdown-item">
                        User Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/setting" className="dropdown-item">
                        Setting
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link to="/login" className="dropdown-item" onClick={handleLogout}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="nav-link text-white">
                    {isLoggedIn ? `Xin chào, ${userData?.lastName || ''}` : 'Login'}
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
