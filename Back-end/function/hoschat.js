// 1:1 상담

const express = require("express");
const mysql = require("mysql");
const db_config = require("../config/db_config.json");
const router = express.Router();
const Arouter = express.Router();
const Brouter = express.Router();
const Crouter = express.Router();
const pool = mysql.createPool({
  connectionLimit: 10,
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  port: db_config.port,
  debug: false,
});

router.use("/Hospital", router);
router.use("/HospitalA", Arouter);
router.use("/HospitalB", Brouter);
router.use("/HospitalC", Crouter);

// 채팅 목록 -> A,B,C 전부 적용
Arouter.post("/HospitalA", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("로그인이 필요합니다.");
  }
  const currentUserID = req.session.user.id;
  pool.query(
    "SELECT id, nickname, state FROM users WHERE id != ?",
    [currentUserID],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("서버 오류");
      } else {
        console.log(results);
        res.json(results);
      }
    }
  );
});

Brouter.post("/HospitalB", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("로그인이 필요합니다.");
  }
  const currentUserID = req.session.user.id;
  pool.query(
    "SELECT id, nickname, state FROM users WHERE id != ?",
    [currentUserID],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("서버 오류");
      } else {
        console.log(results); // 응답 데이터 확인을 위한 로그 추가
        res.json(results);
      }
    }
  );
});

Crouter.post("/HospitalC", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("로그인이 필요합니다.");
  }
  const currentUserID = req.session.user.id;
  pool.query(
    "SELECT id, nickname, state FROM users WHERE id != ?",
    [currentUserID],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("서버 오류");
      } else {
        console.log(results); // 응답 데이터 확인을 위한 로그 추가
        res.json(results);
      }
    }
  );
});

// 채팅방 메시지 조회 (GET)
Arouter.get("/HospitalA/:my_id/tor/:doctor_id/hoschat", (req, res) => {
  const { my_id, doctor_id } = req.params;
  const currentUserID = req.session.user.id;

  if (currentUserID != my_id) {
    return res.status(403).send("Forbidden");
  }

  pool.query(
    "SELECT * FROM hoschat WHERE (sender_id = ? AND receiver_id = ?)",
    [my_id, doctor_id],
    (error, results) => {
      if (error) {
        console.error("Error fetching hoschat:", error);
        return res.status(500).send("서버 오류");
      }
      res.json(results);
    }
  );
});

Brouter.get("/HospitalB/:my_id/tor/:doctor_id/hoschat", (req, res) => {
  const { my_id, doctor_id } = req.params;
  const currentUserID = req.session.user.id;

  if (currentUserID != my_id) {
    return res.status(403).send("Forbidden");
  }

  pool.query(
    "SELECT * FROM hoschat WHERE (sender_id = ? AND receiver_id = ?)",
    [my_id, doctor_id],
    (error, results) => {
      if (error) {
        console.error("Error fetching hoschat:", error);
        return res.status(500).send("서버 오류");
      }
      res.json(results);
    }
  );
});

Crouter.get("/HospitalC/:my_id/tor/:doctor_id/hoschat", (req, res) => {
  const { my_id, doctor_id } = req.params;
  const currentUserID = req.session.user.id;

  if (currentUserID != my_id) {
    return res.status(403).send("Forbidden");
  }

  pool.query(
    "SELECT * FROM hoschat WHERE (sender_id = ? AND receiver_id = ?)",
    [my_id, doctor_id],
    (error, results) => {
      if (error) {
        console.error("Error fetching hoschat:", error);
        return res.status(500).send("서버 오류");
      }
      res.json(results);
    }
  );
});

// 새로운 메시지 전송 (POST)
Arouter.post("/:my_id/tor/:doctor_id/hoschat", (req, res) => {
  const { my_id, doctor_id } = req.params;
  const { receiver_id, content } = req.body;
  const session_id = req.session.user.id;

  if (session_id != my_id || receiver_id != doctor_id) {
    return res.status(403).send("Forbidden");
  }

  pool.query(
    "INSERT INTO hoschat (sender_id, receiver_id, content) VALUES (?, ?, ?)",
    [my_id, doctor_id, content],
    (error, results) => {
      if (error) {
        console.error("Message save error:", error);
        return res.status(500).send("서버 오류");
      }
      // 두 번째 쿼리를 수행하고, 모든 쿼리가 성공하면 응답을 보냅니다.
      pool.query(
        "INSERT INTO hoschat (sender_id, receiver_id, content) VALUES (?, ?, ?)",
        [my_id, doctor_id, content],
        (error, results) => {
          if (error) {
            console.error("Message save error:", error);
            return res.status(500).send("서버 오류");
          }
          res.status(201).send("메시지 전송 성공");
        }
      );
    }
  );
});

Brouter.post("/:my_id/tor/:doctor_id/hoschat", (req, res) => {
  const { my_id, doctor_id } = req.params;
  const { receiver_id, content } = req.body;
  const session_id = req.session.user.id;

  if (session_id != my_id || receiver_id != doctor_id) {
    return res.status(403).send("Forbidden");
  }

  pool.query(
    "INSERT INTO hoschat (sender_id, receiver_id, content) VALUES (?, ?, ?)",
    [my_id, doctor_id, content],
    (error, results) => {
      if (error) {
        console.error("Message save error:", error);
        return res.status(500).send("서버 오류");
      }
      // 두 번째 쿼리를 수행하고, 모든 쿼리가 성공하면 응답을 보냅니다.
      pool.query(
        "INSERT INTO hoschat (sender_id, receiver_id, content) VALUES (?, ?, ?)",
        [my_id, doctor_id, content],
        (error, results) => {
          if (error) {
            console.error("Message save error:", error);
            return res.status(500).send("서버 오류");
          }
          res.status(201).send("메시지 전송 성공");
        }
      );
    }
  );
});

Crouter.post("/:my_id/tor/:doctor_id/hoschat", (req, res) => {
  const { my_id, doctor_id } = req.params;
  const { receiver_id, content } = req.body;
  const session_id = req.session.user.id;

  if (session_id != my_id || receiver_id != doctor_id) {
    return res.status(403).send("Forbidden");
  }

  pool.query(
    "INSERT INTO hoschat (sender_id, receiver_id, content) VALUES (?, ?, ?)",
    [my_id, doctor_id, content],
    (error, results) => {
      if (error) {
        console.error("Message save error:", error);
        return res.status(500).send("서버 오류");
      }
      // 두 번째 쿼리를 수행하고, 모든 쿼리가 성공하면 응답을 보냅니다.
      pool.query(
        "INSERT INTO hoschat (sender_id, receiver_id, content) VALUES (?, ?, ?)",
        [my_id, doctor_id, content],
        (error, results) => {
          if (error) {
            console.error("Message save error:", error);
            return res.status(500).send("서버 오류");
          }
          res.status(201).send("메시지 전송 성공");
        }
      );
    }
  );
});

module.exports = router;
