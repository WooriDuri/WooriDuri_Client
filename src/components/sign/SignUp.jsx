import React, { useCallback } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { signup } from "../../apis/userApi";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data) => {
      try {
        const response = await signup(data);
        if (response.status === 201) {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        }
      } catch (err) {
        toast.error(err.response.data.errorMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
    [navigate]
  );

  return (
    <div>
      <ToastContainer />
      <Container onSubmit={handleSubmit(onSubmit)}>
        <NameInput
          placeholder="이름을 입력해주세요"
          {...register("name", {
            required: "이름을 입력해주세요",
            maxLength: {
              value: 10,
              message: "10자리 이하로 작성해주세요",
            },
            minLength: {
              value: 2,
              message: "2자리 이상으로 작성해주세요",
            },
            pattern: {
              value: /^[가-힣a-zA-Z]+$/,
              message: "형식에 맞지 않는 이름 입니다.",
            },
          })}
          type={"name"}
          errors={errors}
          label={"이름"}
        />
        <p
          style={{
            margin: "7px 20px",
            width: "100%",
            color: "#FF2D53",
            fontSize: "0.8rem",
            fontWeight: "400",
          }}
        >
          {errors.name?.message}
        </p>
        <EmailInput
          placeholder="이메일을 입력해주세요"
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
              message: "올바른 이메일 형식을 입력해주세요.",
            },
          })}
        />
        <p
          style={{
            margin: "7px 20px",
            width: "100%",
            color: "#FF2D53",
            fontSize: "0.8rem",
            fontWeight: "400",
          }}
        >
          {errors.email?.message}
        </p>
        <PasswordInput
          placeholder="비밀번호를 입력해주세요"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            maxLength: {
              value: 20,
              message: "20자리 이하로 작성해주세요",
            },
            minLength: {
              value: 8,
              message: "8자리 이상으로 작성해주세요",
            },
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
              message: "영어, 숫자, 특수문자 포함 8~20자리 입니다.",
            },
          })}
          type={"password"}
          errors={errors}
        />
        <p
          style={{
            margin: "7px 20px",
            width: "100%",
            color: "#FF2D53",
            fontSize: "0.8rem",
            fontWeight: "400",
          }}
        >
          {errors.password?.message}
        </p>
        <button>회원가입</button>
      </Container>
    </div>
  );
}

export default SignUp;

const Container = styled.form`
  width: 500px;
  height: 500px;
  margin: 100px auto;
`;

const NameInput = styled.input`
  width: 100%;
  margin-left: 20px;
`;

const EmailInput = styled.input`
  width: 100%;
  margin-left: 20px;
`;

const PasswordInput = styled.input`
  width: 100%;
  margin-left: 20px;
`;
