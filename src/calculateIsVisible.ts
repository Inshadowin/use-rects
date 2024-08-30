type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
const absolutesArray: PositionType[] = ['fixed', 'sticky', 'absolute'];

const isElementObstructed = (entry: HTMLDivElement, rect: DOMRect) => {
  const obstruction = document.elementFromPoint(
    (rect.left + rect.right) / 2,
    (rect.top + rect.bottom) / 2
  );

  if (!obstruction) return false;
  if (entry.contains(obstruction)) return false;

  const isObstructedByAbsolutes = absolutesArray.includes(
    getComputedStyle(obstruction).position as PositionType
  );

  return !isObstructedByAbsolutes;
};

const isElementOutOfBounds = (rect: DOMRect) => {
  return (
    rect.bottom < 0 ||
    rect.right < 0 ||
    rect.left > window.innerWidth ||
    rect.top > window.innerHeight
  );
};

export const calculateIsVisible = (entry: HTMLDivElement, rect: DOMRect) => {
  return !isElementObstructed(entry, rect) && !isElementOutOfBounds(rect);
};
