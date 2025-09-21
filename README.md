# 퍼블리싱 컨벤션

## 1. 색상 팔레트(변수) 사용

- 색상 변수 명명 규칙: `c` + `HEX코드`
  - 예시: `cFFFFFF` (흰색), `c000000` (검은색)
  - `c`는 color의 약자

## 2. 반응형 및 극한 상황 대응

### 모바일
- 최소 너비 기준: 320px ~ 360px (갤럭시 폴드 등 고려)
- 모든 레이아웃은 최소 너비에서도 정상 작동해야 함

### PC
- 와이드 모니터: 초광각 모니터에서도 콘텐츠가 적절히 표시
- 버티컬 모니터: 세로 방향이 극단적으로 긴 경우에도 대응
- 다양한 해상도와 비율에서 테스트 필수

## 3. z-index 사용 지침

- z-index 사용 최소화
- 요소의 우선순위는 HTML 구조상 위치로 제어
- 불가피한 경우에만 z-index 사용

## 4. CSS 클래스 네이밍 컨벤션

- 축약어 및 줄임말 사용 금지
- 요소의 기능과 목적을 명확히 나타내는 이름 사용
- 예시:
  - ❌ `info-sec`, `btn-grp`
  - ✅ `information-section`, `button-group`

### 네이밍 예시
- 헤더: `header-navigation`
- 소개 섹션: `information-section`
- 상품 카드: `product-card`
- 모달 팝업: `modal-popup`

## 5. 클래스명 구분자 규칙

- 단어 구분은 하이픈(`-`)을 사용
- 언더스코어(`_`), 카멜케이스 사용 금지
- 예시:
  - ❌ `mainHeader`, `main_header`, `MainHeader`
  - ✅ `main-header`
  - ❌ `productListItem`, `product_list_item`
  - ✅ `product-list-item`
  - ❌ `userProfileImage`, `user_profile_image`
  - ✅ `user-profile-image`