import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './View.css';
import { Helmet } from 'react-helmet';
import aGif from './img/a.gif';

const View = () => {
  // State to control the visibility of the menu
  const [showMenu, setShowMenu] = useState(false);
  // State to store the starting position of a touch event
  const [xStart, setXStart] = useState(null);
  // Ref to reference the navigation menu element
  const navRef = useRef();

  // Function to toggle the visibility of the menu
  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Function to handle clicks outside the menu to close it
  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  // Function to handle the start of a touch event
  const handleTouchStart = (event) => {
    const firstTouch = event.touches[0];
    setXStart(firstTouch.clientX);
  };

  // Function to handle the movement during a touch event
  const handleTouchMove = (event) => {
    if (!xStart) {
      return;
    }

    const xEnd = event.touches[0].clientX;
    const xDiff = xEnd - xStart;

    // If the swipe is to the right and exceeds 50 pixels, show the menu
    if (xDiff > 50) {
      setShowMenu(true);
    } 
    // If the swipe is to the left and exceeds 50 pixels, hide the menu
    else if (xDiff < -50) {
      setShowMenu(false);
    }
  };

  // useEffect to add and clean up event listeners
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [xStart]);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" />
      </Helmet>
      <Header showMenu={showMenu} handleToggleMenu={handleToggleMenu} />
      <div ref={navRef} className={`nav ${showMenu ? 'show-menu' : ''}`} id="navbar">
        <nav className="nav__container">
          <div>
            <a href="#" className="nav__link nav__logo">
              <i className='bx bxs-disc nav__icon'></i>
              <span className="nav__logo-name">musong</span>
              <a href="#" className="nav__link active"></a>
            </a>

            <div className="nav__list">
              <div className="nav__items">
                <h3 className="nav__subtitle">Profile</h3>
                <img src={aGif} alt="Home" className="nav__icon" />
                <Link to="/" className="nav__link active">
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
