const express = require("express");
const fetch = require("node-fetch");
const querystring = require("querystring");
const app = express();
const router = express.Router();
const session = require("express-session");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  session({
    key: "session_cookie_name",
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24시간
  })
);

const kakaoClientId = "f81ff82b7f6b4860a73435151afb1404"; // 카카오 앱 키
const kakaoClientSecret = "YOUR_CLIENT_SECRET"; // 카카오 앱 시크릿 (선택 사항)
const redirectUri = "http://localhost:3000";

app.get("/oauth/callback/kakao", async (req, res) => {
  const code = req.query.code;
  try {
    const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: querystring.stringify({
        grant_type: "authorization_code",
        client_id: kakaoClientId,
        client_secret: kakaoClientSecret,
        redirect_uri: redirectUri,
        code: code,
      }),
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = await userResponse.json();

    // 여기서 userData를 사용하여 사용자 정보를 처리합니다.
    // 예: 사용자 세션 생성 또는 JWT 발급

    res.json({ success: true, user: userData });
  } catch (error) {
    console.error("카카오 OAuth 콜백 처리 중 오류 발생:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
