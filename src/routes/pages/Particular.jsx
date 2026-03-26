
import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
import Kakaomap from '../../components/Kakaomap';
import { Heart, ChevronLeft, Share2, MoreHorizontal } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import './Particular.css';
import Chat from './Chat';

export default function ProductPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [liked, setLiked] = useState(false);
  const token = localStorage.getItem('token');








  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const isMouseDown = useRef(false);





  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    handleSwipe(touchStartX.current, touchEndX);
  };
  const handleMouseDown = (e) => {
    isMouseDown.current = true;
    touchStartX.current = e.clientX;
  };
  const handleMouseUp = (e) => {
    if (!isMouseDown.current) return;
    isMouseDown.current = false;
    handleSwipe(touchStartX.current, e.clientX);
  };
  const handleSwipe = (start, end) => {
    const delta = start - end;
    if (delta > 50) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (delta < -50) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };




  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(`http://113.198.229.158:8880/board/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("서버 응답 실패");

      const jsonData = await res.json(); // ⬅️ 응답을 JSON으로 파싱

      setData(jsonData);

      const imageArray = Array.isArray(jsonData.image)
        ? jsonData.image
        : jsonData.image
        ? [jsonData.image]
        : [];

      setImages(imageArray);
    } catch (err) {
      setError(err.message);
    }
  };

  fetchData();
}, [id]);


  if (error) return <div>에러 발생: {error}</div>;
  if (!data) return <div>로딩 중...</div>;

  return (
    <div className='product-page'>
      <div className='header'>
        <Link to={-1} className='header-button'>
          <ChevronLeft size={35} />
        </Link>
        <div className='header-icons'>
          <button className='header-button share'>
            <Share2 size={28} className='mr-4' />
          </button>
          <button className='header-button'>
            <MoreHorizontal size={28} />
          </button>
        </div>
      </div>

      <div className='content'>
        <div
          className='image-slider'
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div
            className='slider-track'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, index) => (
              <div key={index} className='slide'>
                <img
                  src={src}
                  alt={`Product ${index}`}
                  draggable={false}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div style={{ textAlign: 'center', color: 'gray', marginTop: '4px' }}>image error</div>
              </div>
            ))}
          </div>
          <div className='dots'>
            {images.map((_, index) => (
              <button
                key={index}
                className={currentIndex === index ? 'dot active' : 'dot'}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className='section'>
          <div className='user-section'>
            <div>
              <div className='user-name'>옆집 아저씨</div>
              <div className='user-location'>{data.place}</div>
              <div className='review' style={{ color: '#fbbf24' }}>
                ★★★★★<span style={{ color: '#555' }}>4.9</span>
                <span style={{ color: '#adadad', fontSize: '8px' }}>(review 176명)</span>
              </div>
            </div>
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbG33Wn2VcMnshR2-HZvrEkCY6ZwTcsLjitw&s'
              alt='user profile'
              className='user-img'
            />
          </div>
        </div>

        <div className='section'>
          <div className='title'>{data.title}</div>
          <div className='price'>
            {data.price}원 <span>/ {data.date}일</span>
          </div>
          <div className='description'>
            <p>{data.description}</p>
          </div>
        </div>

        <div className='section'>
          <div className='tag-section'>
            <div className='meta'>태그</div>
            <div className='tags'>
              {[data.category, data.sex].map((tag, i) => (
                <span key={i} className='tag-box'>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className='size-info'>
            <div className='meta'>착용자 사이즈</div>
            <table className='size-table'>
              <thead>
                <tr>
                  <th>사이즈</th>
                  <th>키</th>
                  <th>몸무게</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.size}</td>
                  <td>175</td>
                  <td>75</td>
                </tr>
              </tbody>
            </table>
            <div className='meta'>거래 장소</div>
            
            <Kakaomap address={data.place}></Kakaomap>
            
          </div>
        </div>
      </div>

      <div className='footer'>
        <button
          className='like-heart'
          onClick={() => setLiked(!liked)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Heart
            size={24}
            color={liked ? 'red' : 'gray'}
            fill={liked ? 'red' : 'none'}
          />
        </button>

        <Link to={'/Chat'} className='footer-button'>채팅하기</Link>
        <button className='footer-button deel'>거래하기</button>
      </div>
    </div>
  );
}