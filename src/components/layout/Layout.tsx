import React from "react";
import Navbar from "../navbar/Navbar";
import DarkmodeB from "../DarkmodeB";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-(--primary-soft) text-(--text) antialiased transition-colors duration-300">
      <Navbar />
      <main className="grow">
        {children}
      </main>
      <DarkmodeB />
    </div>
  );
}

export default Layout;