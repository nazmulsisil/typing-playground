import { getActiveWordEndIndex } from './getActiveWordEndIndex';
import { getActiveWordStartIndex } from './getActiveWordStartIndex';
import { getWords } from './getWords';
import { OUT_OF_SCREEN_TEXT_OFFSET } from '../constants';
import { GetChunksArgs, GetChunksReturn } from '../interface';

export const getChunks = (args: GetChunksArgs): GetChunksReturn => {
  const { text, activeIndex } = args;

  // const visibleText = text.slice(visiblePartStartIndex, visiblePartEndIndex + 1);
  const visiblePartStartIndex = Math.max(0, activeIndex - OUT_OF_SCREEN_TEXT_OFFSET);
  const visiblePartEndIndex = Math.min(activeIndex + OUT_OF_SCREEN_TEXT_OFFSET, text.length - 1);

  const hiddenFirstPart = text.slice(0, visiblePartStartIndex);
  const hiddenLastPart = text.slice(visiblePartEndIndex + 1, text.length - 1);

  const activeWordStartIndex = getActiveWordStartIndex(text, activeIndex);
  const activeWordEndIndex = getActiveWordEndIndex(text, activeIndex);

  const indexOfFirstCharacterOfFirstChunk = visiblePartStartIndex;
  const indexOfFirstCharacterOfLastChunk = activeWordEndIndex + 1;
  const firstChunk = text.slice(indexOfFirstCharacterOfFirstChunk, activeWordStartIndex);
  const activeWord = text.slice(activeWordStartIndex, indexOfFirstCharacterOfLastChunk);
  const lastChunk = text.slice(indexOfFirstCharacterOfLastChunk, visiblePartEndIndex + 1);

  const firstChunkWords = getWords(indexOfFirstCharacterOfFirstChunk, firstChunk);
  const lastChunkWords = getWords(indexOfFirstCharacterOfLastChunk, lastChunk);

  const activeIndexWithinActiveChunk = activeIndex - (firstChunk.length + hiddenFirstPart.length);

  return {
    hiddenFirst: hiddenFirstPart,
    firstChunk,
    firstChunkWords,
    active: activeWord,
    lastChunk,
    lastChunkWords,
    hiddenLast: hiddenLastPart,
    activeIndexWithinActiveChunk
  };
};
