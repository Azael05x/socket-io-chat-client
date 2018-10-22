import React from 'react';

import './Connection.css';


export default function Connection(props) {
  let badgeClass = 'badge-danger';
  let badgeText = 'Server unavailable';

  if (props.connected) {
    badgeClass = 'badge-success';
    badgeText = 'Connected';
  }

  return (
    <span className={`badge-connection badge badge-pill ${badgeClass}`}>{ badgeText }</span>
  );
}
