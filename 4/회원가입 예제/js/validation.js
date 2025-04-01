// 자바스크립트 유효성 검사
// 1. submit 이벤트가 발생하면 익명 함수를 호출
// 2. 기본 검사를 수행하는 함수들을 호출
//3.   추가 검사를 수행하는 함수들을 호출
// 4. 에러메시지를 가져오는/설정하는/보여주는/제거하는 함수들을 정의
// 5. validateType 함수를 통해 데이터의 타입을 정규표현식을 통해 검사하는 객체를 구현


(function () {
  document.forms.register.noValidate = true;

 
  document.querySelector('form').addEventListener('submit', function (e) {
    const elements = this.elements; // 폼 컨트롤의 컬렉션
    const valid = {}; // valid 객체
    let isValid; // isValid: 폼 컨트롤의 유효성 여부
    let isFormValid; // isFormValid: 폼 전체의 유효성 여부
  
    // 기본 검사를 수행한다
    for (let i = 0; i < elements.length; i++) {
      isValid = validateRequired(elements[i]) && validateTypes(elements[i]);
  
      if (!isValid) {
        showErrorMessage(elements[i]); // 에러 메시지를 보여준다
      } else {
        removeErrorMessage(elements[i]); // 에러 메시지를 제거한다
      }
  
      valid[elements[i].id] = isValid; // valid 객체에 요소를 추가한다
    }
  


    // 추가 검사를 실행한다
    // 자기소개
    if (!validateBio()) {
      showErrorMessage(document.getElementById('bio')); // 오류 메시지를 표시한다
      valid.bio = false; // valid 객체를 수정한다
    } else {
      removeErrorMessage(document.getElementById('bio'));
    }
  


    // 비밀번호
    if (!validatePassword()) {
      showErrorMessage(document.getElementById('password')); // 오류 메시지를 표시한다
      valid.password = false; // valid 객체를 수정한다
    } else {
      removeErrorMessage(document.getElementById('password'));
    }

  

    // 부모 동의
    if (!validateParentsConsent()) {
      showErrorMessage(document.getElementById('parents-consent')); // 오류 메시지를 표시한다
      valid.parentsConsent = false; // valid 객체를 수정한다
    } else {
      removeErrorMessage(document.getElementById('parents-consent'));
    }


  
    // 유효성 검사를 통과했는가?
    isFormValid = true; // 초기값을 true로 설정
  
    for (const field in valid) {
      if (!valid[field]) {
        isFormValid = false; // 유효하지 않으면 false로 설정
        break;
      }
    }
  
    // 폼이 유효하지 않으면 전송을 중단한다
    if (!isFormValid) {
      e.preventDefault(); // 폼 전송을 중단한다
      
    }
  });
   // 이벤트 핸들러 종료
 



 // 필수 입력 값 검사 함수
function validateRequired(el) {
  if (isRequired(el)) { // 필수 요소인가?
    const valid = !isEmpty(el); // 값이 비어있지 않은가?
    if (!valid) { // valid 변수 값이 false이면
      setErrorMessage(el, '필수 입력 필드입니다'); // 오류 메시지를 설정한다
    }
    return valid; // valid 변수를 리턴한다
  }
  return true; // 필수 필드가 아니면 true를 리턴한다
}



function isRequired(el) {
  return (typeof el.required === 'boolean' && el.required) || (typeof el.required === 'string');
}

// 요소가 빈 값을 가지고 있는지 확인하는 함수
function isEmpty(el) {
  return !el.value || el.value === el.placeholder;
}

// type 특성에 적합한 값을 가졌는지 검사하는 함수
function validateTypes(el) {
  if (!el.value) return true; // 값이 없으면 true를 리턴한다
  
  const type = el.dataset.type || el.getAttribute('type'); 
  if (typeof validateType[type] === 'function') { // type이 함수일 경우
    return validateType[type](el); // 해당 함수로 유효성 검사한다
  } else {
    return true; // 유효성 검사할 함수가 없으면 true를 리턴
  }
}






/*******************부모동의************************ */
function validateParentsConsent(){
  const parentConsent = document.getElementById('parents-consent');
  const consentConsent = document.getElementById('consent-container');
  let valid =true;
  if(!consentConsent.classList.contains('hide')){
      valid = parentConsent.checked;

      if (!valid) {
          setErrorMessage(parentConsent,'부모님의 동의가 필요합니다')
      }
     }
      return valid;
  }

/*******************자기 소개************************ */
// 자기 소개가 140자를 넘지 않는지 검사하는 함수
function validateBio() {
  const bio = document.getElementById('bio');
  const valid = bio.value.length <= 140; // 길이가 140자 이하인지 확인

  if (!valid) {
    setErrorMessage(bio, '자기 소개는 140자를 넘을 수 없습니다'); // 오류 메시지 설정
  } else  {
    setErrorMessage(bio, ''); 
  }

  return valid; 
}



/*******************비밀번호************************ */
// 비밀번호가 8자 이상이고 두 비밀번호가 일치하는지 확인하는 함수

function validatePassword(e) {

  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('conf-password'); // 비밀번호 확인 필드 가져오기
  const passwordValue = password.value;
  
  // 길이 검증 (8자 이상)
  const lengthValid = passwordValue.length >= 8;
  
  // 비밀번호 확인 필드가 있는 경우에만 일치 여부 검증
  let matchValid = true;
  if (confirmPassword) {
    matchValid = password.value === confirmPassword.value;
    //console.log(matchValid)
  }
  
  // 오류 메시지 설정   
  if (!lengthValid) {
    setErrorMessage(password, '비밀번호는 8자 이상이어야 합니다');
  
  } else if (!matchValid) {
    setErrorMessage(password, '비밀번호가 일치하지 않습니다');
   
  }
  
  
  return lengthValid && matchValid; 
  
}


// 오류 메시지를 설정하는 함수
function setErrorMessage(el, message) {
  el.dataset.errorMessage = message; // 요소에 오류 메시지를 저장
}

// 오류 메시지를 가져오는 함수
function getErrorMessage(el) {
  return el.dataset.errorMessage || el.title; // 오류 메시지나 요소의 title 속성을 가져옴
  
}

// 오류 메시지를 보여주는 함수
function showErrorMessage(el) {
  let errorContainer = el.parentElement.querySelector('.error.message'); // 오류 메시지를 보여줄 요소

  // 오류 메시지를 표시할 요소가 없다면 추가
  if (!errorContainer) {
    errorContainer = document.createElement('span');
    errorContainer.classList.add('error', 'message');
    el.parentElement.insertBefore(errorContainer, el.nextSibling); // 요소 뒤에 삽입
  }

  errorContainer.textContent = getErrorMessage(el); // 오류 메시지 표시
}

// 오류 메시지를 제거하는 함수
function removeErrorMessage(el) {
  const errorContainer = el.parentElement.querySelector('.error.message'); // 오류 메시지를 출력하는 요소
  if (errorContainer) {
    errorContainer.remove(); // 해당 요소를 제거
  }
}



  // 데이터가 유효며 오류 메시지가 설정되지 않았는지 검사

  const validateType = {
    email: function (el) {
      // 입력된 값에 @기호가 있는지 검사하는 정규 표현식
      const valid = /[^@]+@[^@]+/.test(el.value); // 검사 결과를 valid 변수에 저장
      if (!valid) {
        setErrorMessage(el, '올바른 메일 주소를 입력하세요'); // 오류 메시지를 설정
      }
      return valid; // valid 변수 값을 리턴
    },
    
    number: function (el) {
      // 숫자만 있는지 확인하는 정규 표현식
      const valid = /^\d+$/.test(el.value); // 검사 결과를 valid 변수에 저장
      if (!valid) {
        setErrorMessage(el, '올바른 숫자를 입력하세요'); // 오류 메시지를 설정
      }
      return valid; // valid 변수 값을 리턴
    },
    
    date: function (el) {
      // 날짜 형식 검사 (MM/DD/YYYY 또는 YYYY-MM-DD)
      const valid = /^(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(el.value);
      if (!valid) {
        setErrorMessage(el, '올바른 날짜를 입력하세요'); // 오류 메시지를 설정
      }
      return valid; // valid 변수 값을 리턴
    }
  };
  
})();
