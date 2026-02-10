import React, { useState, useRef, useEffect } from 'react';
import './EmailInput.css';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function EmailInput() {

    
  const navigate = useNavigate()
  const [email, setemail] = useState('');
  const [domain, setDomain] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const domainOptions = [
    'gmail.com',
    'naver.com',
    'daum.net',
    'kakao.com',
    'hanmail.net',
    'nate.net'
  ];

  const getEmail = () => {
    return email && domain ? `${email}@${domain}` : '';
  };

  const handleDomainSelect = (selectedDomain) => {
    setDomain(selectedDomain);
    setIsDropdownOpen(false);
  };

  // 외부 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

const emailsubmit = async (e) => {
     e.preventDefault();
      const fullEmail = getEmail();
    try {
      if (!fullEmail) {
        alert('이메일을 정확히 입력해 주세요');
        return;
      }
      //기본양식
      const res = await fetch('백엔드 주소', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          fullEmail
        }),
      });

      if (res.ok) {
        alert('비밀번호가 변경되었습니다.')
        navigate('/login'); //변경되면 로그인으로
      } else {
        //토큰 못 받았을 때
        alert(`비밀번호 변경에 실패했습니다.`);
      }
    } catch (error) {
       navigate("/error", {
        replace: true,
        state: { error: "비밀번호 변경 오류", errorDesc: " 비밀번호를 변경할 수 없습니다." },
      });
    }
}




  return (


        
        <form className="email-form" onSubmit={emailsubmit}>
          {/* 이메일 입력 영역 */}
          <div className="email-input-wrapper">
            <input className="email-input"
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="이메일"
            />


            <span className="email-a">@</span>
            
        
            <div className="domain-wrapper" ref={dropdownRef}>
              <div className="domain-input-container">
                <input className="domain-input"
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="도메인"/>


                  
                <button className="dropdown-toggle-btn"
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}>

                    <ChevronDown
                        size={20}
                        strokeWidth={2}
                        className={`dropdown-arrow ${isDropdownOpen ? 'arrow-open' : ''}`}
                        />
                   
                </button>
              </div>

              {/* 드롭다운 메뉴 */}
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {domainOptions.map((option) => (
                    <button className="dropdown-item"
                      key={option}
                      type="button"
                      onClick={() => handleDomainSelect(option)} >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>



          {/* 전송 버튼 */}
          <button type='submit' className="submit-btn">
              전송하기  
          </button>
        </form>
  
  );
}