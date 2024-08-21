import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import { usePopupPosition } from '../src';

const Dropdown = ({ style = {}, align }) => {
  const [open, setOpen] = useState(false);
  const { popupRef, anchorRef, position } = usePopupPosition({ align });

  return (
    <div style={{ position: 'relative', ...style }}>
      <input
        readOnly
        ref={anchorRef}
        onClick={() => setOpen(true)}
        value="test me"
      />
      {!!open && (
        <div
          ref={popupRef}
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            ...position,
            width: 400,
            border: '1px solid red',
            padding: 20,
          }}
        >
          DROPDOWN
        </div>
      )}
    </div>
  );
};

const Demo = () => {
  return (
    <div
      style={{
        height: '200vh',
        overflowY: 'auto',
        paddingTop: '40vh',
        position: 'relative',
      }}
    >
      <Dropdown />
      <Dropdown
        style={{ position: 'absolute', left: 0, top: 0 }}
        align="topleft"
      />
      <Dropdown
        style={{ position: 'absolute', right: 0, top: 0 }}
        align="topleft"
      />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Demo />);
