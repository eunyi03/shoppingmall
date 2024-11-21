import React, { useState, useEffect } from 'react';
import './Mypage.css';
import { useNavigate } from 'react-router-dom';
import useUserData from '../useUserData';
import mypageUser from '../images/mypageuser.png';
import anxietyImg from '../images/anxiety.png';
import fearImg from '../images/fear.png';
import sadnessImg from '../images/sadness.png';
import Select from 'react-select';
import axios from 'axios';

function Mypage() {
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    usernickname,
    birth,
    gender,
    userId,
    password,
    state,
    setFirstName,
    setLastName,
    setUsernickname,
    setBirth,
    setGender,
    setUserId,
    setPassword,
    setState,
    handleSave,
    fetchUserData,
  } = useUserData();
  const [profileImage, setProfileImage] = useState(mypageUser);

  useEffect(() => {
    // useUserData.js에서 제공하는 fetchUserData를 호출하여 초기 데이터를 불러옴
    fetchUserData();
  }, []);

  useEffect(() => {
    //상태에 따라 프로필 이미지 자동 설정
    setProfileImage(getProfileImage(state));
  }, [state]);

  const genderOptions = [
    { value: '남성', label: '남성' },
    { value: '여성', label: '여성' },
  ];

  const stateOptions = [
    { value: '우울', label: '저는 지금 우울해요' },
    { value: '불안', label: '저는 지금 불안해요' },
    { value: '강박', label: '저는 지금 강박이 있어요' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'usernickname':
        setUsernickname(value);
        break;
      case 'birth':
        setBirth(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleGenderChange = (selectedOption) => {
    setGender(selectedOption ? selectedOption.value : '');
  };

  const handleStateChange = (selectedOption) => {
    const selectedState = selectedOption ? selectedOption.value : '';
    setState(selectedState);
    setProfileImage(getProfileImage(selectedState));
  };

  const getProfileImage = (state) => {
    switch (state) {
      case '우울':
        return sadnessImg;
      case '불안':
        return anxietyImg;
      case '강박':
        return fearImg;
      default:
        return mypageUser;
    }
  };

  const handleSaveWrapper = async (e) => {
    e.preventDefault();
    await handleSave();
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        '/process/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('로그아웃 되었습니다.');
        navigate('/'); // 로그아웃 후 메인 페이지로 이동하기
      } else {
        throw new Error('로그아웃에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('로그아웃 도중 오류 발생:', error);
      alert('로그아웃 도중 오류가 발생했습니다.');
    }
  };

  const customSelectStyles1 = {
    control: (provided) => ({
      ...provided,
      width: '420px',
      height: '25px',
      border: '2px solid #b6bec6',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: '400',
      color: '#787878',
      paddingLeft: '4.5%',
      paddingBottom: '12%',
    }),
    menu: (provided) => ({
      ...provided,
      width: '420px',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
  };

  const customSelectStyles2 = {
    control: (provided) => ({
      ...provided,
      width: '870px',
      height: '45px',
      border: '2px solid #b6bec6',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: '400',
      color: '#787878',
      paddingLeft: '2%',
    }),
    menu: (provided) => ({
      ...provided,
      width: '870px',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
  };

  return (
    <div className="myPage">
      <div>
        <form onSubmit={handleSaveWrapper} className="userProfileForm">
          {/* 첫 번째 컴포넌트 : 이미지 업로드/제거 */}
          <div className="userProfileContainer">
            <div className="userProfile">
              <img className="mypageImg" src={profileImage} alt="프로필 이미지"></img>
              <div className="userProfileBtn">
                {/* <button type="button" className="imgUplode">
                  이미지 업로드
                </button>
                <button type="button" className="imgDelete">
                  이미지 제거
                </button> */}
              </div>
            </div>
            {/* 두 번째 컴포넌트 */}
            <div className="userProfileInfo">
              <div className="userProfileName">
                <p>
                  <div className="flexLayout">
                    이름
                    <input
                      type="text"
                      name="lastName"
                      placeholder="이름"
                      value={lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flexLayout">
                    성{' '}
                    <input
                      type="text"
                      name="firstName"
                      placeholder="성"
                      value={firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                </p>
              </div>
              <p>
                <div className="userProfileNickname">
                  <div className="flexLayout">
                    닉네임
                    <input
                      type="text"
                      name="usernickname"
                      placeholder="닉네임"
                      value={usernickname}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </p>
            </div>
          </div>
          {/* 세 번째 컴포넌트 */}
          <div className="userProfileAdditionalInfo centered">
            <div className="additional12">
              <div className="additional1">
                <p className="a_id">
                  아이디 <input type="text" placeholder="아이디" value={userId} disabled />
                </p>
                {/* 아이디 수정 불가능 */}
                <p className="a_birth">
                  생년월일
                  <input
                    type="text"
                    name="birth"
                    placeholder="생년월일(ex. 20240713)"
                    value={birth}
                    onChange={handleInputChange}
                  />
                </p>
              </div>
              <div className="additional2">
                <p className="a_pw">
                  비밀번호
                  <input
                    type="text"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </p>
                <p className="a_gender">
                  성별
                  <Select
                    className="genderAlt"
                    options={genderOptions}
                    value={genderOptions.find((option) => option.value === gender)}
                    onChange={handleGenderChange}
                    placeholder="성별"
                    styles={customSelectStyles1}
                    isClearable
                  />
                </p>
              </div>
            </div>
            <p>
              <div className="additional3">
                지금 상태는{' '}
                <Select
                  className="stateAlt"
                  options={stateOptions}
                  value={stateOptions.find((option) => option.value === state)}
                  onChange={handleStateChange}
                  placeholder="나의 상태는 ~입니다."
                  styles={customSelectStyles2}
                  isClearable
                />
              </div>
            </p>
          </div>
          {/* 네 번째 컴포넌트 */}
          <div className="centered">
            <button type="submit" className="saveBtn">
              저장
            </button>
            <button type="button" className="logoutBtn" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Mypage;
