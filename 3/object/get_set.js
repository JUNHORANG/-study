//get 속성값을 읽을 때 실행
const numbers = {
  a:1,
  b:2,
  get sum(){
    console.log('sum 함수가 실행');
    return this.a + this.b;
  }
}
console.log(numbers.sum);
numbers.b=5;
console.log(numbers.sum);


//set 속성값을 변경할 때 실행
const dog = {
  _name : "멍멍이",
  set name(value) {
    console.log("강아지 이름은:" + value);
    this._name = value;
  }
}
console.log(dog._name);
dog.name="냥냥이"
console.log(dog._name);