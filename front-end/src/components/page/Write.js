// Write.js
import React, { useState } from 'react';
import './Write.css';
import { useNavigate } from 'react-router-dom';

function Write() {
  const [formData, setFormData] = useState({
    CategoryID: '도서',
    ProductName: '',
    OriginPrice: 0,
    SellPrice: 0,
    ProductImage: null,
    Description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, ProductImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 상품 등록 로직 추가 (예: API 호출)
    console.log('상품 등록:', formData);
    navigate('/');
  };

  return (
    <div className="write-container">
      <h2>거래 글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <select name="CategoryID" value={formData.CategoryID} onChange={handleChange} required>
          <option value="도서">도서</option>
          <option value="의류">의류</option>
          <option value="악세서리">악세서리</option>
          <option value="기타">기타</option>
        </select>
        <input type="text" name="ProductName" placeholder="제품 이름" value={formData.ProductName} onChange={handleChange} required />
        <input type="number" name="OriginPrice" placeholder="원래 가격" value={formData.OriginPrice} onChange={handleChange} required />
        <input type="number" name="SellPrice" placeholder="판매 가격" value={formData.SellPrice} onChange={handleChange} required />
        <input type="file" name="ProductImage" onChange={handleFileChange} required />
        <textarea name="Description" placeholder="제품 설명" value={formData.Description} onChange={handleChange} required></textarea>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}

export default Write;

