import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CRUDHeader from './CRUDHeader';
import CreateComment from '../comments/CreateComment';
import community from '../../images/community.png';
import './CRUD.css';

function ReadJoy() {
  const { no } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // 백엔드에서 게시글과 댓글 목록을 가져옴
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await axios.get(`/joy/PostView/${no}`);
        setPost(postResponse.data.post);

        const commentsResponse = await axios.get(`/joy/comments/${no}`);
        setComments(commentsResponse.data);

        // 이미지 로드
        if (postResponse.data.post.file_data) {
          const imageResponse = await axios.get(`/community/image/${no}`, {
            responseType: 'arraybuffer',
          });
          const base64 = btoa(
            new Uint8Array(imageResponse.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
          );
          setImageSrc(`data:image/jpeg;base64,${base64}`);
        }

        setLoading(false);
      } catch (error) {
        console.error('게시글을 불러오는 중 오류 발생:', error);
        setError('게시글을 불러오는 중 오류 발생');
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [no]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

    if (confirmDelete) {
      try {
        await axios.delete(`/joy/Postview/${no}/process/delete`);
        alert('게시글이 삭제되었습니다.');
        navigate('/joy');
      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert('삭제 권한이 없습니다.');
        } else {
          console.error('게시글 삭제 중 오류 발생:', error);
          alert('게시글 삭제 중 오류가 발생했습니다.');
        }
      }
    }
  };

  const handleCommentSubmit = async () => {
    // 댓글 등록 후 댓글 목록 다시 불러오기
    try {
      const commentsResponse = await axios.get(`/joy/comments/${no}`);
      setComments(commentsResponse.data);
    } catch (error) {
      console.error('댓글 목록을 다시 불러오는 중 오류 발생:', error);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const { title, nickname, created_date, content } = post;

  return (
    <div className="Read_all">
      <div>
        <div className="header_layout">
          <CRUDHeader title="기쁨이 게시판" />
        </div>
        <div className="ReadTitle">{title}</div>
        <div className="infoUpdateDelete">
          <div className="info">
            <div>프사</div>
            <div>{nickname}</div>
            <div>{created_date}</div>
          </div>
          <div className="updateDelete">
            <Link to={`/joy/Postview/${no}/process/update`}>수정</Link>
            <div onClick={handleDelete} style={{ cursor: 'pointer' }}>
              삭제
            </div>
          </div>
        </div>
        <div className="explainText">
          <p>HOPINFO는 서로의 아픔을 공감하고 위로하는 커뮤니티입니다.</p>
          <p>회원들끼리 서로 존중하고, 응원과 조언을 아끼지 않는 자랑스러운 회원이 되도록 합시다.</p>
        </div>
        <div className="ReadContent">
          <p>{content}</p>
          {imageSrc && <img src={imageSrc} alt="Post" />}
        </div>
        <div className="commontLogo">
          <img src={community} alt="커뮤니티 로고" width={27} height={26} />
          <div>댓글</div>
        </div>
        <div>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="comment_all" key={comment.comment_no}>
                <div>
                  <div>프사</div>
                </div>
                <div>
                  <div className="commentNickname">{comment.nickname}</div>
                  <div>{comment.content}</div>
                  <div className="commentDate">{comment.created_date}</div>
                </div>
              </div>
            ))
          ) : (
            <div>댓글이 없습니다.</div>
          )}
        </div>
        <div>
          <div>내 닉네임</div>
          <CreateComment postId={no} onCommentSubmit={handleCommentSubmit} />
        </div>
      </div>
    </div>
  );
}

export default ReadJoy;
