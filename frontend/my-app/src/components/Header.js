import React from "react";
import logo from "./../imagesMenu/ojeador.svg";
import { Link } from "react-router-dom";
import "./../style/Header.css";
import { FaRegBell } from "react-icons/fa";

function Header() {
  return (
    <>
      <header className="logo-background">
        <section className="logo">
          <Link to="/">
            <img
              src={logo}
              style={{ backgroundColor: "#FFFFFF", borderRadius: "50%" }}
              alt="Logo"
            />
          </Link>
          <span
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: "4rem",
              display: "flex",
              flexFlow: "1, no-wrap",
              justifyContent: "center",
              textAlign: "center",
              spaceBetween: "",
            }}
          >
            jeador
          </span>
        </section>
      </header>
    </>
  );
}

export { Header };
