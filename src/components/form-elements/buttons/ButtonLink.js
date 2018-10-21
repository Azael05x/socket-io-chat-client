import React from 'react';

import Button from './Button';

export default function ButtonLink(props) {
  return (
    <Button
      className="btn btn-link"
      onClick={props.onClick}
    >
      { props.children }
    </Button>
  );
}
