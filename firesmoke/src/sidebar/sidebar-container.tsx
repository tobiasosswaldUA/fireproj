import { PropsWithChildren } from "react";

export interface SidebarContainerProps extends PropsWithChildren {
  show: boolean;
}

export const SidebarContainer = ({ show, children }: SidebarContainerProps) => {
  return (
    <div className={`sidebar overflow-auto ${show ? "show" : ""}`}>
      <div className="d-flex flex-column h-100 p-4">{children}</div>
    </div>
  );
};
