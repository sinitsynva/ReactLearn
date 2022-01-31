import './InputString.css';
import React from 'react';
const inputString = (promps) => {return <input onChange={promps.onChange}  name={promps.name} type="text" value={promps.value} id={promps.id} className="CalcString"/>}
export default inputString;
