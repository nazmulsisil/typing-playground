import React, { useContext, KeyboardEvent } from 'react';
import styled from 'styled-components';
import CopyHolder from 'components/copyHolder';
import { AppContext } from 'context/App';

const Container = styled.div`
  input {
    font-size: inherit;
    padding: 1rem;
    width: 100%;
    margin: 2rem 0;
  }
`;

export const Home = () => {
  const {
    copyHolder: { handleCopyHolderInput, wpm }
  } = useContext(AppContext);

  return (
    <Container>
      <CopyHolder />
      <input
        style={{ width: '568px', margin: '2rem' }}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          event.preventDefault();
          if (event.keyCode === 229) return;
          handleCopyHolderInput({ keyCode: event.keyCode, key: event.key, isShiftActive: event.shiftKey });
        }}
      />
      <h1 style={{ width: '600px', fontSize: '2rem', textAlign: 'center' }}>{wpm} wpm</h1>
    </Container>
  );
};
