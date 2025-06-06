// onLoad() : 전체 document가 메모리에 모두 로드 되었을 때 함수 호출
function onLoad() {
    // id 패턴검색을 진행할 이벤트 정의
    let idPattern = /^[\w]{3,12}$/;
    let pwPattern = /^[\w]{6,8}$/;
    let namePattern = /^[가-힣]{1,4}$/;
    let nicknamePattern = /^(?=.{2,}$)(?!.*\s)[가-힣a-zA-Z0-9]+$/;
    let telPattern = /^01[016789]-\d{3,4}-\d{4}$/;
    let phoneNumPattern = /^01[016789]-\d{3,4}-\d{4}$/;

    let id = document.querySelector("#id");
    let pw = document.querySelector("#pw");
    let pwCheck = document.querySelector("#pwCheck");
    let name = document.querySelector("#name");
    let nickname = document.querySelector("#nickname");
    let tel = document.querySelector("#tel");
    let phoneNum = document.querySelector("#phoneNum");
    let checkHuman = document.querySelector("#checkHuman");
    let submit = document.querySelector("#submit");
    let addrSearch = document.querySelector("#addrSearch");
    let zipcode = document.querySelector("#zipcode");
    let addr1 = document.querySelector("#addr1");


    id.addEventListener("blur", () => {
        validate(id, idPattern, "영문자, 숫자, _만 입력 가능. 최소 3자이상 12자이하 입력하세요.");
        // if(id.value.match(idPattern)){
        //     id.nextSibling.innerHTML = "성공";  // 아래 else문을 간단히 표현하는 방법
        //     id.nextSibling.style.color = "blue";
        // }else{
        //     let span = document.querySelector("#id + span");
        //     span.innerHTML = "영문자, 숫자, _만 입력 가능. 최소 3자이상 12자이하 입력하세요."
        //     span.style.color = "tomato";
        //     id.value = "";
        //     id.focus();
        // }
    });

    pw.addEventListener("blur", () => {
        validate(pw, pwPattern, "영문자, 숫자, _만 입력 가능. 최소 6자이상 8자이하 입력하세요.");
        // if(pw.value.match(pwPattern)){
        //     pw.nextSibling.innerHTML = "성공";  // 아래 else문을 간단히 표현하는 방법
        //     pw.nextSibling.style.color = "blue";
        // }else{
        //     let span = document.querySelector("#pw + span");
        //     span.innerHTML = "영문자, 숫자, _만 입력 가능. 최소 6자이상 8자이하 입력하세요."
        //     span.style.color = "tomato";
        //     pw.value = "";
        //     pw.focus();
        // }
    });

    pwCheck.addEventListener("blur", () => {
        if (pwCheck.value.match(pwPattern) && pw.value === pwCheck.value) {
            pwCheck.nextSibling.innerHTML = "패스워드 일치";  // 아래 else문을 간단히 표현하는 방법
            pwCheck.nextSibling.style.color = "blue";
            pw.nextSibling.innerHTML = "";
        } else {
            let span = document.querySelector("#pwCheck + span");
            span.innerHTML = "패스워드가 일치하지 않습니다."
            span.style.color = "tomato";
            pwCheck.value = "";
            pwCheck.focus();
        }
    });

    name.addEventListener("blur", () => {
        validate(name, namePattern, "이름은 한글 1자 이상 4자 이하로 입력하세요.");
    });

    nickname.addEventListener("blur", () => {
        validate(nickname, nicknamePattern, "공백 없이 한글 2자 이상 또는 영문 4자 이상 입력하세요.");
    });

    tel.addEventListener("blur", () => {
        validate(tel, telPattern, "전화번호 형식이 맞지 않습니다. 예 : 010-1234-5678");
    });

    phoneNum.addEventListener("blur", ()=> {
        validate(phoneNum, phoneNumPattern, "전화번호 형식이 맞지 않습니다. 예 : 010-1234-5678");
    });

    // 우편번호 이벤트 처리
    addrSearch.addEventListener("click", () => {
        new daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
                if (data !== null && data !== undefined) {
                    console.log('zipcode', data.zonecode);
                    console.log('data.roadAddress', data.roadAddress);
                    zipcode.value = data.zonecode;
                    addr1.value = data.roadAddress;
                } else {
                    addrSearch.nextSibling.innerHTML = "daum api 오류발생으로 직접 입력바람";
                    zipcode.focus();
                }
            }
        }).open();
    });

    // 자동등록 방지
    checkHuman.addEventListener("blur", ()=>{
        let checkHumanStr = "RCAPCb";
        if(checkHuman.value == checkHumanStr){
            checkHuman.nextSibling.innerHTML = "자동등록 문구 일치";  // 아래 else문을 간단히 표현하는 방법
            checkHuman.nextSibling.style.color = "blue";
        }else{
            let span = document.querySelector("#checkHuman + span");
            span.innerHTML = "자동등록 문구가 일치하지 않습니다."
            span.style.color = "tomato";
            checkHuman.value = "";
            checkHuman.focus();
        }
    });

    // 회원가입 전송 기능 점검
    submit.addEventListener("click", function () {
        // id
        let idReturn = validate(id, idPattern, "영문자, 숫자, _만 입력 가능. 최소 3자이상 12자이하 입력하세요.");
        if (idReturn === false) return;
        // pw
        let pwReturn = validate(pw, pwPattern, "영문자, 숫자, _만 입력 가능. 최소 6자이상 8자이하 입력하세요.");
        if (pwReturn === false) return;
        let nameReturn = validate(name, namePattern, "값을 입력하세요.");
        if (nameReturn === false) return;
        alert('서버에 전송');
    });

    // 공동으로 사용되는 함수
    function validate(inputObj, pattern, message) {
        if (inputObj.value.match(pattern)) {
            inputObj.nextSibling.innerHTML = "성공";  // 아래 else문을 간단히 표현하는 방법
            inputObj.nextSibling.style.color = "blue";
            return true;
        } else {
            inputObj.nextSibling.innerHTML = message;
            inputObj.nextSibling.style.color = "tomato";
            inputObj.value = "";
            inputObj.focus();
            return false;
        }
    }

}




