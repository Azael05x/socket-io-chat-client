import React from 'react';

import './Announcment.css';


export default function Announcment(props) {
  return (
    <div className="ANNOUNCMENT__wrapper">
      <p> { props.text } </p>
    </div>
  );
}
