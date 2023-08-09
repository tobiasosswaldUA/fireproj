"use client";
import { createContext, useState } from "react";

export const SidebarContext = createContext({
  show: true,
  updateShow: (status: boolean) => {},
});

const SidebarContextProvider = ({ children }: React.PropsWithChildren) => {
  const [show, updateShow] = useState<boolean>(true);

  return (
    <SidebarContext.Provider value={{ show, updateShow }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
