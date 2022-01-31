import './Button.css';
import React from 'react';
const button = (promps) => {return <button onClick={promps.onClick} id={"b"+promps.name} type="button" className="numButton">{promps.name}</button>}
export default button;
