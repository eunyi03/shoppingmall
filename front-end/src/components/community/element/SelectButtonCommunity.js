import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ElementCommunity.css';

function SelectButtonCommunity() {
  const location = useLocation();

  return (
    <div className="SelectButtonCommunity">
      <Link to="/joy" className={location.pathname === '/joy' ? 'active-button' : 'inactive-button'}>
        기쁨이
      </Link>
      <Link to="/sadness" className={location.pathname === '/sadness' ? 'active-button' : 'inactive-button'}>
        슬픔이
      </Link>
      <Link to="/anxiety" className={location.pathname === '/anxiety' ? 'active-button' : 'inactive-button'}>
        불안이
      </Link>
      <Link to="/fear" className={location.pathname === '/fear' ? 'active-button' : 'inactive-button'}>
        소심이
      </Link>
      <Link to="/notice" className={location.pathname === '/fear' ? 'active-button' : 'inactive-button'}>
        공지사항
      </Link>
    </div>
  );
}

export default SelectButtonCommunity;
