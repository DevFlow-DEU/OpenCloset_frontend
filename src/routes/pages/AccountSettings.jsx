import { Link } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import Header from '../../components/Header/Header'
import './MyPage.css'
import { SlArrowRight } from "react-icons/sl";




export default function AccountSettings() {
  return (
    <>
      <Header.Root hasNotch hasCamera>
        <Header.BackButton />
        <Header.CenterTitle title="내 정보 관리" />
      </Header.Root>
      <section>
        <article className='menu-item'>
          <Link to={'/InformationEdit'}>
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
          <Link to={'/DeleteAccount'}>
            <span>회원탈퇴</span>{' '}
            <span>
              {' '}
              <SlArrowRight size={24} />{' '}
            </span>
          </Link>
        </article>
        <div className='article-bar'></div>
      </section>






      <NavigationBar />
    </>
  )
}