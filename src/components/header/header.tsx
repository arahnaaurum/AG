import "./header.scss";
import { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <header className="header">
      {children}
    </header>
  )
}

export default Header;