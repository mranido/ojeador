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
          <Link
            to="/"
            style={{
              textDecorationLine: "none",
              color: "#111116",
              display: "flex",
              margin: "1rem",
              justifyContent: "flex-start",
              width: "auto",
            }}
          >
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
