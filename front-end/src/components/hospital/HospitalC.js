import React, { useEffect } from "react";
import { openChatroomPopup } from "./Chatpopup";
import useUserData from "../useUserData";
import KakaoMapC from "./KakaoMapC.js";

function HospitalC() {
  
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
    const url = `/hospital/HospitalC/${my_id}/to/doctor3`;
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
    const url = `/hospital/HospitalC/${my_id}/reserve/doctor3`;
    const title = "popup";
    const options =
      "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=400,height=500,top=100,left=200";
    window.open(url, title, options);
  };

  return (
    <div>
      <div>병원C</div>
      <div>이예령 원장</div>
      <div>사진</div>
      <div>약력</div>
      <div>지도</div>
      <KakaoMapC />
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

export default HospitalC;
