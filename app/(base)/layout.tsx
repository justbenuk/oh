import { ReactNode } from "react";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-between h-screen">
      <header></header>
      {children}
      <footer></footer>
    </div>
  );
}
