// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import axios from 'axios';

// import TitleBodyCommunity from './element/TitleBodyCommunity.js';
// import SelectButtonCommunity from './element/SelectButtonCommunity.js';
// import ListCommunity from './element/ListCommunity.js';
// import ColumnListCommunity from './element/ColumnListCommunity.js';
// import RowListCommunity from './element/RowListCommunity.js';
// import CreateButtonCommunity from './element/CreateButtonCommunity.js';
// import PaginationCustom from './element/PaginationCustom.js';

// import './Community.css';

// const JoyCommunity = () => {
//   const [dataList, setDataList] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 10;
//   const location = useLocation();

//   const fetchData = async () => {
//     try {
//       // 백엔드에서 게시글 목록을 가져옴
//       const response = await axios.post(`/joy`);
//       console.log('응답 데이터:', response.data); // 응답 데이터 출력
//       setDataList(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error('There was an error fetching the posts!', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (location.state && location.state.newPost) {
//       console.log('새 게시글 추가:', location.state.newPost);
//       setDataList((prevDataList) => [location.state.newPost, ...prevDataList]);
//     }
//   }, [location.state]);

//   const getNextNo = () => {
//     return dataList.length > 0 ? Math.max(...dataList.map((post) => post.no)) + 1 : 1;
//   };

//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = dataList.slice(indexOfFirstPost, indexOfLastPost);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="CommunityAll_layout">
//       <div className="CommunityTop_layout">
//         <TitleBodyCommunity title="기쁨이" body="본인의 챌린지 및 치료 후기를 적어주세요!" />
//         <div className="SelectButtonCommunity_layout">
//           <SelectButtonCommunity />
//         </div>
//       </div>
//       <ListCommunity headersName={['제목', '작성자', '작성일']}>
//         {currentPosts.length > 0 ? (
//           currentPosts.map((item, index) => (
//             <RowListCommunity key={index}>
//               <ColumnListCommunity>
//                 <Link to={`/joy/PostView/${item.no}`} style={{ textDecoration: 'none' }}>
//                   <div className="List_title">{item.title}</div>
//                 </Link>
//               </ColumnListCommunity>
//               <ColumnListCommunity>{item.nickname}</ColumnListCommunity>
//               <ColumnListCommunity>{item.created_date}</ColumnListCommunity>
//             </RowListCommunity>
//           ))
//         ) : (
//           <div>게시글이 없습니다.</div>
//         )}
//       </ListCommunity>
//       <CreateButtonCommunity emotion="joy" nextNo={getNextNo()} />
//       <div className="PaginationCustom">
//         <PaginationCustom
//           currentPage={currentPage}
//           totalPages={Math.ceil(dataList.length / postsPerPage)}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default JoyCommunity;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import TitleBodyCommunity from './element/TitleBodyCommunity.js';
import SelectButtonCommunity from './element/SelectButtonCommunity.js';
import ListCommunity from './element/ListCommunity.js';
import ColumnListCommunity from './element/ColumnListCommunity.js';
import RowListCommunity from './element/RowListCommunity.js';
import CreateButtonCommunity from './element/CreateButtonCommunity.js';
import PaginationCustom from './element/PaginationCustom.js';

import './Community.css';

const JoyCommunity = () => {
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const postsPerPage = 10;
  const location = useLocation();

  const fetchData = async (keyword = '') => {
    try {
      const endpoint = keyword ? `/joy/search?keyword=${encodeURIComponent(keyword)}` : '/joy';
      const response = await axios.get(endpoint);
      console.log('응답 데이터:', response.data);
      setDataList(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('There was an error fetching the posts!', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.state && location.state.newPost) {
      console.log('새 게시글 추가:', location.state.newPost);
      setDataList((prevDataList) => [location.state.newPost, ...prevDataList]);
    }
  }, [location.state]);

  const getNextNo = () => {
    return dataList.length > 0 ? Math.max(...dataList.map((post) => post.no)) + 1 : 1;
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataList.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(searchKeyword);
  };

  return (
    <div className="CommunityAll_layout">
      <div className="CommunityTop_layout">
        <TitleBodyCommunity title="기쁨이" body="본인의 챌린지 및 치료 후기를 적어주세요!" />
        <div className="SelectButtonCommunity_layout">
          <SelectButtonCommunity />
        </div>
        <form onSubmit={handleSearch} className="SearchForm">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <button type="submit">검색</button>
        </form>
      </div>
      <ListCommunity headersName={['제목', '작성자', '작성일']}>
        {currentPosts.length > 0 ? (
          currentPosts.map((item, index) => (
            <RowListCommunity key={index}>
              <ColumnListCommunity>
                <Link to={`/joy/PostView/${item.no}`} style={{ textDecoration: 'none' }}>
                  <div className="List_title">{item.title}</div>
                </Link>
              </ColumnListCommunity>
              <ColumnListCommunity>{item.nickname}</ColumnListCommunity>
              <ColumnListCommunity>{item.created_date}</ColumnListCommunity>
            </RowListCommunity>
          ))
        ) : (
          <div>게시글이 없습니다.</div>
        )}
      </ListCommunity>
      <CreateButtonCommunity emotion="joy" nextNo={getNextNo()} />
      <div className="PaginationCustom">
        <PaginationCustom
          currentPage={currentPage}
          totalPages={Math.ceil(dataList.length / postsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default JoyCommunity;
