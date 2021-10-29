import React, { useContext } from 'react';
import { NavText, NavIcon, NavTextLeftSpacer } from './style';
import SideNavContext from './SideNavContext';
import { SideNavConfig, NavDropdownMainProps } from './Interface';
import { addToPx } from './utils';

const Main = (props: NavDropdownMainProps) => {
  const { title } = props;
  const config: SideNavConfig = useContext(SideNavContext);

  return (
    <>
      <NavIcon left="0" width={config.collapsedWidth} color={config.iconColor}>
        {props.svgComp && <props.svgComp />}
      </NavIcon>
      <NavTextLeftSpacer {...config} />
      <NavText {...config}>{title}</NavText>
      <NavIcon right="0" width={addToPx(config.collapsedWidth, -10)} color={config.iconColor}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="angle-down"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
          />
        </svg>
      </NavIcon>
    </>
  );
};
export default Main;
