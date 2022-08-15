import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from 'react-router-dom'

import Layout from '../components/common/Layout'
import FormInner from '../components/formInner/FormInner'
import { login, signup } from '../api/loginAPI'
import { successAlert } from '../util/swal'

const LoginForm = () => {
    const navigate = useNavigate()
    const pathname = useLocation().pathname
    const pathnameCheck = pathname === '/signup'
    const inputType = pathnameCheck ? ['email', 'nickname', 'password', 'answer'] : ['email', 'password']

    // register : name, 옵션 등 설정가능
    // handleSubmit : submit 이벤트시 콜백 함수 실행(인자값으로 form태그내부 데이터 넘겨줌)
    // formState : form 태그 현재 상태 확인 (제출중인지 등 확인), 외에 register 옵션 메시지를 errors로 받을수 있음
    const {register, handleSubmit, formState: { isSubmitting }} = useForm()

    const submitCallback = (data) => {
        const answer = pathnameCheck ? signup(data) : login(data)
        // answer.then(result => {
        //     const al = result ? successAlert(pathname) : ''
        //     al.then(result => {
        //         if(result.isConfirmed) {
        //             navigate("/")
        //         }
        //     })
        // })
    }

    return (
        <LoginLayout>
            <FormArea onSubmit={handleSubmit(submitCallback)}>
                {inputType.map(type => {
                    return <FormInner 
                    type={type} 
                    register={register}
                    pathnameCheck={pathnameCheck} 
                    key={type}/>
                })}
                <div className='fcc'>
                    <SubmitBtn disabled={ isSubmitting }>{pathnameCheck ? '회원가입' : '로그인'}</SubmitBtn>
                </div>
            </FormArea>
        </LoginLayout>
    )
}

const LoginLayout = styled(Layout)`
    margin-top: 30px;
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

export default LoginForm