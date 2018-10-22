import React from 'react';

import './Message.css';


export default function Message(props) {
  const writtenClass = props.written ? 'MESSAGE__written' : ''
  return (
    <div className={`MESSAGE__wrapper ${writtenClass}`}>
      <p> <b>{ props.author }</b>: { props.text } </p>
    </div>
  );
}
