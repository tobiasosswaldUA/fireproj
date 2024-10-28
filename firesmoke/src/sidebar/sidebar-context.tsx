"use client";
import { createContext, useState } from "react";

export const SidebarContext = createContext({
  show: false,
  updateShow: (status: boolean) => {},
  needsToResetFocal: {},
  resetFocal: (record: Record<any, any>) => {},
});

const SidebarContextProvider = ({ children }: React.PropsWithChildren) => {
  const [show, updateShow] = useState<boolean>(false);
  const [needsToResetFocal, resetFocal] = useState<Record<any, any>>({});

  return (
    <SidebarContext.Provider
      value={{ show, updateShow, needsToResetFocal, resetFocal }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
