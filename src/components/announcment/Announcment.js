import React from 'react';

import './Announcment.css';


export default function Announcment(props) {
  return (
    <div className="announcment">
      <p> { props.text } </p>
    </div>
  );
}
