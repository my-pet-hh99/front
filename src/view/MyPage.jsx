import styled from "styled-components"

import Layout from "../components/common/Layout"

const MyPage = () => {
    return(
        <MyPageLayout>
            <UserInfoArea>
                <div className="fcc">
                    <Profile src="data:image/jpeg;base64,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"/>
                    <UserInfo>
                        <li>
                            <p>이메일</p>
                            <input value="test@test.com"/>
                        </li>
                        <li>
                            <p>닉네임</p>
                            <input value="닉네임입니다."/>
                        </li>
                    </UserInfo>
                </div>
                <div className="fcc" style={{height: "100px", alignItems: "flex-end"}}>
                    <button>수정</button>
                    <button>탈퇴</button>
                </div>
            </UserInfoArea>
            <div>여긴 내게시글 목록임</div>
        </MyPageLayout>
    )
}

const MyPageLayout = styled(Layout)`
    margin-top: 30px;
    flex-flow: column;
`

const UserInfoArea = styled.div`
    display: flex; justify-content: space-between; align-items: center;
    width: 100%;
    padding: 30px;
    background: rgba(0,0,0,.3);
    box-shadow: 0 0 5px 0;

`

const Profile = styled.img`
    width: 150px; height: 150px;
    border: 1px solid rgba(0,0,0,.3);
    border-radius: 50%;
`

const UserInfo = styled.ul`
    list-style: none;
    li { margin-bottom: 10px; }
    p { font-weight: bold; font-size: 20px; }
    input {
        border: 0;
        background: inherit;
    }
`

export default MyPage