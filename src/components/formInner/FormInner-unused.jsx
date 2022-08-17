import { useRef } from "react"
import styled from "styled-components"

import { emailDoubleCheck } from "../../../axios/loginAPI"

const FormInner = (props) => {
    const htRef = useRef()
    const pwHtRef = useRef()

    // inputType 및 변수명으로 변환
    const title = {
        'email': '이메일',
        'password': '비밀번호',
        'nickname' : '닉네임',
        'answer': '비밀번호 분실 질문'
    }

    // 정규식 구역
    const regEmail = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    const regPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/

    // register 옵션
    const registerOpt = {
        'email': {
            required: true,
            pattern: {
                value: regEmail,
            }
        },
        'password' : {
            required: true,
            pattern: {
                value: regPw,
            }
        },
        // 다음엔 validate를 이용해보도록 => 유용한 속성
        'doubleCheck' : {
            required: true,
            pattern: {
                value: regPw,
            }
        },
        'nickname' : {
            required: true,
            maxLength: {
                value: 8,
            }
        },
        'answer' : {
            required: true
        }
    }

    // focus out 이벤트 조절
    const blurHandler = (event) => {
        const target = event.target
        if(target.name === 'doubleCheck') pwHtRef.current.style.color = 'red'
        else htRef.current.style.color = 'red'
        
        if(target.value) {
            switch(target.name) {
                case 'email':
                    if(regEmail.test(target.value)){
                        const res = emailDoubleCheck(target.value)
                        res.then((ok) => {
                            if(!ok) {
                                htRef.current.innerText = '이메일 입력 완료!'
                                htRef.current.style.color = 'green'
                            } else {
                                htRef.current.innerText = '이미 존재하는 이메일입니다!'
                            }
                        })
                    } else {
                        htRef.current.innerText = '이메일 양식이 이상한데..?'
                    }
                    return
                case 'password':
                    const dcInput = target.parentNode.children[4]
                    if(regPw.test(target.value)){
                        htRef.current.innerText = pathnameCheck ?
                        '강려크한 비밀번호다!' :
                        '비밀번호 입력 완료!'
                        htRef.current.style.color = 'green'
                        if(pathnameCheck) {
                            dcInput.focus()
                            dcInput.blur()
                        }
                    } else {
                        htRef.current.innerText = pathnameCheck ?
                        '8자 이상, 특수 문자(@$!%*#?&)와 숫자 각 한개 이상이 필요해요!' :
                        '비밀번호가 뭔가 이상한거 같은데요?'
                        if(pathnameCheck) {
                            dcInput.focus()
                            dcInput.blur()
                        }
                    }
                    return
                case 'doubleCheck':
                    const pwInput = target.parentNode.children[1]
                    if(pwInput.value === target.value){
                        pwHtRef.current.innerText = '위에꺼랑 똑같네요! 비밀번호 형식은 지키셨죠?'
                        pwHtRef.current.style.color = 'green'
                    } else {
                        pwHtRef.current.innerText = '까먹었나요..?'
                    }
                    return
                case 'nickname':
                    if(target.value.length <= 8){
                        htRef.current.innerText = '개쩌는 닉네임이다...'
                        htRef.current.style.color = 'green'
                    } else {
                        htRef.current.innerText = '1자 ~ 8자 사이로 작성해야해요!'
                    }
                    return
                case 'answer':
                    htRef.current.innerText = '멋진 곳이죠! 저도 알아요!'
                    htRef.current.style.color = 'green'
                    return
                default:
                    return
            }
        }
        if(target.name === 'doubleCheck') pwHtRef.current.innerText = '꼭 입력해주세요!'
        else htRef.current.innerText = pathnameCheck ? '꼭 입력해주세요!' : '입력이 필요해요!'
    }
    return (
        <Container>
            <Title>{title[props.type]}</Title>

            {props.type === 'answer' && pathnameCheck ? 
            <Question>
                <option defaultValue>출생지가 어디인가요?</option>
                <option disabled>아직 다른 질문은 없어요!</option>
            </Question> : '' }

            <input
            {...props.register(props.type, registerOpt[props.type])}
            type={props.type === 'nickname' || props.type === 'answer' ? 'text': props.type}
            autoComplete='off'
            onBlur={blurHandler}
            />
            <HelpText ref={htRef}></HelpText>

            {props.type === 'password' && pathnameCheck ? 
            <>
                <Title>{title[props.type]} 재확인</Title>
                <input
                {...props.register('doubleCheck', registerOpt['doubleCheck'])}
                type={props.type}
                onBlur={blurHandler}
                />
                <HelpText ref={pwHtRef}></HelpText>
            </> : ''}
        </Container>
    )
}

const Container = styled.div`
    margin-bottom: 10px;
    & > * {
        margin-bottom: 5px;
    }
    & > input {
        width: 100%; border: 0;
        padding: 12px;
        border-radius: 25px;
        outline-color: rgb(255,204,204);
    }
    & > p {
        margin-left: 10px;
    }
`
const Title = styled.p`
    font-weight: bold;
`

const HelpText = styled.p`
    height: 20px;
    font-size: 10px;
`

const Question = styled.select`
    appearance: none;
    outline: none;

    padding: 10px;
    border: 1px solid rgb(255,204,204);
    border-radius: 25px;

    & > option {
       background: rgba(255,204,204,.3);
    }
`
export default FormInner