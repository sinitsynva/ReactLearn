import './Calc.css';
import React, {Component} from 'react';
import Button from './Button/Button';
import InputString from './InputString/InputString'

class Calc extends Component {
  state ={
    inputButtons:["9","8","7","6","5","4","3","2","1","0",".","+","-","/","*"],
    actionButton:["=","Backspace"],
    inputStringValue: "0"
  }

  isExpCorrect = (expration) =>{
    const rongSimbol = /[^0-9.+///*eе()/-]/;
    const withOutNumber = /[+//*-]+[+//*-]+/;
    const pointWithOutNum = /[.]{1,}[^0-9]/;
    const rongBigNum = /[^0-9][eе][+][^0-9]/;
    const moreThenOnePoint = /[.][0-9][.]/;


    if (rongSimbol.test(expration)){console.log(rongSimbol);
      return false
    }else if (withOutNumber.test(expration)){ console.log(withOutNumber);
      return false
    }else if (pointWithOutNum.test(expration)){console.log(pointWithOutNum);
      return false
    }else if (rongBigNum.test(expration)) {console.log(rongBigNum);
      return false
    }else if (moreThenOnePoint.test(expration)){console.log(moreThenOnePoint);
      return false
    }else return true;
  }

  changeInputStr = (value) => {
    console.log(value);
    let newState = (value==="")?"0":
      (value==="0" || !/^0/.test(value) || !/^[0-9]/.test(value.substr(1)))?value:
      value.substr(1);

    if (this.isExpCorrect(value)){
      this.setState({
        inputStringValue:newState
      })
    }else {alert('Введенное выражение не корректно')};
  }

  inpButtonHandler = (addValue) => {
    let currentState = this.state.inputStringValue;
    console.log(/*[^0-9]/.test(*/currentState.substr(currentState.lenghth-1));
    if (addValue==="="){
      let calculateExpr = 'return ' + currentState
      let calculate = Function(calculateExpr)
      this.changeInputStr(String(calculate()))
    }else if (addValue==="<-") {
      this.changeInputStr(currentState.substr(0, currentState.length-1))
    }else if (addValue==="C"){
      this.changeInputStr("")
    }else if (addValue==="." && /[^0-9]/.test(currentState.substr(currentState.lenghth-1))){
      this.changeInputStr(currentState + "0" + addValue)
    }else{
      let newState = currentState + addValue;
      this.changeInputStr(newState);
    }
  }

  inputStringHandler = (event) => {
    const regResult = /[=]/;

    if (regResult.test(event.target.value)) {
      this.inpButtonHandler("=")
    } else {this.changeInputStr(event.target.value)};
  }

  render() {
    const divClass = "Calc"
    const divId = "calculate"
    const inpButton = this.state.inputButtons
    const actButton = this.state.actionButton
    const inpValue = this.state.inputStringValue

    let result = <div id={divId} className={divClass}>
                  <InputString onChange={this.inputStringHandler} name="inputString" id="input" value={inpValue} />
                  {inpButton.map((inputButton, index) => {return (<Button onClick={this.inpButtonHandler.bind(this, inpButton[index])} name={inpButton[index]} key={index} />)})}
                  <Button onClick={this.inpButtonHandler.bind(this, "C" )} name="C" />
                  <Button onClick={this.inpButtonHandler.bind(this, actButton[0])} name={actButton[0]} />
                  <Button onClick={this.inpButtonHandler.bind(this, "<-" )} name="<-" />
                </div>
    return result
  }
}

export default Calc;
