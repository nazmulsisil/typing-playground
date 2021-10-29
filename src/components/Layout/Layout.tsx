import React from 'react';
import { LayoutWrapper, Article, MainContainer } from './Layout.styles';
import Sidebar from 'components/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutWrapper>
      <MainContainer>
        <Sidebar />
        <Article>{children}</Article>
      </MainContainer>
    </LayoutWrapper>
  );
};
