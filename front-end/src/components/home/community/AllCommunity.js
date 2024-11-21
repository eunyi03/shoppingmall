import React from 'react';
import Community from './Community';
import './AllCommunity.css';
import community from '../../images/community.png';

function AllCommunity() {
  return (
    <div className="all">
      <div className="all_Community_layout">
        <div className="title_layout">
          <img src={community} alt="커뮤니티 로고" width={27} height={26} />
          <div className="community_name">커뮤니티</div>
        </div>
        <div>
          <div className="Community_layout">
            <Community title="기쁨이 게시판" emotion="joy"></Community>
            <Community title="우울이 게시판" emotion="sadness"></Community>
          </div>
          <div className="Community_layout">
            <Community title="불안이 게시판" emotion="anxiety"></Community>
            <Community title="소심이 게시판" emotion="fear"></Community>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCommunity;
