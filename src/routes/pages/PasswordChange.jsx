import { useEffect, useState } from 'react';
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import './PasswordChange.css'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pwChangeSchema } from './PWChangeSchema.ts'

export default function PasswordChange(){


    // const [currentPassword,setcurrentPassword] = useState('')
    // const [newPassword,setNewPassword] = useState('')
    // const [checkPassword,setCheckPassword] = useState('')
  const [errorMSG,setErrorMSG] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty},
        reset,
    } = useForm({
        resolver: zodResolver(pwChangeSchema),
        defaultValues: { currentPassword: "", newPassword: "",checkPassword:"" },
        mode: "onChange",
    });






    const onSubmit = async (values) => {
      const { currentPassword, newPassword } = values;
      const token = localStorage.getItem("token");
   

    try {
      const res = await fetch("http://opencloset.jihongeek.com/auth/password-change", {
        method: "POST",
        headers: { "content-type": "application/json",
                   Authorization: `Bearer ${token}`,
                  },
         body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json().catch(() => null);

       if (res.ok) {
      reset();
      navigate("/");
    } else {
      setErrorMSG("비밀번호 변경 실패", data);
    }
  } catch (error) {
    setErrorMSG(error);
  }
};





    return(
        <>
        
        <Header></Header>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className=' space-40px'></div>

            
            <div className='PWinput-container'>
            <p className='PWinput-tittle'>현재 비밀번호</p>
            <input {...register("currentPassword")} className='PWinput' type="password" placeholder='현재 비밀번호 입력'/>
            <div className={`PWinput-bar ${errors.currentPassword ? "red" : ""}  `}></div>
            <div className='PWinput-space space-40px'>
               {errors.currentPassword  && <p className="PWinput-error">{errors.currentPassword.message}</p>}
               
            </div>
            </div>

          <div className='PWinput-container'>
            <p className='PWinput-tittle'>새 비밀번호</p>
            <input  {...register("newPassword")} className='PWinput' type="password" placeholder='새 비밀번호 입력'/>
            <div className={`PWinput-bar  ${errors.newPassword ? "red" : ""}`} ></div>
            <div className='PWinput-space space-28px'>
               {errors.newPassword  && <p className="PWinput-error">{errors.newPassword.message}</p>}
            </div>
            </div>


            <div className='PWinput-container'>
            <p className='PWinput-tittle'>새 비밀번호 확인</p>
            <input  {...register("checkPassword")} className='PWinput' type="password" placeholder='새 비밀번호 한번 더 입력'/>
            <div className={`PWinput-bar ${errors.checkPassword ? "red" : ""}`} ></div>
            <div className='PWinput-space space-28px'>
               {errors.checkPassword  && <p className="PWinput-error">{errors.checkPassword.message}</p>}
            </div>
            </div>
            
             <button className={`PWsubmit ${isDirty && isValid ? "check" : ""}`} 
                type='submit' 
                disabled={!(isDirty && isValid)}> 제출하기 
             </button>
             <p className='PWinput-error errorMSG'>{errorMSG}</p>
          
        </form>
        
        <NavBar></NavBar>
        </>
    )
}