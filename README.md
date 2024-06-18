# MyeongEun - 개인프로젝트 기록

### 24.5.30 프로젝트 생성 및 기본환경 구성

### 24.5.31 Back-End DBMS 설치 및 연결 테스트

### 24.6.2 할일앱 만들기
````
1) 백엔드 준비
CRUD 내용 정리
C: 할일을 추가할 수 있다. (/tasks post)
R: 할일 리스트를 볼 수 있다. (/tasks get)
U: 할일에 대해서 끝남/안끝남 표시를 할 수 있다. (/tasks/:id put)
D: 할일을 삭제할 수 있다. (tasks/:id delete)

2) back-end 라우터 주소 정의
3) 데이터베이스 정의
4) 기능정의: CRUD
5) 테스트: 포스트맨
````

### 24.6.11 JWT Token Error
````
jwt 토큰
생성할 때 사용되는 비밀키(sign)와
검증할 때 사용되는 비밀키(verify)가 계속 불일치하여
"JsonWebTokenError: invalid signature" 오류가 발생.

24.6.11 ~ 24.6.17까지 확인해본 내용
1. env 파일 내용 제대로 읽어오는지 확인 (파일 내용 설정도 제대로 되어있는지도 확인함)
2. 생성, 검증 둘 다 하드코딩하여 시도해보기
3. 토큰 형식이 정상인지 확인 (Bearer 문자열 포함되어 있는지 확인함)
4. 토큰 생성 코드와 검증 코드에서 console.log를 통하여 내용 직접 확인
     4-1. 토큰 생성 코드 = User.js > User.prototype.generateToken...
     4-2. 토큰 검증 코드 = auth.controller.js > authController.authenticate...
````
