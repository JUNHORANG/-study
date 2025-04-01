(function () {
  const bio = document.getElementById('bio');  // 자기 소개 입력 필드
  const bioCounter = document.getElementById('bio-count');  // 남은 글자 수를 표시하는 카운터

  const updateCounter = () => {
    const count = 140 - bio.value.length;  
    let status = ''; 

   
    if (count < 0) {
      status = 'error';
    } 
   
    else if (count >= 50) {
      status = 'warn';
    } 
   
    else{
      status = 'good';
    }

    
    bioCounter.classList.remove('error', 'warn', 'good', 'hide');
   
    bioCounter.classList.add(status);
   
    bioCounter.textContent = count;
  }

  // 입력 필드에 포커스가 될 때 카운터를 표시하고, 남은 글자 수에 따라 클래스 업데이트
  bio.addEventListener('focus', updateCounter);
  bio.addEventListener('keyup', updateCounter);  // 키를 입력할 때마다 카운터를 업데이트

  // 입력 필드를 벗어날 때, 글자 수가 너무 많지 않으면 카운터 숨기기
  bio.addEventListener('blur', () => {
    if (parseInt(bioCounter.textContent) >= 0) {  // 카운터에 음수 값이 아니면
      bioCounter.classList.add('hide');  // 카운터 숨김
    }
  });

}());


