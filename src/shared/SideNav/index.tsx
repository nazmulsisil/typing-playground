import React, { useState, useEffect } from 'react';
import { SideNavContextProvider } from './SideNavContext';
import { SideNav, SideNavWrapper, NavListDivider } from './style';
import NavList from './NavList';
import { SideNavConfig, SideNavProps, SideNavMainProps, NavItemProps } from './Interface';
import { getSideNavConfig, isMobile } from './utils';

const Main = (props: SideNavMainProps) => {
  const [openedByHover, setOpenedByHover] = useState(false);
  const [sideNavState, setSideNavState] = useState<SideNavProps>({
    config: getSideNavConfig({}),
    groups: []
  });

  useEffect(() => {
    setSideNavState({ config: getSideNavConfig(props), groups: props.groups });
  }, [props]);

  const {
    groups,
    config,
    config: { isOpen, setIsOpen }
  }: { groups: NavItemProps[][]; config: SideNavConfig } = sideNavState;

  const handleHover = () => {
    if (isMobile()) return;

    if (!isOpen && !openedByHover) {
      setOpenedByHover(true);
      setIsOpen();
    }
  };

  const handleMouseLeave = () => {
    if (isMobile()) return;

    if (openedByHover) {
      setIsOpen();
      setOpenedByHover(false);
    }
  };

  return (
    <SideNavContextProvider value={config}>
      <SideNavWrapper {...config}>
        <SideNav {...config} onMouseOver={handleHover} onMouseLeave={handleMouseLeave}>
          {groups.length > 0 &&
            groups.map((group, i) => {
              return (
                <React.Fragment key={i}>
                  <NavList list={group} />
                  {i < groups.length - 1 && <NavListDivider {...config} />}
                </React.Fragment>
              );
            })}
        </SideNav>
      </SideNavWrapper>
    </SideNavContextProvider>
  );
};

export default Main;
