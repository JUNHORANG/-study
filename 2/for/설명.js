// break : 반복문 즉시 종료

// continue : 해당 반복턴을 한번 건너뛰고 다음 반복 실행

// for : 정해진 횟수만큼 반복,
// 구문 : for(초기값, 조건식, 증감값){}

// while : 특정 조건이 true 일 때 반복, 조건을 먼저 검사
// 구문 : while(조건){}

// do while : 무조건 최소 한번 실행 후 조건 검사
// do {
//   실행
// } while (조건)

// for in : 객체{}의 속성을 반복 key를 기준으로 객체 길이만큼 반복
// 구문 : for(let 키값 in 객체){}

// for of : 문자열 혹은 배열의 요소를 배열 길이만큼 반복
// 구문 : for(let 요소 of 배열){}

//forEach : 배열의 각 요소를 반복하여 실행 할 때, 중간에 반복을 종료할 수 없다
//배열.forEach((요소,인덱스,배열)=>{})


//클로저

function outerFc(){

  let localValue = "outerFc 안의 지역 변수를 참조 합니다.";

  return function closureFc(){
    console.log(localValue);
  }
}

const globalFc = outerFc();

globalFuc();//"outerFc 안의 지역 변수를 참조 합니다."

// 일급 객체(first-class object) : 일급 객체는 함수가 다른 데이터형 처럼 변수나 매개변수, 배열의 값, 반환값으로 사용 할 수 있는 객체를 말한다.
// 중첩 함수 : 함수 안에 함수를 선언할 수 있는 함수
// 고차 함수 : 다른 함수를 매개변수로 받거나 반환값으로 내놓는 함수