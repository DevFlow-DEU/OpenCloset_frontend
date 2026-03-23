import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./loginValidator";
import { Link, useNavigate } from "react-router-dom";
import './EmailLogin.css'
import Header from '../../components/Header'

export default function LoginPage() {
  const navigate = useNavigate();
   const [message, setMessage] = useState("");

  const {
      register,
      handleSubmit,
      formState: { errors, isValid, isDirty},
      reset,
    } = useForm({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: "", password: "" },
    }); 


 const onSubmit = async (values) => {

    try {
      const res = await fetch("http://opencloset.jihongeek.com/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => null);

      if (res.ok) {
        localStorage.setItem("token", data?.accessToken ?? "");
        navigate("/");
        reset();
      }
       setMessage(
      data?.message ||
        `요청 실패 (${res.status})`
    );
  } catch (e) {
    setMessage("서버에 연결할 수 없습니다.");
    console.error("network error:", e);
  }
};

   return (
    <>
    <Header/>
    <div className="emlogin-container">
      <div className="space-60px"></div>
     <span className="typo-logo">OPENCLOSET</span><span>에</span><br /><span>오신걸 환영합니다!</span>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

          <div className='logininput-space space-80px'></div>
          
          <div>
            <p className='logininput-tittle'>이메일</p>
            <input className="logininput" placeholder="이메일 형식 입력" {...register("email")} />
             <div className={`logininput-bar ${errors.email ? "red" : ""}  `}></div>
             <div className='logininput-space space-28px'>
            {errors.email && <p className="login-error">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <p className='logininput-tittle'>비밀번호</p>
            <input className="logininput" type="password" placeholder="비밀번호 8자리 이상" {...register("password")} />
            <div className={`logininput-bar ${errors.password ? "red" : ""}  `}></div>
             <div className='logininput-space space-28px'>
            {errors.password && <p className="login-error">{errors.password.message}</p>}
            </div>
          </div> 

        <button className={`LG-BTN ${isDirty && isValid ? "check" : ""}`} 
                type='submit' 
               // disabled={!(isDirty && isValid)}
                > 로그인 
             </button>

        {message && <p className="login-error errorMSG">{message}</p>}
      </form>
    </div>
    </>
  );
}