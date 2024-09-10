type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
const absolutesArray: PositionType[] = ['fixed', 'sticky', 'absolute'];

const isElementObstructed = (entry: HTMLDivElement, rect: DOMRect) => {
  const obstructionX = (rect.left + rect.right) / 2;
  const obstructionY = (rect.top + rect.bottom) / 2;

  const obstruction = document.elementFromPoint(
    obstructionX > 0 ? obstructionX : 0,
    obstructionY > 0 ? obstructionY : 0
  );

  if (!obstruction) return false;
  if (entry.contains(obstruction)) return false;

  const isObstructedByAbsolutes = absolutesArray.includes(
    getComputedStyle(obstruction).position as PositionType
  );

  return !isObstructedByAbsolutes;
};

export const calculateIsOutOfBounds = (rect: DOMRect) => {
  return (
    rect.bottom < 0 ||
    rect.right < 0 ||
    rect.left > window.innerWidth ||
    rect.top > window.innerHeight
  );
};

export const calculateIsVisible = (entry: HTMLDivElement, rect: DOMRect) => {
  return !isElementObstructed(entry, rect);
};
