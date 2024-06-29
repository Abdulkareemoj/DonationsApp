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
      {children}
      <Footer />
    </>
  );
}
