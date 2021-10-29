import { isLastItem } from 'utils/isLastItem';
import { Stroke, GetWordDetailsReturn, TypeCharacter } from './../interface';

export const msInMinute = 60 * 1000;

export interface ArgsGetWordDetails {
  // eventually after all tests and optimization we will remove this word prop, as we can get this from strokesOfTheWord array
  word: string;
  strokesInWord: Stroke[];
}

// optimize
export const getWordDetails = (args: ArgsGetWordDetails): GetWordDetailsReturn => {
  // TODO: ccl: find out the details of the word
  const { word, strokesInWord } = args;

  let wordEndTimeStamp: number = 0;
  let wordToBeTyped = '';
  let wordStartTimeStamp: number = 0;
  const characterDetails: TypeCharacter[] = [];
  let actuallyTypedWord = '';
  strokesInWord.forEach((el, i) => {
    if (!el) {
      return {
        word,
        wpm: undefined,
        isCorrect: undefined,
        characterDetails: []
      };
    }

    const { startTimestamp, endTimestamp, characterToBeTyped, actuallyTypedCharacter } = el;
    wordToBeTyped += characterToBeTyped;
    // actuallyTyped += actuallyTypedCharacter;
    if (i === 0) wordStartTimeStamp = startTimestamp;
    if (isLastItem(i, strokesInWord)) {
      wordEndTimeStamp = endTimestamp || 0;
    }
    characterDetails.push({
      index: i,
      toType: characterToBeTyped,
      actuallyTyped: actuallyTypedCharacter
    });
    actuallyTypedWord += actuallyTypedCharacter;
  });

  if (!wordEndTimeStamp) {
    return {
      word,
      characterDetails: []
    };
  }

  // we will eventually remove this check once we complete this util function.
  if (word !== wordToBeTyped) throw new Error('found word and props word should be exactly same');

  const totalTimeTaken = wordEndTimeStamp - wordStartTimeStamp;
  const eachCharacterMs = totalTimeTaken / word.length;
  const characterPerMinute = msInMinute / eachCharacterMs;
  // let assume 5character makes a word on an avg
  const wpm = characterPerMinute / 5;

  return {
    word: wordToBeTyped,
    actuallyTypedWord,
    wpm,
    isCorrect: actuallyTypedWord.length === wordToBeTyped.length ? actuallyTypedWord === wordToBeTyped : undefined,
    characterDetails
  };
};
