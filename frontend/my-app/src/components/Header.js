import React from "react";
import logo from "./../imagesMenu/ojeador.svg";
import { Link } from "react-router-dom";
import "./../style/Header.css";
import Menu from "./Menu";

function Header() {
  return (
    <>
      <header className="logo-background">
        <section className="logo">
          <Link className="link" to="/">
            <img src={logo} alt="Logo" />
            <span>jeador</span>
          </Link>
          <div>
            <Menu></Menu>
          </div>
        </section>
      </header>
    </>
  );
}

export { Header };
