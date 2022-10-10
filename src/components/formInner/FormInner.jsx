import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { emailDoubleCheck } from "../../api/loginAPI";

const FormInner = (props) => {
  const htRef = useRef();
  const pwHtRef = useRef();
  const [checkEmail, setCheckEmail] = useState("");
  const [ready, setReady] = useState(false);

  // type -> 타이틀
  const title = {
    email: "이메일",
    nickname: "닉네임",
    password: "비밀번호",
    answer: "비밀번호 분실 질문",
  };

  // 정규식
  let reg = null;
  if (props.type === "email") reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  else if (props.type === "password") reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  // HelpText 내용
  const helpText = {
    // 기본 값
    noneData: "꼭 작성해주세요!",

    // 성공용 멘트
    emailSuc: props.pathnameCheck ? "이메일 양식에 알맞네요!" : "",
    nicknameSuc: "개쩌는 닉네임이다...",
    passwordSuc: props.pathnameCheck ? "강려크한 비밀번호다!" : "",
    answerSuc: "멋진 곳이죠! 저도 알아요!",

    // 실패용 멘트
    emailDif: "이메일 이상한데..?",
    nicknameDif: "1자 ~ 10자 사이로 작성해야해요!",
    passwordDif: props.pathnameCheck ? "8자 이상, 특수 문자(@$!%*#?&)와 숫자 각 한개 이상이 필요해요!" : "8자 이상, 특수문자와 숫자 각 1개!",

    // dup 멘트
    emailCheck: "중복 메일인데요..?",
    passwordCheck: "위에꺼랑 똑같네요!",
  };

  // HelpText 변경 이벤트
  const changeHandler = (e) => {
    const target = e.target;
    if (!target.value) {
      htRef.current.style.color = "red";
      htRef.current.innerText = helpText.noneData;
      return;
    }
    if (target.name === "password" && props.pathnameCheck) {
      const dcInput = target.parentNode.children[4];
      dcInput.value = "";
      pwHtRef.current.innerText = "";
    }

    let flag = false;
    if (reg && reg.test(target.value)) flag = true;
    else if (!reg) {
      flag = true;
      if (props.type === "nickname" && target.value.length > 8) flag = false;
    }
    htRef.current.innerText = flag ? helpText[props.type + "Suc"] : helpText[props.type + "Dif"];
    htRef.current.style.color = flag ? "green" : "red";
    setReady(target.name === "password" ? false : flag);
  };

  // 중복체크
  const matchCheck = (e) => {
    const target = e.target;
    if (target.name === "email") {
      if (reg.test(target.value) && checkEmail !== target.value) {
        emailDoubleCheck(target.value)
          .then((res) => {
            setReady(!res);
            setCheckEmail(target.value);
            if (res) {
              htRef.current.innerText = helpText[props.type + "Check"];
              htRef.current.style.color = "red";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      if (!target.value) {
        pwHtRef.current.style.color = "red";
        pwHtRef.current.innerText = helpText.noneData;
        return;
      }
      let flag = false;
      const pwInput = target.parentNode.children[1];
      if (pwInput.value === target.value) flag = true;
      pwHtRef.current.innerText = flag ? helpText[props.type + "Check"] : "까먹었나요..?";
      pwHtRef.current.style.color = flag ? "green" : "red";
      setReady(flag);
    }
  };

  // register 기본 옵션
  let registerOpt = {
    required: helpText.noneData,
    onChange: changeHandler,
    onBlur: props.type === "email" && props.pathnameCheck ? matchCheck : null,
  };

  // register 옵션 추가
  if (props.type !== "password") {
    registerOpt.validate = {
      ready: () => ready === true,
    };
  }
  if (reg) {
    registerOpt.pattern = {
      value: reg,
    };
  } else if (props.type === "nickname") {
    registerOpt.minLength = {
      value: 2,
    };
    registerOpt.maxLength = {
      value: 10,
    };
  }
  for (let opt in registerOpt) {
    if (opt === "pattern" || opt === "maxLength") registerOpt[opt].message = helpText[props.type + "Dif"];
  }

  // 페이지별 helptext 리셋
  useEffect(() => {
    htRef.current.innerText = "";
  }, [props.pathnameCheck]);

  return (
    <Container>
      <Title>{title[props.type]}</Title>

      {props.pathnameCheck && props.type === "answer" ? (
        <Question>
          <option defaultValue>출생지가 어디인가요?</option>
          <option disabled>아직 다른 질문은 없어요!</option>
        </Question>
      ) : null}

      <input
        autoComplete="off"
        type={props.type === "nickname" || props.type === "answer" ? "text" : props.type}
        {...props.register(props.type, registerOpt)}
      />
      <HelpText ref={htRef}></HelpText>

      {props.pathnameCheck && props.type === "password" ? (
        <>
          <Title>비밀번호 재확인</Title>
          <input
            type={props.type}
            {...props.register("confirm", {
              required: helpText.noneData,
              onChange: matchCheck,
              validate: {
                ready: () => ready === true,
              },
            })}
          />
          <HelpText ref={pwHtRef} />
        </>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 10px;
  & > * {
    margin-bottom: 5px;
  }
  & > input {
    width: 100%;
    border: 0;
    padding: 12px;
    border-radius: 25px;
    outline-color: rgb(255, 204, 204);
  }
  & > p {
    margin-left: 10px;
  }
`;
const Title = styled.p`
  font-weight: bold;
`;

const HelpText = styled.p`
  height: 20px;
  font-size: 10px;
  color: red;
`;

const Question = styled.select`
  appearance: none;
  outline: none;

  padding: 10px;
  border: 1px solid rgb(255, 204, 204);
  border-radius: 25px;

  & > option {
    background: rgba(255, 204, 204, 0.3);
  }
`;
export default FormInner;
