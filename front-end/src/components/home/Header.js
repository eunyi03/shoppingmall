import React from 'react';
import './Header.css';

function Header(props) {
  return (
    <div className="header">
      <div className="headerTxt">
        <h1>
          <div className="line1">
            <p>{props.title1}</p>
          </div>
          <div className="line2">
            <p>{props.title2}</p>
            <p>{props.title3}</p>
          </div>
        </h1>
      </div>
    </div>
  );
}

export default Header;
