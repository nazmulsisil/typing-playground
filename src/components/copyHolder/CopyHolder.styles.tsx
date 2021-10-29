import styled from 'styled-components';

export const CopyHolderWrapper = styled.div`
  max-height: 300px;
  overflow: scroll;
  font-size: 1.7rem;
  line-height: 1.6;
  font-family: monospace;
  max-width: 600px;
  padding: 2rem;
`;

export const HiddenPart = styled.span`
  background: black;
  color: white;
`;

export const First = styled.span`
  background: gray;
  color: white;
`;

export const Active = styled.span`
  display: inline-block;
  padding: 0.75rem 0;
  background: blue;
  color: white;
  display: inline-block;
`;

export const Last = styled.span`
  background: lightblue;
  color: black;
`;

export const ActiveChars = styled.span<{ isActive: boolean }>`
  background: lightblue;
  color: black;
  ${({ isActive }) => isActive && `color: red;`}
`;
