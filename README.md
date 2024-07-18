
### 💙  우행시 💙
> ‘우행시’는
**우리FISA 행복한 시간**의 줄임말로 우리 FISA 3기분들이 자기개발하는 **시간을 측정하고 기록하여** <br>
재미있는 선의의 경쟁을 할 수 있는 웹 서비스입니다! <br>
배포 링크: [Click!](https://woorifisa-service-dev-3rd.github.io/frontend-1st-woohaengshi/)
> 



<br>

### 💙  서비스 소개 💙
![_2024_07_11_15_20_07_752-ezgif com-video-to-gif-converter](https://github.com/woorifisa-service-dev-3rd/frontend-1st-woohaengshi/assets/23547185/e57ac625-67a1-47cf-b732-6fa20963e061)
<br><br>

### 💙  이용 방법 💙
<img width=800px src="https://github.com/woorifisa-service-dev-3rd/frontend-1st-woohaengshi/assets/23547185/f5134f7f-4d72-4b6a-ace8-945ce9d69989">
<img width=800px src="https://github.com/woorifisa-service-dev-3rd/frontend-1st-woohaengshi/assets/23547185/9fe1a885-7325-4bea-a13b-bbcdfb9bd2e3">
<img width=800px src="https://github.com/woorifisa-service-dev-3rd/frontend-1st-woohaengshi/assets/23547185/27adf6ba-a590-43e5-ab8c-615fad7d6687">


<br>

 - L1: 과목 선택하기
 - L2: 재생/정지 버튼을 클릭해서 시간 측정하기
 - L3: 랭커 확인하기
 - L4: 나머지 등수 확인하기
 - L5: 과목별로 학습한 시간 확인하기
 - L6: 총/평균 시간 확인하기
 - L7: 학습일 달력으로 확인하기

<br>

### 💙 UI 스타일 가이드라인  💙
![스타일 가이드 (github 용) 무시하세요](https://github.com/woorifisa-service-dev-3rd/frontend-1st-woohaengshi/assets/23547185/462d0519-41b3-4d19-b877-48e34640e4ae)

<br>

### 💙 ESLint 룰셋 목록 💙
```json
{
  "rules": {
    "no-unused-vars": "warn",
    "eqeqeq": ["error", "always"],
    "curly": ["error", "all"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-console": "warn",
    "indent": ["error", 2],
    "no-undef": "error",
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "no-trailing-spaces": "error"
  }
}
```
#### 1. `no-unused-vars`
**설정:** `"no-unused-vars": "warn"` <br>
**이유:** 선언했지만 사용하지 않은 변수가 있으면 경고를 해줌. 불필요한 코드와 잠재적인 버그를 방지하기위해 추가.
#### 2. `eqeqeq`
**설정:** `"eqeqeq": ["error", "always"]` <br>
**이유:** 동등 비교할 때 `==` 대신 `===`를 사용하도록 강제. 타입 변환 없이 비교를 해서 의도치 않은 결과를 방지할 수 있어서 추가.
#### 3. `curly`
**설정:** `"curly": ["error", "all"]` <br>
**이유:** 모든 제어문(if, else, while 등)에 중괄호를 사용하도록 강제. 중괄호를 생략하면 가독성이 떨어지고, 버그가 발생할 수 있기 때문에 추가.
#### 4. `quotes`
**설정:** `"quotes": ["error", "single"]` <br>
**이유:** 코드 내에서 일관된 따옴표 스타일을 유지. 주로 'single'이나 "double" 중 하나로 통일하기 위해 추가.
#### 5. `semi`
**설정:** `"semi": ["error", "always"]` <br>
**이유:** 모든 문장 끝에 세미콜론을 사용하도록 강제. 자동 세미콜론 삽입(ASI)로 인한 예기치 않은 동작을 방지할 수 있기 때문에 추가.
#### 6. `no-console`
**설정:** `"no-console": "warn"` <br>
**이유:** 디버깅을 위한 `console.log`를 사용한 후, 이를 제거하지 않으면 배포된 코드에 남아 있을 수 있음. 경고해주기 위해 추가.
#### 7. `indent`
**설정:** `"indent": ["error", 2]` <br>
**이유:** 코드 들여쓰기를 2칸으로 통일. 들여쓰기는 코드 가독성에 큰 영향을 미치니까, 일관성을 유지하기 위해 추가.
#### 8. `no-undef`
**설정:** `"no-undef": "error"` <br>
**이유:** 선언되지 않은 변수를 사용하는 것을 방지. 이는 코드 실행 시 발생할 수 있는 오류를 사전에 막아주기 때문에 추가.
#### 9. `no-multiple-empty-lines`
**설정:** `"no-multiple-empty-lines": ["error", { "max": 1 }]` <br>
**이유:** 여러 개의 빈 줄을 방지해서 코드가 더 깔끔해 보이게 해줌. 빈 줄 하나 정도는 괜찮지만, 여러 개가 되면 가독성이 떨어지기 때문에 추가
#### 10. `no-trailing-spaces`
**설정:** `"no-trailing-spaces": "error"` <br>
**이유:** 라인 끝에 불필요한 공백을 제거. 이런 공백은 코드 가독성을 해치고, 코드 리뷰 시 불필요한 차이를 만들 수 있기 때문에 추가.

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
