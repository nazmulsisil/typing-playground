import React, { useEffect, useContext } from 'react';
import { NavListLayout } from './style';
import { NavItemProps } from './Interface';
import NavItem from './NavItem';
import { SideNavConfig } from './Interface';
import SideNavContext from './SideNavContext';
import { addToPx } from './utils';

interface NavListMainProps {
  list: NavItemProps[];
  isDropdownOpen?: boolean;
  setHeight?: (height: string) => void;
}

const Main = ({ list, isDropdownOpen, setHeight = () => {} }: NavListMainProps) => {
  const { linkHeight }: SideNavConfig = useContext(SideNavContext);
  const hasDropdown = isDropdownOpen !== undefined;

  useEffect(() => {
    if (hasDropdown) {
      setHeight(!isDropdownOpen ? '0' : list.reduce((a) => addToPx(a, linkHeight), '30px'));
    }
  }, [isDropdownOpen, hasDropdown, linkHeight, list, setHeight]);

  return (
    <NavListLayout>
      {list.map((navItem, i) => {
        return (
          <React.Fragment key={i}>
            {navItem.component && <navItem.component />}
            {!navItem.component && <NavItem item={navItem} />}
          </React.Fragment>
        );
      })}
    </NavListLayout>
  );
};

export default Main;
