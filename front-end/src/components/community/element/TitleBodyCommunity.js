import React from 'react';
import './ElementCommunity.css';

function TitleBodyCommunity(props) {
  return (
    <>
      <h1>{props.title} 게시판</h1>
      <div>
        <div className="TitleBodyCommunity_body">이곳은 {props.title} 게시판입니다.</div>
        <div>{props.body}</div>
      </div>
    </>
  );
}

export default TitleBodyCommunity;
