import React from 'react';
import { UseCopyHolder } from 'hooks/useCopyHolder/interface';

export interface AppContextProps {
  copyHolder: UseCopyHolder;
}

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);
export const AppProvider = AppContext.Provider;
