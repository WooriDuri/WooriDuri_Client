import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { setAccessToken } from "../../shared/cookie/Cookie";
import { toast } from "react-toastify";
import { signin } from "../../apis/userApi";
import { FaWifi } from "react-icons/fa";
import { RiRotateLockFill } from "react-icons/ri";
import lowBattery from "../../assets/images/배터리부족.png";
import thunder from "../../assets/images/번개.png";

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
          navigate("/mypage");
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
      <TopBar>
        <FirstBar>
          No Service <FaWifi className="wifi" />
        </FirstBar>
        <SecondBar>18:43</SecondBar>
        <ThirdBar>
          <RiRotateLockFill className="lock" size="20" />
          <span>11%</span>
          <img src={lowBattery} alt="battery" width={35} height={35} />
          <img src={thunder} alt="thunder" width={15} height={18} />
        </ThirdBar>
      </TopBar>
      <Welcome>
        <p>Welcome to Woori-Duri</p>
        <div>If you have a Woori-Duri Account,</div>
        <div>log in with your email or phone number.</div>
      </Welcome>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
            width: "92%",
            color: "#FF2D53",
            fontSize: "1rem",
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
            width: "92%",
            color: "#FF2D53",
            fontSize: "0.8rem",
            fontWeight: "400",
          }}
        >
          {errors.password?.message}
        </p>
        <ButtonWrap>
          <LogIn>로그인</LogIn>
          <SignUp onClick={onSignUp}>회원가입</SignUp>
        </ButtonWrap>
      </Form>
    </Container>
  );
}

export default Home;

export const Container = styled.div`
  width: 500px;
  margin: auto;
`;

export const TopBar = styled.div`
  display: grid;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 18px;
  font-weight: 600;
  .wifi {
    vertical-align: -2px;
    margin-left: 3px;
  }
  .lock {
    vertical-align: -4px;
    margin-right: 6px;
  }
`;

export const FirstBar = styled.div`
  padding-top: 9px;
`;

export const SecondBar = styled.div`
  text-align: center;
  font-size: 17px;
  font-weight: 800;
  padding-top: 10px;
`;

export const ThirdBar = styled.div`
  display: flex;
  align-items: center;
  padding-left: 48px;
  img {
    margin-left: 3px;
  }
`;

const Welcome = styled.div`
  width: 90%;
  text-align: center;
  margin: 80px auto;
  p {
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  div {
    margin-top: 5px;
    font-size: 20px;
    color: #888888;
  }
`;

const Form = styled.form`
  width: 90%;
  margin: auto;
`;
const EmailInput = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 20px;
  border-bottom: #888888 2px solid;
  border-left: medium none;
  border-right: medium none;
  border-top: medium none;
  :focus {
    outline: none;
  }
`;
const PasswordInput = styled.input`
  width: 100%;
  margin-top: 10px;
  padding: 15px;
  font-size: 20px;
  border-bottom: #888888 2px solid;
  border-left: medium none;
  border-right: medium none;
  border-top: medium none;
  :focus {
    outline: none;
  }
`;

const ButtonWrap = styled.div`
  width: 90%;
  margin: auto;
  p {
    margin-top: 25px;
    text-align: center;
    font-size: 17px;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
`;

const LogIn = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 30px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const SignUp = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 15px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
