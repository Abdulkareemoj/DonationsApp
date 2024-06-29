import React from "react";
import Header from "./header";
import Footer from "./footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: RootLayoutProps) {
  return (
    <>
      <Header />
      <div className="max-w-screen-2xl mx-auto"> {children}</div>
      <Footer />
    </>
  );
}
