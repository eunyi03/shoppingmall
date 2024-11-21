const express = require('express');
const mysql = require('mysql');
const db_config = require('../config/db_config.json');
const moment = require('moment');
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

// 관리자 계정 확인 미들웨어
const checkAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.user_mode === 0) {
    next();
  } else {
    res.status(403).send('Not Admin');
  }
};

// 게시판 데이터
/*const getBoardData = (res) => {
  try {
    const results = pool.query(`
      SELECT no, title, nickname, content, 
      DATE_FORMAT(created_date, '%Y년 %m월 %d일 %H시 %i분') AS created_date 
      FROM communitynotice
    `);
    res.json(json(results));
  } catch (error) {
    console.error(error);
    res.status(500).send('서버 오류');
  }
};*/
const getBoardData = (res) => {
  pool.query(
    `SELECT no, title, nickname, content, DATE_FORMAT(created_date, '%Y년 %m월 %d일 %H시 %i분') AS created_date FROM communitynotice`,
    (error, results) => {
      if (error) {
        console.error('데이터베이스 오류:', error);
        res.status(500).json({ error: '서버에서 게시판 데이터를 불러오는 중 오류가 발생했습니다.' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: '해당 게시판에 게시물이 없습니다.' });
        } else {
          res.json(json(results));
        }
      }
    }
  );
};

const insertBoardData = async (title, nickname, content, createdDate, res, redirectUrl) => {
  try {
    await pool
      .promise()
      .query(`INSERT INTO communitynotice (title, nickname, content, created_date) VALUES (?, ?, ?, ?)`, [
        title,
        nickname,
        content,
        createdDate,
      ]);
    res.redirect(redirectUrl);
  } catch (error) {
    console.log('SQL 실행 시 오류 발생', error);
    res.status(500).send('Query 실패');
  }
};

const getPostDetails = async (postId, req, res) => {
  try {
    const conn = await pool.promise().getConnection();
    try {
      const [postResult] = await conn.query(
        `
        SELECT *, DATE_FORMAT(created_date, '%Y년 %m월 %d일 %H시 %i분') AS created_date 
        FROM communitynotice WHERE no = ?
      `,
        [postId]
      );
      const [commentResult] = await conn.query(
        `
        SELECT * FROM comments WHERE board_no = ?
      `,
        [postId]
      );
      res.json({
        post: postResult[0],
        comments: commentResult,
        session: req.session,
      });
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error('서버 오류:', error);
    res.status(500).send('서버 오류');
  }
};

const deletePost = async (postId, req, res, redirectUrl) => {
  try {
    const [results] = await pool.promise().query(`SELECT nickname FROM communitynotice WHERE no = ?`, [postId]);

    if (results.length > 0 && results[0].nickname === req.session.user.nickname) {
      await pool.promise().query(`DELETE FROM communitynotice WHERE no = ?`, [postId]);
      console.log('게시물 삭제 완료');
      res.redirect(redirectUrl);
    } else {
      res.status(403).send('삭제 권한이 없습니다.');
    }
  } catch (error) {
    console.error('쿼리 실행 중 오류 발생: ', error);
    res.status(500).send('내부 서버 오류');
  }
};

const updatePost = async (postId, title, content, date, res, redirectUrl) => {
  try {
    await pool
      .promise()
      .query(`UPDATE communitynotice SET title = ?, content = ?, created_date = ? WHERE no = ?`, [
        title,
        content,
        date,
        postId,
      ]);
    console.log('게시물 수정 완료');
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('쿼리 실행 중 오류 발생: ', error);
    res.status(500).send('내부 서버 오류');
  }
};

// 공지게시판 접속
router.post('/notice', (res) => {
  console.log('Here is notice page');
  getBoardData(res);
});

// 사용자 모드 확인
router.get(`/user-mode`, (req, res) => {
  if (req.session && req.session.user) {
    res.json({ user_mode: req.session.user.user_mode });
  } else {
    res.status(401).send('Not authenticated');
  }
});

// 공지 게시판 글쓰기 창 조회-> 관리자만 접근
router.get('/CommunityWrite', checkAdmin, (req, res) => {
  const { title, content } = req.body;
  const nickname = req.session.user.nickname;
  const createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
  insertBoardData(title, nickname, content, createdDate, res, '/notice');
});

// 공지 게시판 글쓰기 등록-> 관리자만 접근
router.post('/notice/process/new_Post', checkAdmin, (req, res) => {
  const { title, content } = req.body;
  const nickname = req.session.user.nickname;
  const createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
  insertBoardData(title, nickname, content, createdDate, res, '/notice');
});

// 공지게시판 읽기
router.get('/notice/PostView/:no', (req, res) => {
  getPostDetails(req.params.no, req, res);
});

// router.post('/PostView/:no', (req, res) => {
//   getPostDetails(req.params.no, req, res);
// });

// 공지 게시글 삭제
router.post('/notice/Postview/:no/process/delete', checkAdmin, (req, res) =>
  deletePost(req.params.no, req, res, '/notice')
);

// 공지 게시글 수정 load
router.get('/notice/Postview/:no/process/update', checkAdmin, async (req, res, next) => {
  try {
    const [results] = await pool.promise().query('SELECT * FROM communitynotice WHERE no = ?', [req.params.no]);
    if (results.length > 0) {
      const post = results[0];
      if (post.nickname === req.session.user.nickname) {
        next();
      } else {
        res.status(403).send('Not admin');
      }
    } else {
      res.status(404).send('No post');
    }
  } catch (error) {
    console.error('쿼리 실행 중 오류 발생: ', error);
    res.status(500).send('내부 서버 오류');
  }
});

// 공지 게시글 수정 등록
router.post('/notice/PostView/:no/process/update/', checkAdmin, (req, res) => {
  const { title, content, created_date } = req.body;
  updatePost(req.params.no, title, content, created_date || new Date(), res, '/notice');
});

module.exports = router;
