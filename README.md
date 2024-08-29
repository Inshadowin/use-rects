# use-rects

Package that allows to resolve DOM elements sizes and positions

# Contents

## usePopupPosition

Allows you to quickly build dropdowns

- `flip` - used to allow popup to change position if there is no space for original align
- `pessimistic` allows to show popup separated from anchor egdes, cause there is no proper fit
- `align` - `topleft` | `bottomleft` | `bottomright` | `topright`
- `trackVisible` - hides dropdown if anchor is hidden/obstructed on the page. Doesn't count anything with 'absolute', 'fixed', etc. as obstruction

### Example of the component

Just copy-paste and use this a base (with some tailwind)

```jsx
import React, { useState } from 'react';
import { usePopupPosition } from 'use-rects';

export const Dropdown = ({ className }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleToggle = () => setOpen(o => !o);

  const { popupRef, anchorRef, popupPosition } = usePopupPosition({
    delay: 15,
    flip: true,
    align: 'bottomleft',
  });

  return (
    <div ref={anchorRef} className={clsx('relative', className)}>
      <div>Trigger</div>

      {open && (
        <div
          ref={popupRef}
          style={{
            ...popupPosition.style,
            width: popupPosition.meta?.anchorWidth,
          }}
          className="fixed z-popper py-2"
        >
          <div className="shadow-sm rounded">Dropdown</div>
        </div>
      )}
    </div>
  );
};
```

### Troublesooting

You still have to build your own dropdown. So remember this:

- add Z-index of you own if needed
- `trackVisible` won't work if you have 'fixed' your navbars and other parts of the layout
- dropdown must have 'height'. don't make it's content with 0 height and make some magic inside
- use results of the hook for position only. don't style this popup. Add your div inside and style it. Insluding margin, borders, etc.

returns:

```tsx
type PopupStyle = {
  top?: number;
  bottom?: number;

  left?: number;
  right?: number;

  opacity?: 1 | 0;
  position?: 'fixed';
  display?: 'none' | undefined;
};

type UsePopupResult = {
  style: PopupStyle;
  meta?: { pessimistic?: boolean; flip?: boolean; anchorWidth?: number };
};

type ReturnType = {
  popupRef: (node: HTMLDivElement) => void;
  anchorRef: (node: HTMLDivElement) => void;

  anchorPosition: Position;
  popupPosition: UsePopupResult;
};
```

example:

```jsx
const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const { popupRef, anchorRef, popupPosition } = usePopupPosition({
    delay: 50,
  });

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
          style={{ position: 'fixed', ...popupPosition.style }}
        >
          DROPDOWN
        </div>
      )}
    </div>
  );
};
```

Use resulting style inside of container. If you need extra margins - don't apply them in combination with `flip`. Put another container inside and style it

## useContainerSize

returns:

```tsx
type ReturnType = {
  containerRef: React.MutableRefObject<any>;
  height: number;
  width: number;
};
```

example:

```tsx
const { height, width, containerRef: ref } = useContainerSize({ delay: 20 });

return <div ref={ref} />;
```

## useElementPosition

returns:

```tsx
type ReturnType = [(node: HTMLDivElement) => void, Position];
```

example:

```tsx
const [ref, position] = useElementPosition({
  delay: 20,
});

return <div ref={ref} />;
```
