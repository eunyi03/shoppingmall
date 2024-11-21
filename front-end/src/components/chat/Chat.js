import React, { useState, useEffect } from 'react';
import CommonTable2 from './chatList/CommonTable2';
import CommonTableColumn2 from './chatList/CommonTableColumn2';
import CommonTableRow2 from './chatList/CommonTableRow2';
import './Chat.css';
import Chatroom from './Chatroom.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Chat = ({ roomid, selectedRoomId, handleSelectRoom }) => {
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    axios
      .post('/process/chat')
      .then((response) => {
        setDataList(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the posts!', error);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Array.isArray(dataList) ? dataList.slice(indexOfFirstPost, indexOfLastPost) : [];

  const getShadowClass = (state) => {
    switch (state) {
      case '우울':
        return 'state_color sadness';
      case '불안':
        return 'state_color anxiety';
      case '강박':
        return 'state_color fear';
      default:
        return 'state_color';
    }
  };

  const handleChatItemClick = (my_roomid, roomId) => {
    window.parent.postMessage({ roomId }, '*');
    // handleSelectRoom(my_roomid, roomId);
  };

  return (
    <>
      <div className="chatTop">
        <h1>Chat List</h1>
      </div>
      <ul>
        {currentPosts.map((item) => (
          <li key={item.roomId}>
            <div className="img_name">
              <span className="user_nickname">{item.nickname}</span>
              <span className={`state_color ${getShadowClass(item.state)}`}>{item.state}</span>
            </div>
            <button className="chat-item" onClick={() => handleChatItemClick(roomid, item.roomId)}>
              채팅
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Chat;
