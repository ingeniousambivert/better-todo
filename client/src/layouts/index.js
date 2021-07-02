import React from "react";
import Header from "./header";
import Footer from "./footer";

function Container({ children }) {
  return (
    <div className="flex flex-col space-y-2">
      <Header />
      <div className="w-full min-h-screen container mx-auto">{children}</div>
      <Footer />
    </div>
  );
}

export default Container;
