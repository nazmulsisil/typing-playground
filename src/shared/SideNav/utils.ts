import { SideNavConfig } from './Interface';
import get from 'lodash.get';

function vwTOpx(vw: string) {
  const value = parseInt(vw, 10);
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;

  var result = (x * value) / 100;
  return result;
}

function vhTOpx(vh: string) {
  const value = parseInt(vh, 10);
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    y = w.innerHeight || e.clientHeight || g.clientHeight;

  var result = (y * value) / 100;
  return result;
}

export const getSideNavConfig = (obj: object): SideNavConfig => {
  return {
    offsetHeight: get(obj, 'config.offsetHeight', '0'),
    isSidebar: get(obj, 'config.isSidebar', true),
    isOpen: get(obj, 'config.isOpen', false),
    setIsOpen: get(obj, 'config.setIsOpen', () => {}),
    expandedWidth: get(obj, 'config.expandedWidth', '270px'),
    collapsedWidth: get(obj, 'config.collapsedWidth', '64px'),
    topOffset: get(obj, 'config.topOffset', '0'),
    linkHeight: get(obj, 'config.linkHeight', '48px'),
    bg: get(obj, 'config.bg', '#fff'),
    hoverBg: get(obj, 'config.hoverBg', 'rgb(243, 246, 251)'),
    listGap: get(obj, 'config.listGap', '30px'),
    rimColor: get(obj, 'config.rimColor', 'rgb(38, 153, 251)'),
    iconColor: get(obj, 'config.iconColor', 'rgb(157, 167, 195)')
  };
};

// px or vw can be calculated here
export const addToPx = (px: number | string, num: number | string = 0) => {
  let value1: string | number = px + '';
  let value2: string | number = num + '';

  if (/vw/i.test(value1)) {
    value1 = vwTOpx(value1) + '';
  }

  if (/vw/i.test(value2)) {
    value2 = vwTOpx(value2) + '';
  }

  if (/vh/i.test(value1)) {
    value1 = vhTOpx(value1);
  }

  if (/vh/i.test(value2)) {
    value2 = vhTOpx(value2);
  }

  return parseInt(value1 + '', 10) + parseInt(value2 + '', 10) + 'px';
};

export const isMobile = () => {
  return window.matchMedia('(max-width: 600px)').matches;
};
