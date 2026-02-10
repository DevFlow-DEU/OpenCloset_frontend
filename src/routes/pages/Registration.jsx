import React, { useState } from 'react';
import { ChevronLeft, CirclePlus } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { Link, useNavigate } from 'react-router-dom';
// import 'react-datepicker/dist/react-datepicker.css';
import './Registration.css';
// import Area from '../../components/area';
import'./share.css'







const ProductRegistrationForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState([]);
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('사이즈 선택');
  const [sex,setSex] = useState('')
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('카테고리 선택')
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);  -----------달력력
 
  // const [tagInput, setTagInput] = useState(''); ----------태그
  // const [tags, setTags] = useState([]);
 
  
  const token = localStorage.getItem('token');// 토큰큰
  // console.log(token);
  const navigate = useNavigate();
  //-------------------------------------------------------------------------사진 추가, 제거
  const handleImageUpload = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => ({
        id: Date.now() + Math.random(), //아이디 생성
        url: URL.createObjectURL(file), //미리보기
        file: file,
      }));
      setImage((prev) => [...prev, ...newImages]); //새 이미지 기존 배열에 추가
    }
  };
  const removeImage = (id) => {
    setImage(image.filter((imagee) => imagee.id !== id));
  }; // 이미지 제거

  //--------------------------------------테그 설정

  // const addTag = () => {
  //   if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
  //     setTags([...tags, tagInput.trim()]);
  //     setTagInput('');
  //   }
  // };

  // const removeTag = (tag) => {
  //   setTags(tags.filter((t) => t !== tag));
  // };









const handleSubmit = async (e) => {
  e.preventDefault();

  // 유효성 검사
  if (
    !title.trim() ||
    !description.trim() ||
    !price.trim() ||
    !date.trim() ||
    !place.trim() ||
    category === '카테고리 선택' ||
    size === '사이즈 선택' ||
    sex === '선택하기' ||
    image.length === 0
  ) {
    alert('모든 항목을 입력해 주세요.');
    return;
  }

  // const formData = new FormData();
  // formData.append('title', title);
  // formData.append('description', description);
  // formData.append('price', price);
  // formData.append('size', size);
  // formData.append('sex', sex);
  // formData.append('place', place);
  // formData.append('category', category);
  // formData.append('date', date);

  // image.forEach((imgObj) => {
  //   formData.append('images', imgObj.file);
  // });

  try {
    const res = await fetch('http://113.198.229.158:8880/board/create', {
      method: 'POST',
      body: JSON.stringify({
          title,
          description,
          price,
          size,
          sex,
          place,
          category,
          date,
          image : "https://www.venturesquare.net/wp-content/uploads/2022/03/이미지-조연-무신사-CTO.jpg"//수정해야함함
        }),
      headers: {
         "Content-Type": "application/json",
     Authorization: `Bearer ${token}`, 
  },
    });

    if (res.ok) {
      console.log("등록됨");
      navigate('/home');

    } else {
       console.log("에러")
    }
  } catch (err) {
    console.log(err)
  }
};


  return (
    <div className='share-container'>
      {/* 헤더------------------------------------------------------------ */}
      <div className='share-header'>
        <div className='share-nochi'></div>
      <div className='share-text'>
        <Link to={'/'} className='back-button'>
          <ChevronLeft size={35} />
        </Link>
        <h2>상품 등록</h2>
      </div>
      </div>

      <form className='registration-form' onSubmit={handleSubmit}>
        {/*  폼 시작 */}

        {/* 이미지 -------------------------------------------------*/}
        <section className='form-section image-section'>
          <h3>사진 추가</h3>
          <div className='image-container'>
            <label className='image-upload-button'>
              <div className='plus-icon'>
                <CirclePlus size={35} />
              </div>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                multiple
                hidden
              />
            </label>

            {image.map((image) => (
              <div className='thumbnail' key={image.id}>
                <img src={image.url} alt='상품 이미지' />
                <button
                  type='button'
                  className='remove-image'
                  onClick={() => removeImage(image.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 상품 정보------------------------------------------------------------ */}
        <section className='form-section info-section'>
          <div className='form-group'>
            <label>제목</label>
            <input
              type='text'
              placeholder='상품명'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label>가격</label>
            <input
              type='text'
              placeholder='상품 가격'
              value={
                price
                  ? Number(price).toLocaleString('ko-KR')
                  : ''
              }
              onChange={(e) => {
                const onlyNumber = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 추출
                setPrice(onlyNumber);
              }}
            />
          </div>

          <div className='form-group'>
            <label>판매 기간</label>
            <input
              type='number' 
              placeholder='판매 기간'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            </div>
            
            


            {/* <div className='calendar-picker'>
              <DatePicker className='startday'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText='시작일'
                
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText='종료일'
                
              />
            </div> */}
          

          <div className='form-group'>
            <label>상세 정보</label>
            <textarea
              placeholder='상세 내용'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </section>

        {/* 카테고리 및 옵션 */}
        <section className='form-section category-section'>
          {/* <div className='form-group'>
            <label>태그</label>
            <div className='tag-input-wrapper'>
              <input
                type='text'
                placeholder='태그 입력 후 Enter'
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && (e.preventDefault(), addTag())
                }
              />
              <div className='tag-list'>
                {tags.map((tag) => (
                  <span key={tag} className='tag-item'>
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className='remove-tag'
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div> */}
          <div className='form-group'>
            <label>대여 장소</label>
            <input
              type='text'
              placeholder='동으로 입력'
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />

          </div>

          <div className='form-group'>
            <label>사이즈</label>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value='카테고리 설정'>사이즈 선택</option>
              <option value='S'>S</option>
              <option value='M'>M</option>
              <option value='L'>L</option>
              <option value='XL'>XL</option>
            </select>
          </div>

          <div className='form-group'>
            <label>성별</label>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option value='선택하기'>선택하기</option>
              <option value='님성'>남성</option>
              <option value='여성'>여성</option>
            </select>
          </div>
          <div className='form-group'>
            <label>카테고리</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value='카테고리 설택'>카테고리 선택</option>
              <option value='outer'>아우터</option>
              <option value='top'>상의</option>
              <option value='bottom'>하의</option>
              <option value='dress'>원피스</option>
              <option value='shoes'>신발</option>
              <option value='jewelryL'>주얼리</option>
              <option value='bag'>가방</option>
              <option value='accessory'>악세사리</option>
            </select>
          </div>
        </section>

        <div className='footer'>
          <button type='submit' className='submit-button'>
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductRegistrationForm;
