import React from 'react';
import { headerHeight, sideNavExpanded, sideNavCollapsed, navLinkHeight, vscode } from 'styles/variables';
import SideNav from 'shared/SideNav';
import { NavItemProps, PartialSideNavConfig } from 'shared/SideNav/Interface';

const Main = () => {
  const navGroups: NavItemProps[][] = [
    [
      {
        isSidebar: true,
        title: 'Home',
        to: '/',
        onClick: () => {}
      }
    ]
  ];

  const config: PartialSideNavConfig = {
    offsetHeight: headerHeight,
    isSidebar: true,
    isOpen: false,
    expandedWidth: sideNavExpanded,
    collapsedWidth: sideNavCollapsed,
    topOffset: '-1px',
    linkHeight: navLinkHeight,
    bg: vscode
  };

  return <SideNav config={config} groups={navGroups} />;
};

export default Main;
