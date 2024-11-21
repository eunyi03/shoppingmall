import React, { useEffect } from 'react';

const { kakao } = window;

function KakaoMapC() {
  useEffect(() => {
    const markerPosition = new kakao.maps.LatLng(37.5552017841585, 127.15413024352522);

    const container = document.getElementById('map'); // 지도를 표시할 div
    const options = {
      center: markerPosition, // 지도의 중심좌표
      level: 11, // 지도의 확대 레벨
    };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    const map = new kakao.maps.Map(container, options);

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    const iwContent =
      '<div style="width:151px;height:24px;display:flex;justify-content:center;padding-top:4px">병원 C 위치</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      position: markerPosition,
      content: iwContent,
    });

    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(map, marker);
  }, []);

  return <div id="map" style={{ width: '70%', height: '400px' }}></div>;
}

export default KakaoMapC;
