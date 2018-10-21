import React from 'react';

import './Message.css';


export default function Message(props) {
  const writtenClass = props.written ? 'written' : ''
  return (
    <div className={`message ${writtenClass}`}>
      <p> <b>{ props.author }</b>: { props.text } </p>
    </div>
  );
}
