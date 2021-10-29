import { SideNavConfig, NavItemStyledProps, DropdownWrapperStyleProps, NavIconStyleProps } from './Interface';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { addToPx } from './utils';

const navTextLeftSpacing = '30px';
const sidebarTransition = 'width 0.3s ease-in-out';
const widthHander = ({
  isOpen,
  expandedWidth,
  collapsedWidth
}: {
  isOpen: boolean;
  expandedWidth: string;
  collapsedWidth: string;
}) => {
  const width = isOpen ? addToPx(expandedWidth, 1) : addToPx(collapsedWidth, 1);
  return css`
    width: ${width};
    transition: ${sidebarTransition};
  `;
};

export const SideNavWrapper = styled.div<SideNavConfig>`
  color: #666;
  font-size: 75%;
  z-index: 9999;
  flex-shrink: 0;
  ${({ isOpen, expandedWidth, collapsedWidth }) => widthHander({ isOpen, expandedWidth, collapsedWidth })};
  height: 100%;

  @media (max-width: 600px) {
    ${({ isSidebar }) => isSidebar && `position: fixed;`}
    ${({ isOpen }) => !isOpen && `overflow-x: hidden; width: 0;`}
  }
`;

export const SideNav = styled.div<SideNavConfig>`
  z-index: 9999;
  overflow: hidden;
  position: ${({ isSidebar }) => (isSidebar ? 'fixed' : 'relative')};
  background: ${({ bg }) => bg};
  top: ${({ topOffset }) => topOffset};
  left: 0;
  box-shadow: 0 0 3px -1px rgba(0, 0, 0, 0.15);
  border-right: 1px solid rgba(157, 167, 195, 0.28);
  border-top: 1px solid rgba(157, 167, 195, 0.3);

  ${({ isOpen, expandedWidth, collapsedWidth }) => widthHander({ isOpen, expandedWidth, collapsedWidth })};

  ${({ isSidebar, topOffset }) =>
    isSidebar &&
    `
  height: calc(100vh - ${topOffset})`};

  @media (max-width: 600px) {
    width: 100vw;
    overflow: hidden;
    border-right: none;
    ${({ isOpen, isSidebar }) => !isOpen && isSidebar && `width: 0;`}
  }
`;

export const NavListLayout = styled.div`
  padding: 15px 0;
  display: flex;
  flex-direction: column;
`;

export const DropDownWrapper = styled.div<DropdownWrapperStyleProps>`
  width: ${({ config: { expandedWidth, isOpen } }) => {
    return addToPx(expandedWidth, isOpen ? 0 : navTextLeftSpacing);
  }};

  ${({ dropDownHovered, config: { isOpen, collapsedWidth } }) => {
    return !dropDownHovered && !isOpen && `width: ${collapsedWidth}`;
  }};

  transition: all 0.3s ease-in-out;
  height: ${({ height }) => height};
  ${({ hasDropdown }) => hasDropdown && 'overflow: hidden'};

  background: ${({ bg }) => bg};
`;

export const NavTextLeftSpacer = styled.div<SideNavConfig>`
  flex-shrink: 0;
  width: ${({ isOpen }) => (isOpen ? '0' : navTextLeftSpacing)};
  ${({ isSidebar }) =>
    isSidebar &&
    `
    transition: all .3s ease-in-out;
  `};
`;

export const NavItem = styled.div<NavItemStyledProps>`
  display: flex;
  position: relative;
  background: ${({ bg }) => bg};
  height: ${({ linkHeight }) => linkHeight};
  width: ${({ collapsedWidth, expandedWidth, isOpen }) => {
    return isOpen ? expandedWidth : collapsedWidth;
  }};
  overflow: hidden;
  transition: width 0.3s ease-in-out;

  ${({ expandedWidth, isOpen, isDropdownOpen }) => {
    return (
      !isOpen &&
      isDropdownOpen &&
      `
        width: ${addToPx(expandedWidth, navTextLeftSpacing)};
        & + div > div {
          width: ${addToPx(expandedWidth, navTextLeftSpacing)}
        }

      `
    );
  }};

  &:hover {
    font-weight: bold;
    background: ${({ hoverBg }) => hoverBg};
    ${({ expandedWidth, isOpen }) => {
      return !isOpen && `width: ${addToPx(expandedWidth, navTextLeftSpacing)} `;
    }};

    & + div > div {
      ${({ expandedWidth, isOpen }) => {
        return !isOpen && `width: ${addToPx(expandedWidth, navTextLeftSpacing)} `;
      }};
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 2px;
      background: ${({ rimColor }) => (rimColor === undefined ? 'auto' : rimColor)};
      transition: all 0.3s ease-in-out;
    }
  }

  @media (max-width: 600px) {
    width: 100vw;
  }
`;

export const NavLink = styled(Link)`
  display: flex;
  height: 100%;
  width: 100%;
  color: inherit;
`;

export const NavText = styled.div`
  display: flex;
  flex: 1 0 152px;
  align-items: center;
  white-space: nowrap;
`;

export const NavDropDown = styled.div<SideNavConfig>``;

export const NavIcon = styled.div<NavIconStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ width }) => (width === undefined ? '100%' : width)};
  height: ${({ height }) => (height === undefined ? '100%' : height)};
  left: ${({ left }) => (left === undefined ? 'auto' : left)};
  right: ${({ right }) => (right === undefined ? 'auto' : right)};

  svg {
    height: 1rem;
    color: ${({ color }) => color};
  }
`;

export const NavListDivider = styled.div<SideNavConfig>`
  width: calc(100% - 20px);
  margin-left: 10px;
  height: 1px;
  background-color: rgba(157, 167, 195, 0.3);

  ${({ isOpen, expandedWidth }) =>
    isOpen &&
    `
    width: calc(${expandedWidth} - 20px);
  `}

  @media (max-width: 600px) {
    width: calc(100vw - 20px);
  }
`;
