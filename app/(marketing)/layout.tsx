import React from "react";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className=" pb-20 pt-40">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
