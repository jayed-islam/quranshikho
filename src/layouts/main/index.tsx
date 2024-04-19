import React, { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="w-xl mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
