// const express = require("express");
// const mysql = require("mysql");
// const moment = require("moment");
// const multer = require("multer");
// const db_config = require('../config/db_config.json');
// const router = express.Router();

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: db_config.host,
//   user: db_config.user,
//   password: db_config.password,
//   database: db_config.database,
//   port: db_config.port,
//   debug: false,
// });

// // multer 설정
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 20 * 1024 * 1024 }, // 파일 크기 제한 20MB
// });

// // 로그인 상태 확인 미들웨어
// const checkLogin = (req, res, next) => {
//   const user = req.session?.user;
//   if (!user || !user.CustomerID) {
//     return res.status(401).send("로그인이 필요합니다.");
//   }
//   next();
// };

// // 상품 등록
// router.post("/register", checkLogin, upload.single("ProductImage"), (req, res) => {
//   const {
//     CategoryID,
//     ProductName,
//     OriginPrice,
//     SellPrice,
//     Description,
//   } = req.body;

//   // 로그인된 사용자의 ID 가져오기
//   const SellerID = req.session.user.CustomerID; // 세션에서 로그인 사용자 ID
//   const ProductID = `prod_${Date.now()}`;
//   const Discount = Math.round(((OriginPrice - SellPrice) / OriginPrice) * 100);
//   const ProductImage = req.file ? req.file.buffer : null;
//   const Status = "거래중";

//   const query = `
//     INSERT INTO Products (
//       ProductID, SellerID, CategoryID, ProductName, 
//       OriginPrice, Discount, SellPrice, ProductImage, 
//       Description, Status, RegisterDate
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//   `;

//   pool.query(
//     query,
//     [
//       ProductID,
//       SellerID,
//       CategoryID,
//       ProductName,
//       OriginPrice,
//       Discount,
//       SellPrice,
//       ProductImage,
//       Description,
//       Status,
//       moment().format("YYYY-MM-DD HH:mm:ss"),
//     ],
//     (error) => {
//       if (error) {
//         console.error("상품 등록 오류:", error);
//         return res.status(500).json({ error: "상품 등록 오류" });
//       }

//       res.status(201).json({ message: "상품이 성공적으로 등록되었습니다." });
//     }
//   );
// });

// // 상품 목록 가져오기
// router.get("/list", (req, res) => {
//   const query = `
//     SELECT 
//       p.ProductID,
//       p.ProductName,
//       c.CustomerNickname AS SellerNickname,
//       p.SellPrice,
//       p.Discount,
//       p.RegisterDate,
//       p.Status
//     FROM Products p
//     JOIN Customers c ON p.SellerID = c.CustomerID
//     ORDER BY p.RegisterDate DESC;
//   `;

//   pool.query(query, (error, results) => {
//     if (error) {
//       console.error("상품 목록 조회 오류:", error);
//       return res.status(500).json({ error: "상품 목록 조회 오류" });
//     }

//     const products = results.map((product) => ({
//       ...product,
//       ProductImageURL: `/products/image/${product.ProductID}`,
//     }));

//     res.json(products);
//   });
// });

// module.exports = router;

// const express = require("express");
// const mysql = require("mysql");
// const moment = require("moment");
// const multer = require("multer");
// const db_config = require("../config/db_config.json");
// const router = express.Router();

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: db_config.host,
//   user: db_config.user,
//   password: db_config.password,
//   database: db_config.database,
//   port: db_config.port,
//   debug: false,
// });

// // multer 설정
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 20 * 1024 * 1024 },
// });

// // 로그인 상태 확인 미들웨어
// const checkLogin = (req, res, next) => {
//   const user = req.session?.user;
//   if (!user || !user.CustomerID) {
//     return res.status(401).send("로그인이 필요합니다.");
//   }
//   next();
// };

// // 상품 등록
// router.post("/register", checkLogin, upload.single("ProductImage"), (req, res) => {
//   const { CategoryID, ProductName, OriginPrice, SellPrice, Description } = req.body;
//   const SellerID = req.session.user.CustomerID;
//   const ProductID = `prod_${Date.now()}`;
//   const Discount = Math.round(((OriginPrice - SellPrice) / OriginPrice) * 100);
//   const ProductImage = req.file ? req.file.buffer : null;
//   const Status = "거래중";

//   const query = `
//     INSERT INTO Products (
//       ProductID, SellerID, CategoryID, ProductName, 
//       OriginPrice, Discount, SellPrice, ProductImage, 
//       Description, Status, RegisterDate
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//   `;

//   pool.query(
//     query,
//     [
//       ProductID,
//       SellerID,
//       CategoryID,
//       ProductName,
//       OriginPrice,
//       Discount,
//       SellPrice,
//       ProductImage,
//       Description,
//       Status,
//       moment().format("YYYY-MM-DD HH:mm:ss"),
//     ],
//     (error) => {
//       if (error) {
//         console.error("상품 등록 오류:", error);
//         return res.status(500).json({ error: "상품 등록 오류" });
//       }

//       res.status(201).json({ message: "상품이 성공적으로 등록되었습니다." });
//     }
//   );
// });

// // 상품 목록 조회
// router.get("/list", (req, res) => {
//   const query = `
//     SELECT 
//       p.ProductID,
//       p.ProductName,
//       c.CustomerNickname AS SellerNickname,
//       p.SellPrice,
//       p.Discount,
//       p.RegisterDate,
//       p.Status
//     FROM Products p
//     JOIN Customers c ON p.SellerID = c.CustomerID
//     ORDER BY p.RegisterDate DESC;
//   `;

//   pool.query(query, (error, results) => {
//     if (error) {
//       console.error("상품 목록 조회 오류:", error);
//       return res.status(500).json({ error: "상품 목록 조회 오류" });
//     }

//     const products = results.map((product) => ({
//       ...product,
//       ProductImageURL: `/products/image/${product.ProductID}`,
//     }));

//     res.json(products);
//   });
// });

// // 상품 이미지 서빙
// router.get("/image/:productId", (req, res) => {
//   const productId = req.params.productId;

//   pool.query(
//     "SELECT ProductImage FROM Products WHERE ProductID = ?",
//     [productId],
//     (error, results) => {
//       if (error) {
//         console.error("이미지 서빙 오류:", error);
//         return res.status(500).json({ error: "이미지 서빙 오류" });
//       }

//       if (results.length === 0 || !results[0].ProductImage) {
//         return res.status(404).json({ error: "이미지를 찾을 수 없습니다." });
//       }

//       res.writeHead(200, { "Content-Type": "image/jpeg" });
//       res.end(results[0].ProductImage);
//     }
//   );
// });

// module.exports = router;

const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const moment = require("moment");
const db_config = require("../config/db_config.json");

const router = express.Router();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  port: db_config.port,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 20 * 1024 * 1024 } });


const checkLogin = (req, res, next) => {
    console.log("세션 상태:", req.session); // 디버깅용
    const user = req.session?.user;
    if (!user || !user.CustomerID) {
      return res.status(401).send("로그인이 필요합니다.");
    }
    next();
  };

// 상품 등록
router.post("/register", checkLogin, upload.single("ProductImage"), (req, res) => {
  const { CategoryID, ProductName, OriginPrice, SellPrice, Description } = req.body;
  const SellerID = req.session.user.CustomerID;
  const ProductID = `prod_${Date.now()}`;
  const Discount = Math.round(((OriginPrice - SellPrice) / OriginPrice) * 100);
  const ProductImage = req.file ? req.file.buffer : null;

  const query = `
    INSERT INTO Products (ProductID, SellerID, CategoryID, ProductName, OriginPrice, Discount, SellPrice, ProductImage, Description, Status, RegisterDate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "거래중", ?);
  `;

  pool.query(
    query,
    [ProductID, SellerID, CategoryID, ProductName, OriginPrice, Discount, SellPrice, ProductImage, Description, moment().format("YYYY-MM-DD HH:mm:ss")],
    (error) => {
      if (error) {
        console.error("상품 등록 오류:", error);
        return res.status(500).json({ error: "상품 등록 오류" });
      }
      res.status(201).json({ message: "상품이 성공적으로 등록되었습니다." });
    }
  );
});

// // 상품 목록 조회
// router.get("/list", (req, res) => {
//   const query = `
//     SELECT 
//       p.ProductID, p.ProductName, c.CustomerNickname AS SellerNickname, 
//       p.SellPrice, p.Discount, p.RegisterDate, p.Status
//     FROM Products p
//     JOIN Customers c ON p.SellerID = c.CustomerID
//     ORDER BY p.RegisterDate DESC;
//   `;

//   pool.query(query, (error, results) => {
//     if (error) {
//       console.error("상품 목록 조회 오류:", error);
//       return res.status(500).json({ error: "상품 목록 조회 오류" });
//     }

//     const products = results.map((product) => ({
//       ...product,
//       ProductImageURL: `/products/image/${product.ProductID}`,
//     }));

//     res.json(products);
//   });
// });
router.get("/list", (req, res) => {
    const category = req.query.category;
  
    let query = `
      SELECT 
        p.ProductID, p.ProductName, c.CustomerNickname AS SellerNickname, 
        p.SellPrice, p.Discount, p.RegisterDate, p.Status, p.CategoryID
      FROM Products p
      JOIN Customers c ON p.SellerID = c.CustomerID
    `;
  
    const queryParams = [];
  
    if (category && category !== "전체") {
      query += " WHERE p.CategoryID = ?";
      queryParams.push(category);
    }
  
    query += " ORDER BY p.RegisterDate DESC;";
  
    pool.query(query, queryParams, (error, results) => {
      if (error) {
        console.error("상품 목록 조회 오류:", error);
        return res.status(500).json({ error: "상품 목록 조회 오류" });
      }
  
      const products = results.map((product) => ({
        ...product,
        ProductImageURL: `/products/image/${product.ProductID}`,
      }));
  
      res.json(products);
    });
  });

// 상품 이미지 서빙
router.get("/image/:productId", (req, res) => {
  const productId = req.params.productId;

  pool.query("SELECT ProductImage FROM Products WHERE ProductID = ?", [productId], (error, results) => {
    if (error) {
      console.error("이미지 서빙 오류:", error);
      return res.status(500).json({ error: "이미지 서빙 오류" });
    }

    if (results.length === 0 || !results[0].ProductImage) {
        return res.status(404).send("이미지를 찾을 수 없습니다.");
      }
  
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(results[0].ProductImage);
    });
  });
  
  module.exports = router;