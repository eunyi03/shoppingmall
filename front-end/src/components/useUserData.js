import { useState, useEffect } from "react";
import axios from "axios";
import sadnessImg from "./images/sadness.png";
import anxietyImg from "./images/anxiety.png";
import fearImg from "./images/fear.png";
import mypageUser from "./images/mypageuser.png";

const useUserData = (initialData = {}) => {
  const [firstName, setFirstName] = useState(initialData.firstName || "");
  const [lastName, setLastName] = useState(initialData.lastName || "");
  const [usernickname, setUsernickname] = useState(
    initialData.usernickname || ""
  );
  const [birth, setBirth] = useState(initialData.birth || "");
  const [gender, setGender] = useState(initialData.gender || "");
  const [userId, setUserId] = useState(initialData.userId || "");
  const [password, setPassword] = useState(initialData.password || "");
  const [state, setState] = useState(initialData.state || "");
  const [roomid, setroomid] = useState(initialData.roomid || "");
  const [profileImage, setProfileImage] = useState(mypageUser); // 프로필 이미지 초기값 : mypageUser로 설정해둠

  const fetchUserData = async () => {
    try {
      // 사용자가 로그인한 후 호출 (유저정보 가져오기)
      const response = await axios.post("/mypage");
      const userData = response.data;

      setFirstName(userData.Lastname || "");
      setLastName(userData.Firstname || "");
      setUsernickname(userData.nickname || "");
      setBirth(userData.birth || "");
      setGender(userData.gender || "");
      setUserId(userData.id || ""); // 아이디 값 변경 불가
      setPassword(userData.password || "");
      setState(userData.state || "");
      setroomid(userData.roomid || "");
      setProfileImage(getProfileImage(userData.state));
    } catch (error) {
      console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
    }
    try {
      // 사용자가 로그인한 후 호출 (유저정보 가져오기)
      const response = await axios.post("/process/hospital");
      const userData = response.data;
      setUsernickname(userData.nickname || "");
      setUserId(userData.id || ""); // 아이디 값 변경 불가
    } catch (error) {
      console.error(
        "/hospital에서 사용자 데이터를 가져오는 중 오류 발생:",
        error
      );
    }
  };

  const getProfileImage = (state) => {
    switch (state) {
      case "우울":
        return sadnessImg;
      case "불안":
        return anxietyImg;
      case "강박":
        return fearImg;
      default:
        return mypageUser;
    }
  };

  // 초기 유저정보 가져옴
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const updateData = {
        lastName,
        firstName,
        gender,
        birth,
        nickname: usernickname,
        id: userId,
        password,
        roomid,
        state,
      };

      // 정보 수정 시 데이터 전달 경로
      console.log("Sending update data:", updateData);
      const response = await axios.post("/mypage/process/update", updateData);

      if (response.status === 200) {
        alert("변경사항이 저장되었습니다.");
      } else {
        fetchUserData(); // 변경사항 저장 후 유저정보를 다시 불러옴
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("변경사항을 저장하는 데 오류가 발생했습니다:", error);
      alert("변경사항을 저장하는 데 오류가 발생했습니다.");
    }
  };

  return {
    firstName,
    lastName,
    usernickname,
    birth,
    gender,
    userId,
    password,
    roomid,
    state,
    profileImage,
    setFirstName,
    setLastName,
    setUsernickname,
    setBirth,
    setGender,
    setUserId,
    setPassword,
    setroomid,
    setState,
    setProfileImage,
    handleSave,
    fetchUserData,
  };
};

export default useUserData;
