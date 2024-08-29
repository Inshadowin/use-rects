type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
const absolutesArray: PositionType[] = ['fixed', 'sticky', 'absolute'];

const isElementObstructed = (entry: HTMLDivElement, rect: DOMRect) => {
  const obstruction = document.elementFromPoint(
    (rect.left + rect.right) / 2,
    (rect.top + rect.bottom) / 2
  );
  const isObstructedByAbsolutes =
    obstruction &&
    absolutesArray.includes(
      getComputedStyle(obstruction).position as PositionType
    );

  return (
    obstruction && !entry.contains(obstruction) && !isObstructedByAbsolutes
  );
};

const isElementOutOfBounds = (rect: DOMRect) => {
  return (
    rect.top < 0 ||
    rect.left < 0 ||
    rect.left > window.innerWidth ||
    rect.top > window.innerHeight
  );
};

export const calculateIsVisible = (entry: HTMLDivElement, rect: DOMRect) => {
  return !isElementObstructed(entry, rect) && !isElementOutOfBounds(rect);
};
