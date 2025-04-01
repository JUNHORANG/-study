
(function () {
  const birth = document.getElementById('birthday');  // 생일 입력 창
  const parentsConsent = document.getElementById('parents-consent');  // 부모 동의 체크 상자
  const consentContainer = document.getElementById('consent-container');  // 체크 상자 부모 요소

  birth.setAttribute('type', 'date');  

 
  const checkDate = (event) => {
    const dob = event.target.value.split('-');  
    console.log(dob)
    
    toggleParentsConsent(new Date(dob[0], dob[1] - 1, dob[2]));
  }


  birth.addEventListener('blur', checkDate);
  birth.addEventListener('change', checkDate);

  const toggleParentsConsent = (date) => {
    if (isNaN(date)) return;  // 유효하지 않은 날짜가 들어오면 함수 종료
    const now = new Date();  // 현재 날짜를 가져옴
    
    if ((now - date) < (1000 * 60 * 60 * 24 * 365 * 13)) { 
      consentContainer.classList.remove('hide'); 
      parentsConsent.focus(); 
    } else {
      consentContainer.classList.add('hide');  
      parentsConsent.checked = false;  // 부모 동의 체크 상자 해제
    }
  }
}());
