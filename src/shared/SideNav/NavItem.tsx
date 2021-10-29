import React, { useContext, useState, useEffect, useCallback } from 'react';
import { NavItemProps } from './Interface';
import NavLink from './NavLink';
import NavList from './NavList';
import NavDropdownBar from './NavDropdownBar';
import { NavItem, DropDownWrapper } from './style';
import { SideNavConfig } from './Interface';
import SideNavContext from './SideNavContext';
import { addToPx } from './utils';

interface NavItemMainProps {
  item: NavItemProps;
}

const Main = ({ item }: NavItemMainProps) => {
  const config: SideNavConfig = useContext(SideNavContext);
  const { isOpen, linkHeight, bg } = config;
  const { title, svgComp, to, dropdownLinks, onClick } = item;
  const [dropDownHovered, setDropDownHovered] = useState(false);
  const [isDropdownClosed, setIsDropdownClosed] = useState(true);
  const [height, setHeight] = useState(isDropdownClosed ? linkHeight : 'auto');
  const [hasDropdown] = useState(isDropdownClosed !== undefined);

  const closeDropdown = useCallback(() => {
    if (!isOpen) {
      setIsDropdownClosed(true);
    }
  }, [isOpen, setIsDropdownClosed]);

  useEffect(() => {
    if (!isOpen) {
      closeDropdown();
    }
  }, [isOpen, closeDropdown]);

  const showHideHandler = () => {
    setIsDropdownClosed((prevState) => !prevState);
  };

  const heightChangeHandler = (height: string) => {
    setHeight(addToPx(height, linkHeight));
  };

  const NavItemProps = {
    ...config,
    isDropdownOpen: !isDropdownClosed
  };

  const handleDropdownMouseLeave = () => {
    closeDropdown();
    setDropDownHovered(false);
  };

  const handleDropdownHover = () => {
    setDropDownHovered(true);
  };

  const NavDropdownBarProps = { title, svgComp, showHideHandler };
  const dropdown = dropdownLinks && dropdownLinks.length > 0 && (
    <DropDownWrapper
      bg={bg}
      dropDownHovered={dropDownHovered}
      height={height}
      hasDropdown={hasDropdown}
      config={config}
      onMouseLeave={handleDropdownMouseLeave}
      onMouseOver={handleDropdownHover}
    >
      <NavItem {...NavItemProps} onClick={showHideHandler}>
        <NavDropdownBar {...NavDropdownBarProps} />
      </NavItem>
      <NavList list={dropdownLinks} isDropdownOpen={!isDropdownClosed} setHeight={heightChangeHandler} />
    </DropDownWrapper>
  );

  const NavLinkProps = { title, to, svgComp, onClick };
  const link = (
    <NavItem {...NavItemProps}>
      <NavLink {...NavLinkProps} />
    </NavItem>
  );

  return dropdown || link;
};

export default Main;
