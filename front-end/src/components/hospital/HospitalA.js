import React, { useEffect } from "react";
import { openChatroomPopup } from "./Chatpopup";
import useUserData from "../useUserData";
import KakaoMapA from "./KakaoMapA.js";

function HospitalA() {
  const { userId, fetchUserData } = useUserData();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleOnlineConsultation = (id) => {
    const my_id = id;
    if (!my_id) {
      console.error("My Room ID is not defined");
      return;
    }

    // 팝업 url 여기서 설정 후 불러와야함
    const url = `/hospital/HospitalA/${my_id}/to/doctor1`;
    const title = "popup";
    const options =
      "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=400,height=500,top=100,left=200";
    window.open(url, title, options);
  };

  const handleReservation = (id) => {
    const my_id = id;
    if (!my_id) {
      console.error("My Room ID is not defined");
      return;
    }

    // 팝업 url 여기서 설정 후 불러와야함
    const url = `/hospital/HospitalA/${my_id}/reserve/doctor1`;
    const title = "popup";
    const options =
      "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=400,height=500,top=100,left=200";
    window.open(url, title, options);
  };

  return (
    <div>
      <div>병원A</div>
      <div>김성현 원장</div>
      <div>사진</div>
      <div>약력</div>
      <div>지도</div>
      <KakaoMapA />
      <div>
        <button
          type="submit"
          className="onlineBtn"
          onClick={() => handleOnlineConsultation(userId)}
        >
          1:1 온라인 상담 예약
        </button>
        <button
          type="submit"
          className="offlineBtn"
          onClick={() => handleReservation(userId)}
        >
          대면 상담 예약
        </button>
      </div>
    </div>
  );
}

export default HospitalA;
