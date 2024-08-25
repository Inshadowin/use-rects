# use-rects

Package that allows to resolve DOM elements sizes and positions

# Contents

## usePopupPosition

- `flip` - used to allow popup to change position if there is no space for original align
- `pessimistic` allows to show popup separated from anchor egdes, cause there is no proper fit
- `align` - `topleft` | `bottomleft` | `bottomright` | `topright`

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
