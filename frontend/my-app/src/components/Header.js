import React from "react";
import logo from "./../imagesMenu/logo.png";
import {Link} from "react-router-dom";
import "./../style/Header.css";

function Header() {
  return (
    <>
      <header className="logo-background">
        <section className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </section>
      </header>
    </>
  );
}


export {Header};