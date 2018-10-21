import React from 'react';

import Button from './Button';

export default function ButtonSecondary(props) {
  return (
    <Button
      className="btn btn-secondary"
      onClick={props.onClick}
    >
      { props.children }
    </Button>
  );
}
