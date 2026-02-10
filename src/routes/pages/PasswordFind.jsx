// import './share.css'
import React, { useState } from 'react';
import { ChevronLeft, CirclePlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './share.css'
import EmailInput from '../../components/EmailInput';

const PasswordFind =() =>{
return(



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



{/* 내용 */}

<div className='share-form'>
  <EmailInput></EmailInput>
</div>

      </div>

      

)
}
      
      export default PasswordFind