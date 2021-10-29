import { sampleText } from 'data/dataSample';
import { useState } from 'react';
import { getChunks } from './utils/getChunks';
import { getActiveIndex } from './utils/getActiveIndex';
import { getWordDetails, msInMinute } from './utils/getWordDetails';
import {
  GetWordDetailsReturn,
  Strokes,
  RegisterInput,
  Stroke,
  UnregisterInput,
  UpdateInput,
  UseCopyHolder,
  HandleCopyHolderInput
} from './interface';
import { useInterval } from 'hooks/useInterval';

export const useCopyHolder = (): UseCopyHolder => {
  const [text] = useState(sampleText.repeat(100));
  const [activeIndex, setActiveIndex] = useState(0);
  const [chunks, setChunks] = useState(getChunks({ text, activeIndex }));
  const [wpm, setWpm] = useState(0);
  const [strokes, setStrokes] = useState<Strokes>({});
  const [firstChunkWordDetails, setFirstChunkWordDetails] = useState<GetWordDetailsReturn[]>([]);

  const registerInput: RegisterInput = (indexOfCharacterToBeTyped) => {
    const newInputSlot: Stroke = {
      startTimestamp: new Date().valueOf(),
      characterToBeTyped: text[indexOfCharacterToBeTyped]
    };
    setStrokes((prev) => ({ ...prev, [indexOfCharacterToBeTyped]: newInputSlot }));
  };

  const unregisterInput: UnregisterInput = (indexOfCharacterToBeTyped) => {
    setStrokes((prev) => {
      const updated = { ...prev };
      delete updated[indexOfCharacterToBeTyped];
      return updated;
    });
  };

  const updateInput: UpdateInput = (indexOfCharacterToBeTyped, actuallyTypedCharacter) => {
    setStrokes((prev: Strokes) => {
      let updatedStroke: Stroke = prev[indexOfCharacterToBeTyped];
      if (!updatedStroke) {
        // HIGHLIGHT: register input for 0 index actually being completed here. because it was not possible to detect when user started typing. we detect it when user hits for first time and we update+register altogether for index 0.
        if (indexOfCharacterToBeTyped === 0) {
          updatedStroke = {
            startTimestamp: new Date().valueOf(),
            characterToBeTyped: text[indexOfCharacterToBeTyped]
          };
        } else {
          throw new Error(
            `UpdateInput should not be called for an index ${indexOfCharacterToBeTyped} that is yet not registered through registerInput().`
          );
        }
      }

      updatedStroke = {
        ...updatedStroke,
        endTimestamp: new Date().valueOf(),
        actuallyTypedCharacter: actuallyTypedCharacter,
        correctlyTyped: updatedStroke.characterToBeTyped === actuallyTypedCharacter
      };

      return { ...prev, [indexOfCharacterToBeTyped]: updatedStroke };
    });
  };

  const getWPM = (): number => {
    const typingStartTimestamp = strokes[0] && strokes[0].startTimestamp;
    if (!typingStartTimestamp) return 0;
    const now = new Date().valueOf();
    const timeElapsed = now - typingStartTimestamp;
    const eachCharacterMs = timeElapsed / Object.keys(strokes).filter((el) => strokes[el].correctlyTyped).length;
    const characterPerMinute = msInMinute / eachCharacterMs;
    // let assume 5character makes a word on an avg
    const wpm = characterPerMinute / 5;
    return wpm;
  };

  const handleCopyHolderInput: HandleCopyHolderInput = ({ keyCode, key: actuallyTypedCharacter }) => {
    const newActiveIndex = getActiveIndex(activeIndex, keyCode);
    // disallow backspace if reached first character
    if (newActiveIndex < 0) return;
    setActiveIndex(newActiveIndex);
    const newChunks = getChunks({ text, activeIndex: newActiveIndex });
    setChunks(newChunks);

    // update useInputHistory for when active index got changed
    if (newActiveIndex !== activeIndex) {
      // active index went forward
      if (newActiveIndex === activeIndex + 1) {
        updateInput(activeIndex, actuallyTypedCharacter);
      }

      // active index went backward
      if (newActiveIndex === activeIndex - 1) {
        unregisterInput(activeIndex);
      }

      registerInput(newActiveIndex);
      setWpm(+getWPM().toFixed());
    }

    // HIGHLIGHT: Keep this in the end of this handleCopyHolderInput() function, this setStrokes() call here is not setting new strokes, but using the callback to get latest strokes array
    setStrokes((prevStrokes) => {
      const { firstChunkWords } = newChunks;

      const firstChunkWordDetails: GetWordDetailsReturn[] = firstChunkWords.map(
        ({ word, indexOfWordsFirstCharacter }) => {
          return getWordDetails({
            word,
            strokesInWord: word.split('').map((_, index) => {
              const stroke = prevStrokes[index + indexOfWordsFirstCharacter];
              return stroke;
            })
          });
        }
      );

      setFirstChunkWordDetails(firstChunkWordDetails);
      return prevStrokes;
    });
  };

  useInterval(() => {
    setWpm(() => +getWPM().toFixed());
  }, 1000);

  return {
    text,
    chunks,
    firstChunkWordDetails,
    handleCopyHolderInput,
    wpm
  };
};
