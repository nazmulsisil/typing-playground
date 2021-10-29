import styled, { css } from 'styled-components';
import { WordProps } from './interface';
import { TypeCharacter } from 'hooks/useCopyHolder/interface';

export const greenAccent = '#32850f66';
export const redAccent = '#f6000066';

const getVariantBasedWrapperStyles = (props: WordProps) => {
  const { variant, wordDetails } = props;

  switch (variant) {
    case 'isActive':
      return css`
        background: blue;
        color: white;
        display: inline-block;
      `;

    case 'isFirstPart':
      const { isCorrect } = wordDetails || {};
      return css`
        background: ${isCorrect ? greenAccent : redAccent};
        box-shadow: ${isCorrect && 'inset 0 0 0 0.25px green'};
        color: white;
      `;

    case 'isLastPart':
      return css`
        background: lightblue;
        color: black;
      `;

    default:
      throw new Error('Should not reach here!');
  }
};

export const CorrectWordWrapper = styled.span<WordProps>`
  display: inline-block;
  padding: 0.75rem 0;
  ${(props) => getVariantBasedWrapperStyles(props)};
  ${({ title }) => title && `cursor: help`};
`;

export const WrongWordWrapper = styled.span`
  display: inline-block;
  box-shadow: inset 0 0 0 1px red;
  cursor: help;
`;

interface CharacterWrapperProps {
  characterDetails: TypeCharacter;
}

export const CharacterWrapper = styled.span<CharacterWrapperProps>`
  position: relative;
  display: inline-block;
  padding: 0.75rem 0;
  &:after {
    content: ${({ characterDetails: { actuallyTyped, toType } }) => toType !== actuallyTyped && `'${actuallyTyped}'`};
    position: absolute;
    bottom: 0;
    left: 0;
    line-height: 1;
    font-size: 0.67em;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.25em;
    right: 0;
    padding: 1px;
  }
`;
