import React, { useContext } from 'react';
import { NavLink, NavText, NavIcon, NavTextLeftSpacer } from './style';
import { ReactComponentLike } from 'prop-types';
import SideNavContext from './SideNavContext';
import { SideNavConfig } from './Interface';

interface NavLinkMainProps {
  title?: string;
  to?: string;
  svgComp?: ReactComponentLike;
  onClick?: () => void;
}

const Main = (props: NavLinkMainProps) => {
  const { title = '', to = '/somewhere-in-the-universe', onClick } = props;
  const config: SideNavConfig = useContext(SideNavContext);
  const { collapsedWidth } = config;

  return (
    <NavLink to={to} {...(onClick ? { onClick } : {})}>
      <NavIcon left="0" width={collapsedWidth} color={config.iconColor}>
        {props.svgComp && <props.svgComp />}
      </NavIcon>
      <NavTextLeftSpacer {...config} />
      <NavText {...config}>{title}</NavText>
    </NavLink>
  );
};

export default Main;
