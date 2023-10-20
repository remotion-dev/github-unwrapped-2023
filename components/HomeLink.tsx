import React, { ReactNode } from "react";

export const HomeLink: React.FC<{
  label: string;
  icon: (params: { height: number; width: number; color: string }) => ReactNode;
  href: string;
}> = ({ label, icon, href }) => {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        a {
          color: white;
          text-decoration: none;
          transition: opacity 0.2s ease-in-out;
          font-weight: 600;
          font-size: 16px;
        }
        a:visited {
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
      {icon({ height: 16, width: 16, color: "white" })}
      <a href={href}>{label}</a>
    </div>
  );
};
