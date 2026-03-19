import './Header.css'
import './Fonts.css'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TfiSearch } from "react-icons/tfi";
import { SlArrowLeft } from "react-icons/sl";

// npm install react-icons설치해야함
export default function Header(){
    const [title,setTitle] = useState('')
    

    useEffect(() => {
    const lastURL = window.location.pathname.split('/').filter(Boolean).pop();
    if(lastURL == 'PasswordChange'){
        setTitle('비밀번호 변경');
    }else if(lastURL == 'PasswordFind'){
        setTitle('비밀번호 찾기');
    }else if(lastURL == 'EmailLogin'){
        setTitle('이메일 로그인');
    }else{
        setTitle('');
        }
    },[]);
    return(
        <>
        <div className='header-body'>
            <div className="app-notch"> <div className="camera"></div></div>
            {/* 노치 부분은 앱으로 만들면 없애야 함 */}
        
            <div className='app-bar'>
                <span > <Link to={-1}> <SlArrowLeft size={24} /></Link></span>
                <span className ={title? 'header-title' : 'typo-logo'}> {title ? `${title}`:'OPENCLOSET' } </span>
                <span  > <Link to={'/Search'}> <TfiSearch size={24}/></Link></span>
                
            </div>
            <div className='header-bar'></div>
        </div>
        <div className='header-space'></div>
        </>
    )
}