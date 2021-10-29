import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const scrollWidth = '8px';

export const GlobalStyle = createGlobalStyle`  
  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;  
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #444;
  }

  a {
    text-decoration: none;
  }
  
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #BCBEC0;
    border-radius:10px;
  }  
`;

export const theme = {
  spacing: {
    sp1: '.5rem',
    sp2: '1rem',
    sp3: '1.5rem',
    sp4: '2rem',
    sp5: '2.5rem',
    sp6: '3rem',
    sp7: '3.5rem',
    sp8: '4rem'
  },
  maxPageWidth: '1200px'
};

interface ArticleProps {
  fluid?: boolean;
  width?: string;
}

export const Article = styled.div<ArticleProps>`
  width: 100%;
  max-width: ${({ fluid, theme: { pageWidth } }) => (fluid ? '100%' : pageWidth)};
  max-width: ${({ width }) => width !== undefined && width};
  margin: 0 auto;
  padding: 0 1.5rem;
`;
