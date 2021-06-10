import { useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import Logo from "../imagesMenu/ojeador.svg";
import jwt_decode from "jwt-decode";
import Menucheck from "../utils/Menucheck";

const Menu = () => {
  const [token] = useContext(AuthContext);

  const currentPage = window.location.pathname;

  useEffect(() => {
    Menucheck();
  }, []);

  const toggleMenu = (e) => {
    e.preventDefault();
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
  };

  return (
    <aside id="menu" className="hidden">
      <button onClick={toggleMenu}></button>
      <img src={Logo} alt="Ojeador App" />
      {token === " " ? (
        <ul>
          {currentPage !== "/login" && (
            <li>
              <Link to="/login">Iniciar sesión</Link>
            </li>
          )}
          {currentPage !== "/register" && (
            <li>
              <Link to="/register">Regístrate</Link>
            </li>
          )}
        </ul>
      ) : (
        <ul>
          {currentPage !== "/login" && (
            <li>
              <Link to="/login">Perfil</Link>
            </li>
          )}
          {currentPage !== "/logout" && (
            <li>
              <Link to="/"></Link>
            </li>
          )}
        </ul>
      )}
    </aside>
  );
};

export default Menu;
