import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { WithChildren } from "../types/WithChildren.type";

export type TabContextType = {
  tab?: chrome.tabs.Tab;
  setTab?: Dispatch<SetStateAction<chrome.tabs.Tab | undefined>>;
};
export const TabContext = createContext<Partial<TabContextType>>({});

type ProviderProps = WithChildren<unknown>;
export function TabProvider({ children }: ProviderProps) {
  const [tabState, setTabState] = useState<chrome.tabs.Tab>();

  return (
    <TabContext.Provider value={{ tab: tabState, setTab: setTabState }}>
      {children}
    </TabContext.Provider>
  );
}

export function withTab<T>(Component: React.ComponentType<T & TabContextType>) {
  return function WrapperComponent(props: T) {
    const { tab, setTab } = useContext(TabContext);
    return <Component {...props} tab={tab} setTab={setTab} />;
  };
}
