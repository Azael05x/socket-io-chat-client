import React from 'react';

import Button from './Button';

export default function ButtonPrimary(props) {
  return (
    <Button
      className="btn btn-primary"
      onClick={props.onClick}
    >
      { props.children }
    </Button>
  );
}
