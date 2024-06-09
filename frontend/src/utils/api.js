import axios from "axios";

// 기본 API 인스턴스 생성
const api = axios.create({
    // 백엔드 API의 기본 URL
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
    },
});

// 요청 인터셉터 // 요청을 가로채서 처리할 수 있도록 하는 함수
api.interceptors.request.use(
    (request) => {
        // console.log("Starting Request", request);
        return request;
    },
    function (error) {
        console.log("REQUEST ERROR", error);
    }
);

// 응답 인터셉터 // 응답을 가로채서 처리할 수 있도록 하는 함수
api.interceptors.response.use(
    (response) => {
        // console.log("Response:", response);
        return response;
    },
    function (error) {
        error = error.response.data;
        console.log("RESPONSE ERROR", error);
        return Promise.reject(error);
    }
);

// API 클라이언트 내보내기
export default api;