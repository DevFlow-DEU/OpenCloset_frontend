// // ProductPage.jsx - 마우스+모바일 지원 + 구역 나누기 + 여백 + 구분선 + 프로필
// import { useState, useRef } from 'react';
// import { Heart, ChevronLeft, Share2, MoreHorizontal } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import './Particular.css';

// const images = [
//   'https://image.msscdn.net/thumbnails/images/goods_img/20250312/4884296/4884296_17439929929228_big.jpg?w=1200',
//   'https://image.msscdn.net/thumbnails/images/prd_img/20250312/4884296/detail_4884296_17439930097574_big.jpg?w=1200',
//   'https://image.msscdn.net/thumbnails/images/prd_img/20250312/4884296/detail_4884296_17417424853084_big.jpg?w=1200',
// ];

// export default function ProductPage() {
//   const [liked, setLiked] = useState(false);

//   // 사진 페이지 넘기기--------------------- 지홍 여기 부분 따로 뺴야함?
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const touchStartX = useRef(0);
//   const isMouseDown = useRef(false);

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
//   const handleTouchEnd = (e) => {
//     const touchEndX = e.changedTouches[0].clientX;
//     handleSwipe(touchStartX.current, touchEndX);
//   };
//   const handleMouseDown = (e) => {
//     isMouseDown.current = true;
//     touchStartX.current = e.clientX;
//   };
//   const handleMouseUp = (e) => {
//     if (!isMouseDown.current) return;
//     isMouseDown.current = false;
//     handleSwipe(touchStartX.current, e.clientX);
//   };
//   const handleSwipe = (start, end) => {
//     const delta = start - end;
//     if (delta > 50) {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     } else if (delta < -50) {
//       setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//     }
//   };
//   //------------------------------------------------------

//   return (
//     <div className='product-page'>
//       {/* 헤더------------------------------------- */}
//       <div className='header'>
//         <Link to={'/'} className='header-button'>
//           <ChevronLeft size={35} />
//         </Link>
//         <div className='header-icons'>
//           <button className='header-button share'>
//             <Share2 size={28} className='mr-4' />
//           </button>
//           <button className='header-button'>
//             <MoreHorizontal size={28} />
//           </button>
//         </div>
//       </div>

//       {/* 내용용------------------------------------- */}
//       <div className='content'>
//         <div
//           className='image-slider'
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//           onMouseDown={handleMouseDown}
//           onMouseUp={handleMouseUp}
//         >
//           <div
//             className='slider-track'
//             style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//           >
//             {images.map((src, index) => (
//               <div key={index} className='slide'>
//                 <img src={src} alt={`Product ${index}`} draggable={false} />
//               </div>
//             ))}
//           </div>

//           <div className='dots'>
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 className={currentIndex === index ? 'dot active' : 'dot'}
//                 onClick={() => setCurrentIndex(index)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* 유저 정보---------------------------------- */}
//         <div className='section'>
//           <div className='user-section'>
//             <div>
//               <div className='user-name'>옆집 아저씨</div>
//               <div className='user-location'>부산광역시 부산진구 가야동</div>
//               <div className='review' style={{ color: '#fbbf24' }}>
//                 ★★★★★
//                 <span style={{ color: '#555' }}>4.9</span>
//                 <span style={{ color: '#adadad', fontSize: '8px' }}>
//                   (review 176명)
//                 </span>
//               </div>
//             </div>
//             <img
//               src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbG33Wn2VcMnshR2-HZvrEkCY6ZwTcsLjitw&s'
//               alt='user profile'
//               className='user-img'
//             />
//           </div>
//         </div>

//         {/* 상품---------------------------------------- */}
//         <div className='section'>
//           <div className='title'>와이드 롱 팬츠</div>
//           <div className='price'>
//             3,500원 <span>/ 3일</span>
//           </div>
//           <div className='description'>
//             <p>
//               가볍고 통이 넓은 와이드 롱 팬츠입니다.
//               <br />
//               한여름에도 덥지 않게 착용할 수 있고, 구김도 잘 안 가요.
//               <br />
//               <br />
//               체형 커버에도 좋아서
//               <br />
//               평소 슬림한 핏이 부담스러우신 분들께 추천드려요.
//               <br />
//               <br />
//               저는 175cm에 75kg 기준으로 발목 위까지 오는 기장감이고
//               <br />
//               허리는 밴딩이라 편하게 착용됩니다.
//               <br />
//               거래는 동의대역 생각하고 있어요
//               <br />
//               <br />
//               일상룩, 여행룩, 캠퍼스룩 모두 잘 어울려요!
//             </p>
//           </div>
//         </div>

//         {/*태그-------------------------------------------------  */}
//         <div className='section'>
//           <div className='tag-section'>
//             <div className='meta'>태그</div>
//             <div className='tags'>
//               {['새상품', '프리컷', '바지', '기타의류', '빈티지'].map(
//                 (tag, i) => (
//                   <span key={i} className='tag-box'>
//                     {tag}
//                   </span>
//                 )
//               )}
//             </div>
//           </div>

//           {/* Section: 사이즈 정보 */}

//           <div className='size-info'>
//             <div className='meta'>착용자 사이즈</div>
//             <table className='size-table'>
//               <thead>
//                 <tr>
//                   <th>사이즈</th>
//                   <th>키</th>
//                   <th>몸무게</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>특대</td>
//                   <td>175</td>
//                   <td>75</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* 푸터------------------------------------------------- */}
//       <div className='footer'>
//         <button
//           className='like-heart'
//           onClick={() => setLiked(!liked)}
//           style={{
//             background: 'none',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           <Heart
//             size={24}
//             color={liked ? 'red' : 'gray'}
//             fill={liked ? 'red' : 'none'}
//           />
//         </button>

//         <button className='footer-button'>채팅하기</button>
//         <button className='footer-button deel'>거래하기</button>
//       </div>
//     </div>
//   );
// }
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