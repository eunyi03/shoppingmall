import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HospitalA from './HospitalA';
import HospitalB from './HospitalB';
import HospitalC from './HospitalC';

export const openChatroomPopup = (roomId) => {
  const url = `/Chatting/${roomId}`; // 병원에 따른 url
  const title = 'popup';
  const status = 'toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=400,height=500,top=100,left=200';
  const newWindow = window.open('', title, status);

  if (newWindow) {
    newWindow.document.write('<div id="popup-root"></div>');
    newWindow.document.close();

    ReactDOM.createRoot(newWindow.document.getElementById('popup-root')).render(
      <Router>
        <Routes>
          <Route path="/Chatting/A" element={<HospitalA />} />
          <Route path="/Chatting/B" element={<HospitalB />} />
          <Route path="/Chatting/C" element={<HospitalC />} />
        </Routes>
      </Router>
    );
    newWindow.location.href = url; // 절대 경로 설정
  }
};
