import Swal from "sweetalert2"

export const successAlert = (type) => {
    const titleText = {
        '/login': '로그인',
        '/signup': '회원가입',
        'modify' : '회원수정',
        'delete' : '회원탈퇴',
        'findPw' : '비밀번호 찾기(사실은 변경)'
    }
    return Swal.fire({
        icon: "success",
        title: titleText[type] + " 성공",
        text: (type === 'findPw' || type === 'modify') ? null : "홈 화면으로 이동합니다",
        confirmButtonText: "확인",
    })
}

export const errorAlert = (type, message) => {
    const titleText = {
        '/login': '로그인',
        '/signup': '회원가입',
        'findPw' : '비밀번호 찾기',
        'modify' : '비밀번호 확인',
        'delete' : '회원탈퇴',
        'findPw' : '비밀번호 찾기(사실은 변경)'
    }
    return Swal.fire({
        icon: "error",
        title: titleText[type] + " 실패",
        text: message ,
        showCancelButton: true,
        showConfirmButton: (type === '/login' || type === '/signup'), 
        confirmButtonText: "홈 화면으로 이동",
        cancelButtonText: "재시도",
        reverseButtons: true,
    })
}

export const modalAlert = (type) => {
    const typeCheck = type === 'password'
    return Swal.fire({
        icon: typeCheck ? "info" : "warning",
        title: typeCheck ? '수정하실건가요?' : '탈퇴하실건가요..?',
        text: (typeCheck ? '수정을 하시려면' : '탈퇴를 하시려면') + ' 비밀번호를 제출해주세요',
        input: 'password',
        inputPlaceholder: 'PASSWORD',
        showCancelButton: true,
        confirmButtonText: '제출',
        cancelButtonText: '취소',
        preConfirm: (value) => {
            return value
        }
    })
}

export const findPwAlert = () => {
    return Swal.fire({
        icon: "info",
        title:'비밀번호 찾기',
        html: 
            '<div class="fcc findPwDiv">' + 
            '<p>이메일</p><input autoComplete="off" type="email" id="f_pw_email">' +
            '<p>출생지가 어디인가요?</p><input autoComplete="off" type="text" id="f_pw_answer">' + 
            '<p>새로운 비밀번호</p><input autoComplete="off" type="password" id="f_pw_password">' + 
            '</div>',
        inputPlaceholder: 'PASSWORD',
        showCancelButton: true,
        confirmButtonText: '찾기',
        cancelButtonText: '취소',
        preConfirm: () => {
            if(document.getElementById('f_pw_email').value === '' || document.getElementById('f_pw_answer').value === '' || document.getElementById('f_pw_password').value === ''){
                return null
            }
            return {
                email: document.getElementById('f_pw_email').value,
                answer: document.getElementById('f_pw_answer').value,
                newPassword: document.getElementById('f_pw_password').value,
            }
        }
    })
}