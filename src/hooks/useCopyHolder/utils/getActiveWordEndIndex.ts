export const getActiveWordEndIndex = (text: string, activeIndex: number) => {
  if (text[activeIndex] === ' ') return activeIndex;
  let activeWordEndIndex = activeIndex;
  while (text[activeWordEndIndex] !== undefined && text[activeWordEndIndex] !== ' ') {
    activeWordEndIndex++;
  }
  // as while loop ended on found undefined or ' ', we should get the index of prev character, so -1
  return activeWordEndIndex - 1;
};
