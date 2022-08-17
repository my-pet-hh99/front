import Swal from "sweetalert2"

export const successAlert = (type) => {
    const titleText = {
        '/login': '로그인',
        '/signup': '회원가입'
    }
    return Swal.fire({
        icon: "success",
        title: titleText[type] + " 성공",
        text: "홈 화면으로 이동합니다",
        confirmButtonText: "이동",
    })
}

export const errorAlert = (type, message) => {
    const titleText = {
        '/login': '로그인',
        '/signup': '회원가입'
    }
    return Swal.fire({
        icon: "error",
        title: titleText[type] + " 실패",
        text: message ,
        showCancelButton: true,
        confirmButtonText: "홈 화면으로 이동",
        cancelButtonText: "재시도",
        reverseButtons: true,
    })
}

export const modalAlert = (type) => {
    const typeCheck = type === 'password'
    return Swal.fire({
        icon: typeCheck ? "info" : "error",
        title: typeCheck ? '수정하실건가요?' : '탈퇴하실건가요..?',
        text: (typeCheck ? '수정을 하시려면' : '탈퇴를 하시려면') + ' 비밀번호를 적어주세요',
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