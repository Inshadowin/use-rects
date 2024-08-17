# use-rects

Package that allows to resolve DOM elements sizes and positions

# Contents

## usePopupPosition

returns:

```tsx
type Position = {
  top: number;
  left: number;

  width: number;
  height: number;
};

type ReturnType = {
  popupRef: (node: HTMLDivElement) => void;
  anchorRef: (node: HTMLDivElement) => void;
  position: Position;
  anchorPosition: Position;
};
```

example:

```jsx
const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const { popupRef, anchorRef, position } = usePopupPosition({
    delay: 50,
    mainContainerId: 'main-container-id',
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
          style={{ position: 'fixed', ...position }}
        >
          DROPDOWN
        </div>
      )}
    </div>
  );
};
```

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
  mainContainerId: 'main-container-id',
});

return <div ref={ref} />;
```

## mainContainerId

If you have scrollbar different to scrollbar on body - add it's id to these hooks for convenience
