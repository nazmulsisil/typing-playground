import React from 'react';
import { SideNavConfig } from './Interface';
import { getSideNavConfig } from './utils';

const SideNavContext = React.createContext<SideNavConfig>(getSideNavConfig({}));
const SideNavContextProvider = SideNavContext.Provider;
const SideNavContextConsumer = SideNavContext.Consumer;

export { SideNavContext as default, SideNavContextProvider, SideNavContextConsumer };
