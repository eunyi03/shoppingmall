// Deal.js
import React, { useState, useEffect } from 'react';
import './Deal.css';
import { useNavigate } from 'react-router-dom';

function Deal() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const navigate = useNavigate();

  useEffect(() => {
    // 여기에 거래 데이터를 가져오는 로직을 추가하세요 (예: API 호출)
    const fetchedItems = [
      { ProductName: '책 A', CategoryID: '도서', SellerID: '판매자1', SellPrice: 8000, Discount: 20, ProductImage: 'path/to/image.jpg', RegisterDate: '2024-11-22' },
      { ProductName: '옷 B', CategoryID: '의류', SellerID: '판매자2', SellPrice: 15000, Discount: 25, ProductImage: 'path/to/image2.jpg', RegisterDate: '2024-11-21' },
      { ProductName: '악세서리 C', CategoryID: '악세서리', SellerID: '판매자3', SellPrice: 4000, Discount: 10, ProductImage: 'path/to/image3.jpg', RegisterDate: '2024-11-20' }
    ];
    setItems(fetchedItems);
  }, []);

  const handleAddProduct = () => {
    navigate('/write');
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredItems = selectedCategory === '전체'
    ? items
    : items.filter(item => item.CategoryID === selectedCategory);

  return (
    <div className="deal-container">
      <h2>거래 내역</h2>
      <div className="top-controls">
        <select className="category-filter" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="전체">전체</option>
          <option value="도서">도서</option>
          <option value="의류">의류</option>
          <option value="악세서리">악세서리</option>
          <option value="기타">기타</option>
        </select>
        <button className="add-product-button" onClick={handleAddProduct}>글쓰기</button>
      </div>
      <div className="deal-list">
        {filteredItems.length === 0 ? (
          <p className="no-items">등록된 거래가 없습니다.</p>
        ) : (
          filteredItems.map((item, index) => (
            <div key={index} className="deal-item">
              <img src={item.ProductImage} alt={item.ProductName} className="deal-image" />
              <div className="deal-info">
                <h3>{item.ProductName}</h3>
                <p>판매자 ID: {item.SellerID}</p>
                <p>판매 가격: {item.SellPrice}원</p>
                <p>할인율: {item.Discount}%</p>
                <p className="deal-date">등록일: {item.RegisterDate}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Deal;
