import axios from "axios";

/**
 * 저장소
 * "localStorage" vs "sessionStorage"
 * - localStorage : 브라우저를 닫거나 컴퓨터를 재시작해도 데이터가 유지됨.
 *   영구적 저장소
 *   사용 예) 사용자 설정 저장(다크 모드 설정)
 *          인증 토큰 저장(사용자 로그인 상태 유지)
 *          영구적으로 필요한 데이터 저장(쇼핑 카드 정보)
 * - sessionStorage : 데이터가 브라우저 탭이나 창이 닫힐 때 자동으로 삭제됨.
 *   임시적 저장소
 *   사용 예) 임시 데이터 저장(단기 폼 데이터)
 *          보안이 필요한 임시 데이터 저장(일회성 로그인 세션)
 *          세션 중에만 필요한 데이터 저장(현재 페이지 상태)
 * */

// 기본 API 인스턴스 생성
const api = axios.create({
    // 백엔드 API의 기본 URL
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
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