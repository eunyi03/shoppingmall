import React from 'react';
import Header from './Header';
import Login from './Login';
import NoticeHome from './community/NoticeHome';
import AllCommunity from './community/AllCommunity.js';
import './Home.css';

function Home() {
  return (
    <div>
      <Header title1="모바일로 쉽고 간편하게!" title2="건강한 생활을" title3="즐겨봐요!"></Header>
      <div className="LoginNotice_layout">
        <Login></Login>
        <NoticeHome />
      </div>
      <AllCommunity />
    </div>
  );
}

export default Home;
