import styled from "styled-components"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import Layout from "../components/common/Layout"
import { checkPassword, getUserInfo, modifyUserInfo, deleteUser } from "../api/mypageAPI"
import Header from "../components/Header"
import { errorAlert, modalAlert, successAlert } from "../util/swal"
import { DELETE_TOKEN } from "../redux/modules/user"
import { removeCookie } from "../util/cookie"

const MyPage = () => {
    const [email, setEmail] = useState("")
    const [nickname, setNickname] = useState("")
    const [answer, setAnswer] = useState("")
    const [flag, setFlag] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register, handleSubmit, formState : { isSubmitting }} = useForm()
    
    const toggleModify = (event) => {
        event.preventDefault()
        if(flag) {
            modalAlert('password').then(result => {
                if(result.isConfirmed) {
                    checkPassword(result.value).then((answer) => {
                        if(answer.result){
                            setFlag(!flag)
                        }
                        else {
                            errorAlert('modify', answer.message)
                        }
                    })
                }
            })
        }
        else {
            setFlag(!flag)
        }
    }

    const deleteUserHandler = (event) => {
        event.preventDefault()
        modalAlert('delete').then(result => {
            if(result.isConfirmed) {
                deleteUser(result.value).then((answer) => {
                    if(answer.result){
                        dispatch(DELETE_TOKEN())
                        removeCookie('refreshToken')
                        navigate('/')
                    }
                    else {
                        errorAlert('delete', answer.message)
                    }
                })
            }
        })
    }

    const modifyDataHandler = (data) => {
        const submitData = {
            nickname,
            answer,
            password: undefined
        }
        for(let key in data) {
            if(data[key]) {
                submitData[key] = data[key]
            }
        }
        modifyUserInfo(submitData).then(answer => {
            if(answer.result) {
                successAlert('modify')
            }
            else {
                errorAlert('modify2', answer.message)
            }
            setFlag(!flag)
        })
    }

    useEffect(() => {
        getUserInfo().then(result => {
            setEmail(result.email)
            setNickname(result.nickname)
            setAnswer(result.answer)
        })
    }, [])

    return (
        <MyPageLayout>
            <Header/>
            <UserInfoArea onSubmit={handleSubmit(modifyDataHandler)}>
                <div className="fcc" style={{justifyContent: 'flex-start'}}>
                    <Profile src="https://t1.daumcdn.net/cfile/tistory/99E4E74F5F0FAA4E1E"/>
                    <UserInfo bgColor={flag ? 'inherit' : 'white'}>
                        <li>
                            <p>이메일</p>
                            <input 
                            {...register('email')}
                            disabled
                            defaultValue={email}/>
                        </li>
                        <li>
                            <p>비밀번호 찾기 질문</p>
                            <input 
                            {...register('answer')}
                            disabled={flag}
                            defaultValue={answer}/>
                        </li>
                        <li>
                            <p>닉네임</p>
                            <input 
                            {...register('nickname')}
                            disabled={flag}
                            defaultValue={nickname}/>
                        </li>
                        <li style={{opacity: flag ? 0 : 1}}>
                            <p>새 비밀번호</p>
                            <input 
                            {...register('password')}
                            type="password"
                            placeholder="변경이 필요할때만 기입!"
                            disabled={flag}/>
                        </li>
                    </UserInfo>
                </div>
                <BtnArea className="fcc">
                    <InputBtn onClick={toggleModify}>{flag ? '수정' : '취소'}</InputBtn>
                    <InputBtn onClick={flag ? deleteUserHandler : null} disabled={isSubmitting}>{flag ? '탈퇴' : '완료'}</InputBtn>
                </BtnArea>
            </UserInfoArea>

            <div style={{marginTop: '30px'}}></div>

        </MyPageLayout>
    )
}

const MyPageLayout = styled(Layout)`
    flex-flow: column;
`

const UserInfoArea = styled.form`
    display: flex; justify-content: space-between; align-items: center;
    width: 100%;
    padding: 30px;
    box-shadow: 0 0 5px 0 rgb(255,204,204);
    border-radius: 25px;
`

const Profile = styled.img`
    width: 150px; height: 150px;
    border: 1px solid rgb(255,204,204);
    border-radius: 50%;
`

const UserInfo = styled.ul`
    width: 500px;
    display: flex; flex-wrap: wrap;
    list-style: none;
    li { margin: 0 10px 10px 0; }
    p { font-weight: bold; font-size: 20px; }
    input {
        text-overflow: ellipsis;
        width: 200px;
        height: 30px;
        padding: 10px;
        border: 0;
        border-radius: 25px;
        background: rgba(255,204,204,.3);
        font-weight: bold;
    }
    input:disabled {
        color: rgb(255,204,204);
        background: inherit;
    }
`

const BtnArea = styled.div`
    width: 150px;
    height: 100px;
    flex-flow: wrap;
`

const InputBtn = styled.button`
    cursor: pointer;
    width: 80px;
    height: 30px;

    border: 2px solid rgb(255,204,204);
    border-radius: 25px;
    background: rgb(255,204,204);

    font-weight: bold;
    color: white;
    &:hover {
        background: white;
        color: rgb(255,204,204);
    }
`

export default MyPage