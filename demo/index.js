import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import { usePopupPosition } from '../src';

const Dropdown = ({ style = {}, align }) => {
  const [open, setOpen] = useState(false);
  const { popupRef, anchorRef, popupPosition } = usePopupPosition({
    align,
    delay: 5,
  });

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
            ...popupPosition.style,
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
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div style={{ height: 200, border: '1px solid blue' }}>HEADER</div>
      <div
        id="container-scroll"
        style={{ height: 'calc(100vh - 216px)', overflowY: 'auto' }}
      >
        <div
          style={{
            height: '3000px',

            paddingTop: '400px',
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
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Demo />);
