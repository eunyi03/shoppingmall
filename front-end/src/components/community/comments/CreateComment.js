import React, { useState } from 'react';
import axios from 'axios';

function CreateComment({ postId, onCommentSubmit }) {
  const [content, setContent] = useState('');

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newComment = {
      content,
    };

    try {
      await axios.post(`/joy/PostView/${postId}/comments`, newComment, { withCredentials: true });
      onCommentSubmit(); // 댓글 등록 후 부모 컴포넌트에 콜백 호출
      setContent(''); // 입력창 초기화
    } catch (error) {
      console.error('댓글 작성 중 오류 발생:', error);
      alert('댓글을 작성하는 도중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          className="commentInput"
          name="content"
          placeholder="댓글을 남겨보세요"
          value={content}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <input type="submit" value="등록"></input>
      </div>
    </form>
  );
}

export default CreateComment;
