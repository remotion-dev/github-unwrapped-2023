import type { ReactNode } from "react";
import React from "react";
import "./styles.css";

export const HomeLink: React.FC<{
  label: string;
  icon: (params: { height: number; width: number; color: string }) => ReactNode;
  href: string;
}> = ({ label, icon, href }) => {
  return (
    <a className="container" href={href}>
      <style>{`
       
      `}</style>
      {icon({ height: 16, width: 16, color: "white" })}
      {label}
    </a>
  );
};
