import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Loginpage.css";
import axios from "axios";

function Loginpage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/loginpage/process/login", {
        id,
        password,
      });
      const data = response.data;

      if (data.success) {
        alert("로그인 성공!");
        navigate("/"); // 로그인 성공 시 메인페이지 이동
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      alert("로그인 요청 중 오류가 발생했습니다.");
    }
  };

  const handleKakaoLogin = () => {
    const REST_API_KEY = "f4dfb2e0ef054a0117ea1b187b8a8eb5"; // 카카오 앱 키
    const REDIRECT_URI = "http://localhost:3000";
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="loginPage">
      <h1>로그인</h1>
      <form className="loginPagecontent" onSubmit={handleSubmit}>
        <div className="textBox">
          <input
            type="text"
            name="id"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btnContent">
          <button type="submit" className="loginpageBtn">
            로그인
          </button>
          <button className="signuppageBtn">
            <Link to="/Signuppage" className="signupLink">
              회원가입
            </Link>
          </button>
          <button type="button" className="kakaoBtn" onClick={handleKakaoLogin}>
            카카오 계정으로 로그인
          </button>
        </div>
      </form>
    </div>
  );
}

export default Loginpage;
