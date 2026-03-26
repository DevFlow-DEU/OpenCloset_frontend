import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {RegistrationSchema } from "./RegistrationSchema";
import { SlArrowDown } from "react-icons/sl";
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import "./Registration.css";
import "./share.css";


export default function ProductRegistrationForm() {
  const backUrl = import.meta.env.VITE_BACK_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      size: "사이즈 선택",
      sex: "",
      place: "",
      date: "",
      category: "카테고리 선택",
      image: [],
    },
    mode: "onChange",
  });

  const image = watch("image");

  const handleImageUpload = (e) => {
    if (!e.target.files) return;

    const newImages = Array.from(e.target.files).map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file,
    }));

    setValue("image", [...image, ...newImages], { shouldValidate: true });
  };

  const removeImage = (id) => {
    setValue(
      "image",
      image.filter((item) => item.id !== id),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (values) => {
    try {
      const res = await fetch(`${backUrl}/board/create`, {
        method: "POST",
        body: JSON.stringify({
            ...values,
            price: values.price.replace(/,/g, ""),
          }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        navigate("/home");
        return;
      }

      setMessage("등록에 실패했습니다.");
    } catch (err) {
      console.log(err);
      setMessage("서버에 연결할 수 없습니다.");
    }
  };

  return (
    <>
    
    <Header/>
    <div className="SHcontainer">
     

      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-40px"></div>
          <p className="SHinput-tittle">사진 추가</p>
          <div className="space-12px"></div>
          <div className="image-container">
            <label className="image-upload-button">
              <div className="plus-icon">
                <FaCamera size={40} />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                multiple
                hidden
              />
            </label>

            {image.map((item) => (
              <div className="thumbnail" key={item.id}>
                <img src={item.url} alt="상품 이미지" onClick={() => removeImage(item.id)}/>
              </div>
            ))}
          </div>
          <div className="SHinput-space space-28px">
            {errors.image && (
              <p className="SHinput-error">{errors.image.message}</p>
            )}
          </div>
      

          <div>
            <p className="SHinput-tittle">제목</p>
            <input
              className="SHinput"
              placeholder="상품명"
              {...register("title")}
            />
            <div className={`SHinput-bar ${errors.title ? "red" : ""}`}></div>
            <div className="SHinput-space space-28px">
              {errors.title && (
                <p className="SHinput-error">{errors.title.message}</p>
              )}
            </div>
          </div>

          <div>
            <p className="SHinput-tittle">가격</p>
            <div className="select-wrapper">
            <input
              className="SHinput"
              placeholder="상품 가격"
              type="text"
              value={watch("price")}
              onChange={(e) => {
                const formatted = e.target.value
                  .replace(/[^0-9]/g, "")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                setValue("price", formatted, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />
            <span className="select-icon">원</span>
            </div>
            <div className={`SHinput-bar ${errors.price ? "red" : ""}`}></div>
            <div className="SHinput-space space-28px">
              {errors.price && (
                <p className="SHinput-error">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div>
            <p className="SHinput-tittle">판매 기간</p>
            <div className="select-wrapper">
            <input
              className="SHinput"
              type="number"
              placeholder="판매 기간"
              {...register("date")}
            />
            <span className="select-icon">일</span>
            </div>
            <div className={`SHinput-bar ${errors.date ? "red" : ""}`}></div>
            <div className="SHinput-space space-28px">
              {errors.date && (
                <p className="SHinput-error">{errors.date.message}</p>
              )}
            </div>
          </div>

          <div>
            <p className="SHinput-tittle">상세 정보</p>
            <textarea
              className="SHinput-200px"
              placeholder="상세 내용"
              {...register("description")}
            />
            <div
              className={`SHinput-bar ${errors.description ? "red" : ""}`}
            ></div>
            <div className="SHinput-space space-28px">
              {errors.description && (
                <p className="SHinput-error">{errors.description.message}</p>
              )}
            </div>
          </div>

          <div>
            <p className="SHinput-tittle">대여 장소</p>
            <input
              className="SHinput"
              placeholder="동으로 입력"
              {...register("place")}
            />
            <div className={`SHinput-bar ${errors.place ? "red" : ""}`}></div>
            <div className="SHinput-space space-28px">
              {errors.place && (
                <p className="SHinput-error">{errors.place.message}</p>
              )}
            </div>
          </div>

          <div>
            <p className="SHinput-tittle">사이즈</p>
            <div className="select-wrapper">
            <select className="SHinput" {...register("size")}>
              <option value="사이즈 선택">사이즈 선택</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <SlArrowDown size={24} className="select-icon"/>
            </div>
            <div className={`SHinput-bar ${errors.size ? "red" : ""}`}></div>
            <div className="SHinput-space space-28px">
              {errors.size && (
                <p className="SHinput-error">{errors.size.message}</p>
              )}
            </div>
          </div>

          <div>
            <p className="SHinput-tittle">성별</p>
            <div className="select-wrapper">
            <select className="SHinput" {...register("sex")}>
              <option value="">선택하기</option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </select>
            <SlArrowDown size={24} className="select-icon"/>
            </div>
            <div className={`SHinput-bar ${errors.sex ? "red" : ""}`}></div>
            <div className="SHinput-space space-28px">
              {errors.sex && (
                <p className="SHinput-error">{errors.sex.message}</p>
              )}
            </div>
          </div>

          <div>
            <p className="SHinput-tittle">카테고리</p>
            <div className="select-wrapper">
            <select className="SHinput" {...register("category")}>
              <option value="카테고리 선택">카테고리 선택</option>
              <option value="outer">아우터</option>
              <option value="top">상의</option>
              <option value="bottom">하의</option>
              <option value="dress">원피스</option>
              <option value="shoes">신발</option>
              <option value="jewelry">주얼리</option>
              <option value="bag">가방</option>
              <option value="accessory">악세사리</option>
            </select>
            <SlArrowDown size={24} className="select-icon"/>
            </div>
            <div className={`SHinput-bar ${errors.category ? "red" : ""}`}></div>
            <div className="SHinput-space space-28px">
              {errors.category && (
                <p className="SHinput-error">{errors.category.message}</p>
              )}
            </div>
          </div>

        <button
          className={`SHsubmit ${isDirty && isValid ? "check" : ""}`}
          type="submit"
          disabled={!(isDirty && isValid)}
        >
          등록하기
        </button>

        {message && <p className="SHinput-error errorMSG">{message}</p>}
      </form>
    </div>
    <NavBar/>
    </>
  );
}