//마이페이지 구현
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const router = express.Router();
const db_config = require('../config/db_config.json');

// Database connection poolㅁㄴㅇㅁㄴㅇㅁㅁㄴㅇ
const pool = mysql.createPool({
  connectionLimit: 10,
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  port: db_config.port,
  debug: false,
});

router.post('/', (req, res) => {
  const userID = req.session.user.id;

  pool.getConnection((err, conn) => {
    if (err) {
      console.log('MySQL Connection Error', err);
      if (conn) conn.release();
      return res.status(500).send('DB 서버 연결 실패');
    }

    //select 할 때 db로 정보 불러오는 건데 여기서 roomid를 안가져오고 있었음. -> 수정완료
    const exec = conn.query(
      'SELECT Lastname, Firstname, nickname, id, birth, gender, state, roomid FROM users WHERE id = ?',
      [userID],
      (err, rows) => {
        conn.release();
        console.log('실행된 SQL: ' + exec.sql);

        if (err) {
          console.log('SQL 실행 시 오류 발생', err);
          return res.status(500).send('사용자 정보 가져오기 실패');
        }

        if (rows.length > 0) {
          res.json(rows[0]);
        } else {
          res.status(404).send('사용자 정보가 존재하지 않습니다.');
        }
      }
    );
  });
});
// /mypage/~~ 에 접속했을 때 다음과 같은 일을 하세요
router.post('/mypage/process/update', async (req, res) => {
  const userID = req.session.user.id;
  const { lastName, firstName, nickname, password, birth, gender, state } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    pool.getConnection((err, conn) => {
      if (err) {
        console.log('MySQL Connection Error', err);
        if (conn) conn.release();
        return res.status(500).json({ message: 'DB 서버 연결 실패' });
      }

      const sql = `
        UPDATE users 
        SET Lastname = ?, Firstname = ?, nickname = ?, 
            ${hashedPassword ? 'password = ?, ' : ''} 
            birth = ?, gender = ?, state = ? 
        WHERE id = ?`;

      const params = [lastName, firstName, nickname, birth, gender, state, userID];
      if (hashedPassword) {
        params.splice(3, 0, hashedPassword);
      }

      const exec = conn.query(sql, params, (err, result) => {
        conn.release();
        console.log('실행된 SQL: ' + exec.sql);

        if (err) {
          console.log('SQL 실행 시 오류 발생', err);
          return res.status(500).json({ message: '사용자 정보 업데이트 실패' });
        }

        if (result.affectedRows > 0) {
          console.log('사용자 정보 업데이트 성공');
          res.status(200).json({ message: '사용자 정보 업데이트 성공' });
        } else {
          console.log('사용자 정보 업데이트 실패');
          res.status(500).json({ message: '사용자 정보 업데이트 실패' });
        }
      });
    });
  } catch (error) {
    console.log('비밀번호 해싱 오류', error);
    res.status(500).json({ message: '비밀번호 해싱 실패' });
  }
});

//app과 router 연동
router.use('/mypage', router);
module.exports = router;
