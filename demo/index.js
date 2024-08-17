import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import { usePopupPosition } from '../src';

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const { popupRef, anchorRef, position } = usePopupPosition();

  return (
    <div style={{ position: 'relative' }}>
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
          style={{ position: 'fixed', ...position }}
        >
          DROPDOWN
        </div>
      )}
    </div>
  );
};

const Demo = () => {
  return (
    <div style={{ paddingTop: '40vh', height: '200vh', overflowY: 'auto' }}>
      <Dropdown />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Demo />);
