import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useUserData from '../useUserData';

const HospitalChat = () => {
  const { roomId } = useParams(); // 발신자 roomId
  const { userId } = useUserData(); // 사용자 아이디를 불러와서 메세지를 수신할 의사 지정
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    // 백엔드에서 메시지 가져오기
    const fetchMessages = async () => {
      try {
        console.log(`Fetching messages for roomId: ${roomId}`);
        const response = await axios.get(`/chat/doctor/${roomId}/messages`);
        console.log('Fetched messages:', response.data);
        setMessages(response.data);
        setRoomMessages(response.data.filter((msg) => msg.receiver_id === userId));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [roomId, userId]);

  // 메세지 전송
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    try {
      // 백엔드에 새 메시지 보내기
      const response = await axios.post(`/chat/doctor/${roomId}/messages`, {
        receiver_id: userId, // userId를 수신자로 설정
        content: newMessage,
      });

      console.log('Response:', response);

      // 메시지 전송 후 메시지 목록 업데이트
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          receiver_id: userId,
          content: newMessage,
        },
      ]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>채팅 창</h1>
      {/* 이하 채팅 창의 UI 및 기능을 추가할 수 있습니다. */}
      <div className="chat-messages">
        {/* 채팅 메시지 영역 */}
        {roomMessages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
      <div className="input-message">
        {/* 메시지 입력 창 */}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        {/* 전송 버튼 */}
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
};

export default HospitalChat;
