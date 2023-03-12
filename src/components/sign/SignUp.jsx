import React from "react";
import styled from "styled-components";

function SignUp() {
  const onSignUp = () => {
    //회원가입 로직
  };

  return (
    <Container>
      <NameInput placeholder="이름을 입력해주세요" />
      <EmailInput placeholder="이메일을 입력해주세요" />
      <PasswordInput placeholder="비밀번호를 입력해주세요" />
      <button onClick={onSignUp}>회원가입</button>
    </Container>
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
