import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './View.css';
import { Helmet } from 'react-helmet';
import aGif from './img/a.gif';

const View = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" />
      </Helmet>
      <Header showMenu={showMenu} handleToggleMenu={handleToggleMenu} />
      <div className={`nav ${showMenu ? 'show-menu' : ''}`} id="navbar">
        <nav className="nav__container">
          <div>
            <a href="#" className="nav__link nav__logo">
              <i className='bx bxs-disc nav__icon'></i>
              <span className="nav__logo-name">Bedimcode</span>
              <a href="#" className="nav__link active"></a>
            </a>
            <Link to="/" className="nav__link active">
              <span className="nav__name">Home</span>
            </Link>

            <div className="nav__list">
              <div className="nav__items">
                <h3 className="nav__subtitle">Profile</h3>

                <Link to="/" className="nav__link active">
                  <img src={aGif} alt="Home" className="nav__icon" />
                  <span className="nav__name">Home</span>
                </Link>

                <div className="nav__dropdown">
                  <a href="#" className="nav__link">
                    <i className='bx bx-user nav__icon'></i>
                    <span className="nav__name">Profile</span>
                    <i className='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                  </a>

                  <div className="nav__dropdown-collapse">
                    <div className="nav__dropdown-content">
                      <a href="#" className="nav__dropdown-item">Passwords</a>
                      <a href="#" className="nav__dropdown-item">Mail</a>
                      <a href="#" className="nav__dropdown-item">Accounts</a>
                    </div>
                  </div>
                </div>

                <a href="#" className="nav__link">
                  <i className='bx bx-message-rounded nav__icon'></i>
                  <span className="nav__name">Messages</span>
                </a>
              </div>

              <div className="nav__items">
                <h3 className="nav__subtitle">Menu</h3>

                <div className="nav__dropdown">
                  <a href="#" className="nav__link">
                    <i className='bx bx-bell nav__icon'></i>
                    <span className="nav__name">Notifications</span>
                    <i className='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                  </a>

                  <div className="nav__dropdown-collapse">
                    <div className="nav__dropdown-content">
                      <a href="#" className="nav__dropdown-item">Blocked</a>
                      <a href="#" className="nav__dropdown-item">Silenced</a>
                      <a href="#" className="nav__dropdown-item">Publish</a>
                      <a href="#" className="nav__dropdown-item">Program</a>
                    </div>
                  </div>
                </div>

                <a href="#" className="nav__link">
                  <i className='bx bx-compass nav__icon'></i>
                  <span className="nav__name">Explore</span>
                </a>
                <a href="#" className="nav__link">
                  <i className='bx bx-bookmark nav__icon'></i>
                  <span className="nav__name">Saved</span>
                </a>
                <Link to="/readme" className="nav__link">
                  <i className='bx bx-world nav__icon'></i>
                  <span className="nav__name">readme</span>
                </Link>
              </div>
            </div>
          </div>

          <a href="#" className="nav__link nav__logout">
            <i className='bx bx-log-out nav__icon'></i>
            <span className="nav__name">Log Out</span>
          </a>
        </nav>
      </div>
    </>
  );
};

export default View;
