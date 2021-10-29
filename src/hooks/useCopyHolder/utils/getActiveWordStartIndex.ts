export const getActiveWordStartIndex = (text: string, activeIndex: number) => {
  if (text[activeIndex] === ' ') return activeIndex;
  let activeWordStartIndex = activeIndex;
  while (text[activeWordStartIndex] !== undefined && text[activeWordStartIndex] !== ' ') {
    activeWordStartIndex--;
  }
  return Math.max(0, activeWordStartIndex + 1);
};
