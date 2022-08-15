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

export const errorAlert = (type) => {
    const titleText = {
        '/login': '로그인',
        '/signup': '회원가입'
    }
    return Swal.fire({
        icon: "error",
        title: titleText[type] + " 실패",
        text: "새로 시도하시겠슴까?",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니오",
        reverseButtons: true,
    })
}
