import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatroom from './Chatroom';

export const openChatroomPopup = (my_roomid, roomId) => {
  const url = `/Chatroom/${my_roomid}/to/${roomId}`;
  const title = 'popup';
  const status = 'toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=400,height=500,top=100,left=200';
  const newWindow = window.open('', title, status);

  if (newWindow) {
    newWindow.document.write('<div id="popup-root"></div>');
    newWindow.document.close();

    ReactDOM.createRoot(newWindow.document.getElementById('popup-root')).render(
      <Router>
        <Routes>
          <Route path="/Chatroom/:my_roomid/to/:roomId" element={<Chatroom />} />
        </Routes>
      </Router>
    );
    newWindow.location.href = url; // 절대 경로 설정
  }
};
