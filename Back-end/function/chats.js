// /chat/user   /chat/doctor

const express = require('express');
const mysql = require('mysql');
const db_config = require('../config/db_config.json');
const router = express.Router();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  port: db_config.port,
  debug: false,
});

// 채팅 목록
router.post('/process/chat', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('로그인이 필요합니다.');
  }

  const currentUserNickname = req.session.user.nickname;

  pool.query(
    'SELECT roomId, nickname, state FROM users WHERE nickname != ?',
    [currentUserNickname],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('서버 오류');
      } else {
        console.log(results); // 응답 데이터 확인을 위한 로그 추가
        res.json(results);
      }
    }
  );
});

// 채팅방 메시지 조회 (GET)
router.get('/chatrooms/:my_roomid/to/:roomId/messages', (req, res) => {
  const { my_roomid, roomId } = req.params;
  const session_roomid = req.session.user.roomid;

  if (session_roomid != my_roomid) {
    return res.status(403).send('Forbidden');
  }

  pool.query(
    'SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?)',
    [my_roomid, roomId],
    (error, results) => {
      if (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).send('서버 오류');
      }
      res.json(results);
    }
  );
});

// 새로운 메시지 전송 (POST)
router.post('/chatrooms/:my_roomid/to/:roomId/messages', (req, res) => {
  const { my_roomid, roomId } = req.params;
  const { receiver_id, content } = req.body;
  const session_roomid = req.session.user.roomid;

  if (session_roomid != my_roomid || receiver_id != roomId) {
    return res.status(403).send('Forbidden');
  }

  pool.query(
    'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
    [my_roomid, receiver_id, content],
    (error, results) => {
      if (error) {
        console.error('Message save error:', error);
        return res.status(500).send('서버 오류');
      }
      // 두 번째 쿼리를 수행하고, 모든 쿼리가 성공하면 응답을 보냅니다.
      pool.query(
        'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
        [receiver_id, my_roomid, content],
        (error, results) => {
          if (error) {
            console.error('Message save error:', error);
            return res.status(500).send('서버 오류');
          }
          res.status(201).send('메시지 전송 성공');
        }
      );
    }
  );
});

router.use('/chat', router);

module.exports = router;
