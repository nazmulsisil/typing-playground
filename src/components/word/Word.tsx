import React from 'react';
import { CorrectWordWrapper, CharacterWrapper, WrongWordWrapper, greenAccent, redAccent } from './Word.styles';
import { WordProps } from './interface';

const WordToExport = (props: WordProps) => {
  const { word, variant, wordDetails } = props;

  if (word === ' ') {
    return <CorrectWordWrapper {...props}>&nbsp;</CorrectWordWrapper>;
  } else if ((variant === 'isLastPart' || !wordDetails) && word) {
    return <CorrectWordWrapper {...props}>{word}</CorrectWordWrapper>;
  } else if (wordDetails) {
    const { word, wpm, isCorrect, characterDetails, actuallyTypedWord } = wordDetails;
    if (isCorrect === false) {
      return (
        <WrongWordWrapper title={actuallyTypedWord}>
          {characterDetails.map((characterDetails, i) => {
            const { toType, actuallyTyped } = characterDetails;
            return (
              <CharacterWrapper
                characterDetails={characterDetails}
                key={i + toType + actuallyTyped}
                style={{ background: toType === actuallyTyped ? greenAccent : redAccent }}
              >
                {toType}
              </CharacterWrapper>
            );
          })}
        </WrongWordWrapper>
      );
    } else {
      return (
        <CorrectWordWrapper title={wpm !== undefined ? `${wpm.toFixed()}wpm` : ''} {...props}>
          {word}
        </CorrectWordWrapper>
      );
    }
  } else {
    return null;
  }
};

const Word = React.memo(WordToExport);
export { Word };
