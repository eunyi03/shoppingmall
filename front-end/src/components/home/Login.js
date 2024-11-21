import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import loginUser from '../images/loginuser.png';
import axios from 'axios';

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus(); // 초기 로그인 상태 체크
  }, []);

  const checkLoginStatus = async () => {
    try {
      // 사용자가 로그인한 상태인지 서버에 요청
      const response = await axios.get('/process/check-login', {
        withCredentials: true, // 쿠키를 서버로 전송
      });
      const { loggedIn } = response.data;

      setIsLoggedIn(loggedIn);
    } catch (error) {
      console.error('로그인 상태 확인 중 오류 발생:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('/process/logout', null, {
        withCredentials: true, // 쿠키를 서버로 전송
      });
      if (response.status === 200) {
        setIsLoggedIn(false); // 로그아웃 처리 후 로그인 상태 변경
        navigate('/');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <div className="loginPosition">
      <img className="loginUserImg" src={loginUser} alt=""></img>
      {isLoggedIn ? (
        <>
          <p>환영합니다!</p>
          <button className="mainlogoutBtn" onClick={handleLogout}>
            로그아웃
          </button>
        </>
      ) : (
        <div className="loginPositionBtn">
          <Link to="/Loginpage" className="loginLink">
            <button className="loginBtn">로그인</button>
          </Link>
          <br />
          <Link to="/Signuppage" className="signupLink">
            <button className="signupBtn">회원가입</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Login;
