import React, { useContext } from 'react';
import LazyLoad from 'react-lazyload';
import { CopyHolderWrapper, Active, ActiveChars, HiddenPart } from './CopyHolder.styles';
import { AppContext } from 'context/App';
import Word from 'components/word';

export const CopyHolder = () => {
  const {
    copyHolder: {
      firstChunkWordDetails,
      chunks: { hiddenFirst, active, lastChunkWords, hiddenLast, activeIndexWithinActiveChunk }
    }
  } = useContext(AppContext);

  const activePart = active.split('');

  return (
    <CopyHolderWrapper>
      <LazyLoad overflow={true} unmountIfInvisible={true}>
        <HiddenPart>{hiddenFirst}</HiddenPart>
      </LazyLoad>

      {/* first chunk */}
      {firstChunkWordDetails.map((wordDetails, index) => (
        <Word key={index} word={wordDetails.word} wordDetails={wordDetails} variant="isFirstPart" />
      ))}

      {/* active chunk */}
      <Active>
        {activePart.map((el, index) => (
          <ActiveChars key={index} isActive={index === activeIndexWithinActiveChunk}>
            {el === ' ' ? <>&nbsp;</> : el}
          </ActiveChars>
        ))}
      </Active>

      {/* last chunk */}
      {lastChunkWords.map(({ word }, index) => (
        <Word key={index} variant="isLastPart" word={word} />
      ))}

      <LazyLoad overflow={true} unmountIfInvisible={true}>
        <HiddenPart>{hiddenLast}</HiddenPart>
      </LazyLoad>
    </CopyHolderWrapper>
  );
};
