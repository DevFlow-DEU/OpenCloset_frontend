import { Link,useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import './MyPage.css'
import { SlArrowRight } from "react-icons/sl";




export default function AccountSettings(){
    return(
        <>
        <Header></Header>
              <section>
        <article className='menu-item'>
          <Link to={'/informationEdit'}>
            <span>내 정보 수정</span>{' '}
            <span>
              {' '}
              <SlArrowRight size={24} />{' '}
            </span>
          </Link>
        </article>
        <div className='article-bar'></div>


         <article className='menu-item'>
          <Link to={'/PasswordChange'}>
            <span>비밀번호 변경</span>{' '}
            <span>
              {' '}
              <SlArrowRight size={24} />{' '}
            </span>
          </Link>
        </article>
        <div className='article-bar'></div>

         <article className='menu-item'>
          <Link to={'/delete-account'}>
            <span>회원탈퇴</span>{' '}
            <span>
              {' '}
              <SlArrowRight size={24} />{' '}
            </span>
          </Link>
        </article>
        <div className='article-bar'></div>
         </section>
        
        
        
        
        
        
              <NavBar></NavBar>
        </>
    )
}