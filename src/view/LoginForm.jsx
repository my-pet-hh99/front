import { useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Layout from '../components/common/Layout'
import FormInner from '../components/formInner/FormInner'
import { findPassword, login, signup } from '../api/loginAPI'
import { errorAlert, findPwAlert, successAlert } from '../util/swal'
import { SET_TOKEN } from '../redux/modules/user'
import Header from '../components/Header'

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pathname = useLocation().pathname
    const pathnameCheck = pathname === '/signup'
    const inputType = pathnameCheck ? ['email', 'nickname', 'password', 'answer'] : ['email', 'password']

    // register : name, 옵션 등 설정가능
    // handleSubmit : submit 이벤트시 콜백 함수 실행(인자값으로 form태그내부 데이터 넘겨줌)
    // formState : form 태그 현재 상태 확인 (제출중인지 등 확인), 외에 register 옵션 메시지를 errors로 받을수 있음
    const {register, handleSubmit, reset, formState: { isSubmitting }} = useForm()

    const submitCallback = (data) => {
        const answer = pathnameCheck ? signup(data) : login(data)
        answer
        .then(answer => {
            let isSuccess = answer.result
            if(answer.accessToken) {
                dispatch(SET_TOKEN(answer.accessToken))
            }
            const al = isSuccess ? successAlert(pathname) : errorAlert(pathname, answer.message)
            al.then(result => {
                if(result.isConfirmed) {
                    navigate("/")
                } else {
                    // 아니오 눌렀을때
                }
            })
        })        
    }

    const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    const regPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    const findPw = (event) => {
        event.preventDefault()
        findPwAlert().then((result) => {
            if(result.isConfirmed) {
                if(!result.value) {
                    errorAlert('findPw', '전부 입력해야되요!')
                    return
                }
                else if(!regPw.test(result.value.newPassword) || !regEmail.test(result.value.email)) {
                    errorAlert('findPw', '이메일 혹은 비밀번호 양식이 이상해요!')
                    return
                }
                else {
                    findPassword(result.value).then(answer => {
                        if(answer.result) {
                            successAlert('findPw')
                        }
                        else {
                            errorAlert('findPw', answer.message)
                        }
                    })
                }
            }
        })
    }

    useEffect(() => {
        reset()
    }, [pathnameCheck])

    return (
        <LoginLayout>
            <Header/>
            <FormArea onSubmit={handleSubmit(submitCallback)}>
                {inputType.map(type => {
                    return <FormInner 
                    type={type} 
                    register={register}
                    pathnameCheck={pathnameCheck} 
                    key={type}/>
                })}
                <div className='fcc' style={{flexFlow: 'column'}}>
                    <SubmitBtn disabled={ isSubmitting }>{pathnameCheck ? '회원가입' : '로그인'}</SubmitBtn>
                    { pathnameCheck ? null : <FindPwBtn onClick={findPw}>비밀번호 찾기</FindPwBtn> }
                </div>
            </FormArea>
        </LoginLayout>
    )
}

const LoginLayout = styled(Layout)`
    margin-top: 30px;
    flex-flow: column;
`

const FormArea = styled.form`
    width: 400px;
    padding: 30px;

    border-radius: 25px;
    background: rgba(255,204,204,.3);
    `

const SubmitBtn = styled.button`
    cursor: pointer;
    width: 150px;
    height: 50px;
    
    border: 1px solid rgb(255,204,204);
    border-radius: 25px;
    background: rgb(255,204,204);

    font-weight: bold;
    font-size: 20px;
    color: white;

    &:hover {
        background: white;
        color: rgb(255,204,204);
    }
`

const FindPwBtn = styled.button`
    cursor: pointer;
    margin-top: 10px;
    padding: 0;
    padding-bottom: 5px;
    border: 0;

    font-size: 12px;
    color: rgba(0,0,0,.3);
    text-decoration: underline;

    &:hover {
        color: rgb(255,204,204);
    }
`

export default LoginForm