(function () {
  const password = document.getElementById('password');  // 비밀번호 입력 창
  const passwordConfirm = document.getElementById('conf-password');  // 비밀번호 확인 입력 창

  // 비밀번호 입력창에서 오류 하이라이터 제거
  const removeErrorHighlighter = (e) => {
   
    const target = e.target; 
    if (target.className === 'fail') {  // fail 클래스가 있다면
      target.classList.remove('fail');  // fail 클래스 제거
    }
  };

  // 비밀번호 입력창에서 오류 하이라이터 설정
  const setErrorHighlighter = (e) => {
    
    const target = e.target;  
    if (target.value.length < 8) {  // 비밀번호가 8자 미만일 경우
      target.classList.add('fail');  // fail 클래스 추가
    } else {
      target.classList.add('pass');  // pass 클래스 추가
    }
  };

  // 비밀번호 확인이 일치하는지 확인하는 함수
  const passwordsMatch = (e) => {
    
    const target = e.target;  // 
    if (password.value === target.value && target.value.length >= 8) {
      target.classList.add('pass');  // 비밀번호가 일치하면 pass 클래스 추가
    } else {
      target.classList.add('fail');  // 비밀번호가 일치하지 않으면 fail 클래스 추가
    }
  };

  // 이벤트 리스너 추가
  password.addEventListener('focus', removeErrorHighlighter);  // focus 시 오류 하이라이터 제거
  password.addEventListener('blur', setErrorHighlighter);  // blur 시 오류 하이라이터 설정
  passwordConfirm.addEventListener('focus', removeErrorHighlighter);  // focus 시 오류 하이라이터 제거
  passwordConfirm.addEventListener('blur', passwordsMatch);  // blur 시 비밀번호 확인 일치 여부 확인
}());

