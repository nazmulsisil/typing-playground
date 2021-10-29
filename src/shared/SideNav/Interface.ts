import React from 'react';
import { ReactComponentLike } from 'prop-types';

export interface SideNavMainProps {
  config?: PartialSideNavConfig;
  groups: NavItemProps[][];
}

export interface NavItemProps {
  isSidebar: boolean;
  title: string;
  svgComp?: ReactComponentLike;
  component?: React.FunctionComponent;
  to?: string;
  onClick?: () => void;
  dropdownLinks?: NavItemProps[];
}

export interface SideNavConfig {
  offsetHeight: string;
  isSidebar: boolean;
  isOpen: boolean;
  setIsOpen: () => void;
  expandedWidth: string;
  collapsedWidth: string;
  topOffset: string;
  listGap: string;
  linkHeight: string;
  bg: string;
  hoverBg: string;
  rimColor: string;
  iconColor: string;
}

export interface PartialSideNavConfig {
  offsetHeight?: string;
  isSidebar?: boolean;
  isOpen?: boolean;
  setIsOpen?: () => void;
  expandedWidth?: string;
  collapsedWidth?: string;
  topOffset?: string;
  listGap?: string;
  linkHeight?: string;
  bg?: string;
  hoverBg?: string;
  rimColor?: string;
  iconColor?: string;
}

export interface SideNavProps {
  config: SideNavConfig;
  groups: NavItemProps[][];
}

export interface NavItemStyledProps extends SideNavConfig {
  isDropdownOpen: boolean;
}

export interface NavDropdownMainProps {
  title: string;
  svgComp?: ReactComponentLike;
}

export interface DropdownWrapperStyleProps {
  height: string;
  hasDropdown: boolean;
  config: SideNavConfig;
  dropDownHovered: boolean;
  bg: string;
}

export interface NavIconStyleProps {
  width?: string;
  height?: string;
  left?: string;
  right?: string;
}
