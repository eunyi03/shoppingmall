import React from "react";
import { Link } from "react-router-dom";
import "./Hospital.css";
import arrowImg from "../images/arrow.png";

function Hospital() {
  return (
    <div className="hospitalmainPage">
      <div className="hospitalHeader">
        <h1>
          믿을 수 있는 병원!
          <br />
          신뢰할 수 있는 의사!
        </h1>
      </div>
      <div className="doctorTap">
        <h2>병원A / 김성현 원장</h2>
        <p>서울특별시 중구 필동로</p>
        <Link to="/hospital/HospitalA">
          <img className="arrowIcon" src={arrowImg} alt="병원A로 이동" />
        </Link>
      </div>
      <div className="doctorTap">
        <h2>병원B / 조명기 원장</h2>
        <p>경기도 수원시</p>
        <Link to="/hospital/HospitalB">
          <img className="arrowIcon" src={arrowImg} alt="병원B로 이동" />
        </Link>
      </div>
      <div className="doctorTap">
        <h2>병원C / 이예령 원장</h2>
        <p>평화누리자치도</p>
        <Link to="/hospital/HospitalC">
          <img className="arrowIcon" src={arrowImg} alt="병원C로 이동" />
        </Link>
      </div>
    </div>
  );
}

export default Hospital;
