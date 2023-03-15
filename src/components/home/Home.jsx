import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { setAccessToken } from "../../shared/cookie/Cookie";
import { toast } from "react-toastify";
import { signin } from "../../apis/userApi";

function Home() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = useCallback(
    async (data) => {
      try {
        const res = await signin(data);
        const {
          data: { success },
        } = res;
        const token = res.data.data.token;
        if (success === true) {
          setAccessToken(token);
          navigate("/chat");
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

  const onSignUp = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <div style={{ margin: "50px auto", width: "100%", textAlign: "center" }}>여기는 홈화면임 로그인해줘</div>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          placeholder="이메일을 입력해주세요"
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
              message: "올바른 이메일 형식을 입력해주세요.",
            },
          })}
          type={"email"}
          errors={errors}
        />
        <p
          style={{
            margin: "7px auto",
            width: "70%",
            color: "#FF2D53",
            fontSize: "0.8rem",
            fontWeight: "400",
          }}
        >
          {errors.email?.message}
        </p>
        <PasswordInput
          placeholder="비밀번호 입력"
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
              message: "영어, 특수문자 포함 8~20자리 입니다.",
            },
          })}
          type={"password"}
          errors={errors}
          autoComplete={"off"}
        />
        <p
          style={{
            margin: "7px auto",
            width: "70%",
            color: "#FF2D53",
            fontSize: "0.8rem",
            fontWeight: "400",
          }}
        >
          {errors.password?.message}
        </p>
        <ButtonWrap>
          <button>로그인</button>
          <button onClick={onSignUp}>회원가입</button>
        </ButtonWrap>
      </LoginForm>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  margin: auto;
  overflow-y: hidden;
`;

const LoginForm = styled.form`
  width: 500px;
  margin: auto;
`;

const EmailInput = styled.input`
  width: 70%;
  height: 30px;
  display: block;
  margin: 0 auto;
`;

const PasswordInput = styled.input`
  width: 70%;
  height: 30px;
  display: block;
  margin: 30px auto 0 auto;
`;

const ButtonWrap = styled.div`
  width: 100%;
  margin: 20px auto;
  display: block;
`;
