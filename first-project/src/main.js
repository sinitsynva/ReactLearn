"use strict"
//import {InputButton} from 'calculateButton.js';


document.body.style.backgroundColor = "peachpuff";
let inputValue = "";
//let operand = "";
//let whatDo = "";
let inpButtonArr = ["9","8","7","6","5","4","3","2","1","0",".",];
let actionSignArr = ["+","-","/","*",];
let anothetAction = ["=","Backspace"];

class InputString {
  constructor(parentElement){
    this.inputString = document.createElement("input");
    this.inputString.name = "calcString";
    this.inputString.type = "text";
    this.inputString.style = "width: 200px";
    this.inputString.id = "inputString";
    this.inputString.value = inputValue;
    calculate.prepend(this.inputString);
    this.element = document.getElementById(this.inputString.id);
    this.buttonAndActionArr = ["9","8","7","6","5","4","3","2","1","0",".","+","-","/","*","=","Backspace","Delete",]
  }
  setNewValue(value) {this.element.value = value}
  deleteValue() {this.element.value = ""}
  checkValue(value) {return this.buttonAndActionArr.includes(value,0)}
  changeInputStr(value) {
    if (this.checkValue(value)) {
      this.inputString.value = this.element.value;
      this.inputString.value += String(value);
      this.element.value = this.inputString.value;
    }
  }
  cleareInputStr() {
    this.element.value = ""
  }
};

let inputString = new InputString(calculate);

//Кастомный класс для кнопок
class CostomButton extends HTMLButtonElement {
  constructor(attributIs) {
    super();
    this.attributIs = attributIs;
    this.elem = document.getElementById('inputString');
    this.inpButtonArr = ["9","8","7","6","5","4","3","2","1","0",".",];
    this.actionSignArr = ["+","-","/","*",];
    this.anothetAction = ["=","Backspace"];
    //this.inputValue = "";
  }


  checkInput(key) {
    return this.inpButtonArr.includes(key,0) || this.actionSignArr.includes(key,0) || this.anothetAction.includes(key,0);
  }

  chekInputStringAdd(value) {
    let isCheck = this.checkInput(value);
    if (value == "." && isCheck) {
      isCheck = this.elem.value.includes(".",0);
    }
    else isCheck = false;
    return isCheck == false;
  }

  changeInputStr(value, inputValue) {
    if (this.chekInputStringAdd(value)) {
      inputValue = this.elem.value;
      inputValue += String(value);
      this.elem.value = inputValue;
    }
    return inputValue
  }

  cleareInputStr() {
    this.elem.value = ""
  }

  reWriteInputStr(value) {
    this.cleareInputStr();
    this.changeInputStr(value);
  }

  saveOperandAndCleareStr() {
    this.saveOperand();
    this.cleareInputStr();
  }

  calculateVal() {
    let calculateStr = 'return ' + this.elem.value;
    let getResultFromStr = new Function(calculateStr);
    this.reWriteInputStr(getResultFromStr(calculateStr));
  }

  cleareAll() {
    this.cleareInputStr();
    //this.changeInputStr("");
  }
  addListener(id,inpFunction) {
    let btn = document.getElementById(id);
    let listener = new Function(inpFunction)
    btn.onclick = () => {listener()}
  }
  addElem(parentElement, buttonName, buttonClass, btnListner) {
    let addString = '<button is="' + this.attributIs + '" id="b' + buttonName + '" type="button" class="' + buttonClass + '">' + buttonName + '</button>';
    parentElement.insertAdjacentHTML("beforeend", addString);
    this.addListener('b'+buttonName, btnListner);
    return buttonName ;
  }

};

//Кнопки ввода
customElements.define("costom-button", CostomButton, {extends: 'button'});
let inpButton = new CostomButton("costom-button");

//Добавим кнопки 0-9 в DOM // TODO: убрать eventListner из конструктора, вынести в функцию на вход принимющую объект класса сторки ввода
inpButtonArr.forEach((item, index, array)=>inpButton.addElem(calculate, `${item}`,'numButton', "inputString.changeInputStr('"+`${item}`+ "')"));
actionSignArr.forEach((item, index, array)=> inpButton.addElem(calculate, `${item}`,'numButton',"inputString.changeInputStr('"+`${item}`+ "')"));

//Кнопка сброса
let cleareButton = new CostomButton("costom-button");
cleareButton.addElem(calculate, 'Очистить','calcButton',"inputString.cleareInputStr()");

//Класс кнопки =
class ResultButton extends CostomButton {
  constructor(attributIs) {
    super(attributIs);
    this.addEventListener('click', () => {
      this.calculateVal();
      //this.saveWhatDo("")
    });
  };
};
customElements.define('calc-button', ResultButton, {extends: 'button'});
let resultButton = new ResultButton("calc-button");
resultButton.addElem(calculate, '=','calcButton');



let buttHTML;
//класс для кнопки изменения цвета калькулятора
class ChangeColorButton extends HTMLButtonElement {
constructor() {
  super();
  this.addEventListener('click', () => calculate.style.backgroundColor = prompt('background color?', 'red'));
};
};
customElements.define('change-collor', ChangeColorButton, {extends: 'button'});

//Добавим кнопки в DOM
calculate.insertAdjacentHTML("beforeend", `<button is="change-collor" id="colorButton" type="button" class="colorButton">
    Цвет калькулятора
  </button>`);
  let checkInput = (key) => inpButtonArr.includes(key,0) || actionSignArr.includes(key,0) || anothetAction.includes(key,0);
  inputString.element.onkeydown = () => {let isCheck =  inputString.checkValue(event.key);
                          switch(isCheck) {
                              case true: {if (event.key == "=") {resultButton.calculateVal();
                                                               //saveWhatDo("");
                                                              isCheck=false;
                                                            }
                                        else isCheck=true;
                                      };
                                break;

                                           };
                          return isCheck};
