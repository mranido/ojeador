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
          <Link
            to="/"
            style={{
              textDecorationLine: "none",
              color: "#272833",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={logo}
              style={{
                backgroundColor: "#FFFFFF",
                color: "#272833",
                borderRadius: "50%",
              }}
              alt="Logo"
            />
            <span
              style={{
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "6rem",
                alignContent: "center",
              }}
            >
              jeador
            </span>
          </Link>
        </section>
      </header>
    </>
  );
}

export { Header };
