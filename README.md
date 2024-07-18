
### 💙  우행시 💙
> ‘우행시’는
**우리FISA의 행복한 시간**의 줄임말로 우리 FISA 3기분들이 자기개발하는 **시간을 측정하고 기록하여** <br>
재미있는 선의의 경쟁을 할 수 있는 웹 서비스입니다! <br>
배포 링크: [Click!](https://woorifisa-service-dev-3rd.github.io/frontend-1st-woohaengshi/)
> 



<br>

### 💙  서비스 소개 💙
![ezgif-4-ab8eb7baf7](https://github.com/user-attachments/assets/178e94cf-648d-4d3b-89d1-5c971ffe4fbd)
<br><br>

### 💙  이용 방법 💙
<img width=800px src="https://github.com/user-attachments/assets/b5d300f4-778d-4983-9129-e69c3a6516a2">
<img width=800px src="https://github.com/user-attachments/assets/c4586f30-75b2-4617-a1d6-c27180aaaff6">
<img width=800px src="https://github.com/user-attachments/assets/da35bb36-fab1-422c-9499-15c512981eb9">


<br>

 - L1: 과목 선택 및 추가하기
 - L2: 재생/정지 버튼을 클릭해서 시간 측정하기
 - L3: 랭커 확인하기
 - L4: 나머지 등수 확인하기
 - L5: 이름으로 검색하기
 - L6: 학습한 과목 확인하기
 - L7: 총/평균 시간 확인하기
 - L8: 달력으로 학습기록 확인하기

<br>

### 💙 UI 스타일 가이드라인  💙
![스타일 가이드 (github 용) 무시하세요](https://github.com/user-attachments/assets/50fdb176-756b-4ec9-85d2-a90d75b0e2f9)

<br>

### 💙 ESLint 룰셋 목록 💙
```
 {
     rules: {
         semi: ['error', 'always'],
         quotes: ['warn', 'single'],
         'no-unused-vars': 'warn',
         indent: ['error', 4],
     },
 }
```
#### 1. `semi`
**설정:** `"semi": ["error", "always"]` <br>
**이유:** 모든 문장 끝에 세미콜론을 사용하도록 강제. 자동 세미콜론 삽입(ASI)로 인한 예기치 않은 동작을 방지할 수 있기 때문에 추가.
#### 2. `quotes`
**설정:** `"quotes": ["error", "single"]` <br>
**이유:** 코드 내에서 일관된 따옴표 스타일을 유지. 'single'로 통일하기 위해 추가.
#### 3. `no-unused-vars`
**설정:** `"no-unused-vars": "warn"` <br>
**이유:** 선언했지만 사용하지 않은 변수가 있으면 경고를 해줌. 불필요한 코드와 잠재적인 버그를 방지하기위해 추가.
#### 4. `indent`
**설정:** `"indent": ["error", 4]` <br>
**이유:** 코드 가독성과 일관성을 위해 들여쓰기를 4칸으로 통일. 


<br>

### 💙 Lighthouse 성능 지표 💙
#### 개선 전
 - 문제점: <img> 태그에서 alt 누락
<img width=800px src="https://github.com/woorifisa-service-dev-3rd/frontend-1st-woohaengshi/assets/23547185/890129f5-fdc6-4a64-96f4-93e88309acab">
<img width=800px src="https://github.com/woorifisa-service-dev-3rd/frontend-1st-woohaengshi/assets/23547185/d1c42379-833a-44ca-8443-9a789a118494">

#### 개선 후
<img width=800px src="https://github.com/woorifisa-service-dev-3rd/frontend-1st-woohaengshi/assets/23547185/84455224-1711-40f6-8679-8e54cca17043">

<br>


### 💙 Commit 방법 💙  
꼭 다음의 방법을 따라서 커밋할 필요는 없지만, 알아보기 쉽게하기 위함.
\
커밋의 제목은 타입을 기재 후 간단한 요약(명령조)을 기재 함.
\
본문 작성시 자세한 내용을 누구든 알아볼 수 있기 기재 함(어떻게 보다 **왜**에 초점을 맞춰 작성).
\
**타입은 다음과 같음.**
* feat : 새로운 기능 추가
* fix : 버그 수정
* docs : 문서 수정
* style : 코드 formatting, 세미콜론(;) 누락, 코드 변경이 없는 경우
* refactor : 코드 리팩터링
* test : 테스트 코드, 리팩터링 테스트 코드 추가(프로덕션 코드 변경 X)
* chore : 빌드 업무 수정, 패키지 매니저 수정(프로덕션 코드 변경 X)
* design : CSS 등 사용자 UI 디자인 변경
* comment : 필요한 주석 추가 및 변경
* rename : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
* remove : 파일을 삭제하는 작업만 수행한 경우
* !BREAKING CHANGE : 커다란 API 변경의 경우
* !HOTFIX : 급하게 치명적인 버그를 고쳐야 하는 경우

예시
feat : 타워 추가
