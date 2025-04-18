import React, { useState } from 'react';
import { ChevronLeft, CirclePlus } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Registration.css';



const ProductRegistrationForm = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [size, setSize] = useState('카테고리 설정');
  const [condition, setCondition] = useState('선택 안함');



  //-------------------------------------------------------------------------사진 추가, 제거
  const handleImageUpload = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => ({
        id: Date.now() + Math.random(),//아이디 생성
        url: URL.createObjectURL(file),//미리보기
        file: file
      }));
      setImages(prev => [...prev, ...newImages]);//새 이미지 기존 배열에 추가
    }
  };
  const removeImage = (id) => {
    setImages(images.filter(image => image.id !== id));
  };// 이미지 제거


  //--------------------------------------테그 설정

  const addTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };




  return (
    <div className="product-registration-container">
      {/* 헤더------------------------------------------------------------ */}
      <div className="header">
        <button className="back-button"><ChevronLeft size={35} /></button>
        <h2>상품 등록</h2>
      </div>




      <form className="registration-form">{/*  폼 시작 */}

      

        {/* 이미지 -------------------------------------------------*/}
        <section className="form-section image-section">
          <h3>사진 추가</h3>
          <div className="image-container">
            <label className="image-upload-button">
              <div className="plus-icon"><CirclePlus size={35} /></div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                multiple 
                hidden
              />
            </label>
            
            {images.map(image => (
              <div className="thumbnail" key={image.id}>
                <img src={image.url} alt="상품 이미지" />
                <button 
                  type="button" 
                  className="remove-image" 
                  onClick={() => removeImage(image.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>





        {/* 상품 정보------------------------------------------------------------ */}
        <section className="form-section info-section">
          <div className="form-group">
            <label>제목</label>
            <input 
              type="text" 
              placeholder="상품명" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>



          <div className="form-group">
            <label>가격</label>
            <input 
              type="number" 
              placeholder="상품 가격" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>




          <div className="form-group">
            <label>판매 기간</label>
            <div className="calendar-picker">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="시작일"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="종료일"
              />
            </div>
          </div>






          <div className="form-group">
            <label>상세 정보</label>
            <textarea 
              placeholder="상세 내용" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </section>






        {/* 카테고리 및 옵션 */}
        <section className="form-section category-section">
          <div className="form-group">
            <label>태그</label>
            <div className="tag-input-wrapper">
              <input
                type="text"
                placeholder="태그 입력 후 Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <div className="tag-list">
                {tags.map(tag => (
                  <span key={tag} className="tag-item">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="remove-tag">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>사이즈</label>
            <select 
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="카테고리 설정">카테고리 설정</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          <div className="form-group">
            <label>성별</label>
            <select 
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="선택하기">선택하기</option>
              <option value="님성">남성</option>
              <option value="여성">여성</option>
            </select>
          </div>
        </section>

        <div className='footer'>
          <button type="submit" className="submit-button">등록하기</button>
        </div>
      </form>
    </div>
  );
};

export default ProductRegistrationForm;
