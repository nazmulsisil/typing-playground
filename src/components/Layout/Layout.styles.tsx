import styled from 'styled-components';
import { headerHeight, sideNavCollapsed, grey200 } from 'styles/variables';

export const LayoutWrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${headerHeight});
  background: #eff3f9;
  overflow: auto;
  background-color: ${grey200};
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: ${headerHeight};
  overflow: auto;
`;

export const Article = styled.article`
  flex-grow: 1;
  flex-basis: calc(100vw - ${sideNavCollapsed});
`;
