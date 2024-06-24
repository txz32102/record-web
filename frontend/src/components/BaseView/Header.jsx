import React from 'react';
import perfilImg from './img/perfil.jpg';
import { Helmet } from 'react-helmet';

const Header = ({ showMenu, handleToggleMenu }) => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" />
      </Helmet>
      <header className="header">
        <div className="header__container">
          <img src={perfilImg} alt="" className="header__img" />
          <a href="#" className="header__logo">Bedimcode</a>
          <div className="header__search">
            <input type="search" placeholder="Search" className="header__input" />
            <i className='bx bx-search header__icon'></i>
          </div>
          <div className="header__toggle" onClick={handleToggleMenu}>
            <i className={`bx ${showMenu ? 'bx-x' : 'bx-menu'}`} id="header-toggle"></i>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
