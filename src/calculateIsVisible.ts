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
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Check if the element is completely out of bounds
  const outOfBoundsHorizontally = rect.right < 0 || rect.left > viewportWidth;
  const outOfBoundsVertically = rect.bottom < 0 || rect.top > viewportHeight;

  return outOfBoundsHorizontally || outOfBoundsVertically;
};

export const calculateIsVisible = (entry: HTMLDivElement, rect: DOMRect) => {
  rect.top < 0 ||
    rect.left < 0 ||
    rect.right > window.innerWidth ||
    rect.bottom > window.innerHeight;

  return !isElementObstructed(entry, rect) && !isElementOutOfBounds(rect);
};
