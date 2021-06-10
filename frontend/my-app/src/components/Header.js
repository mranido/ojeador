import React from "react";
import logo from "./../imagesMenu/ojeador.svg";
import { Link } from "react-router-dom";
import "./../style/Header.css";

function Header() {
  return (
    <>
      <header className="logo-background">
        <section className="logo" style={{ minWidth: "470px", width: "100%" }}>
          <Link
            to="/"
            style={{
              textDecorationLine: "none",
              color: "#272833",
              display: "flex",
              justifyContent: "flex-start",
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
