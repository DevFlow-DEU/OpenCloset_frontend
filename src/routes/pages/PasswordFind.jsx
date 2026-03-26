import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { findSchema } from "./PWFindSchema";
import "./Share.css";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
export default function PasswordFind() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const backUrl = import.meta.env.VITE_BACK_URL;

const {
  register,
  handleSubmit,
  formState: { errors, isValid, isDirty },
  reset,
} = useForm({
  resolver: zodResolver(findSchema),
  defaultValues: { email: "" },
  mode: "onChange",
});

const onSubmit = async (values) => {
  try {
    const res = await fetch(`${backUrl}/auth/password-reset`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json().catch(() => null);

    if (res.ok) {
      navigate("/login");
      reset();
      return;
    }

    setMessage(data?.message || `요청 실패 (${res.status})`);
  } catch (e) {
    setMessage("서버에 연결할 수 없습니다.");
    console.error("network error:", e);
  }
};

  return (
    <div>
      <Header />
      <div className="SHcontainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-40px"></div>
        <p className="SHinput-tittle">이메일</p>
        <input
          className="SHinput"
          placeholder="이메일 형식 입력"
          {...register("email")}
        />
        <div className={`SHinput-bar ${errors.email ? "red" : ""}`}></div>

        <div className="SHinput-space space-28px">
          {errors.email && (
            <p className="SHinput-error">{errors.email.message}</p>
          )}
        </div>

        <button
          className={`SHsubmit ${isDirty && isValid ? "check" : ""}`}
          type="submit"
          disabled={!(isDirty && isValid)}
        >
          변경하기
        </button>

        {message && <p className="SHinput-error errorMSG">{message}</p>}
      </form>
      </div>
      <NavBar />
    </div>
  );
}