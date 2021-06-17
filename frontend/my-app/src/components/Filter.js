import React, { useRef, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useDetectOutsideClick } from "./../hooks/useDetectedOutsideClick";
import "./../style/Menu.css";
import { decodeTokenData } from "../utils/decodeToken";
import LogOut from "./Logout";
import { RiFilter2Line } from "react-icons/ri";

const Filter = ({ setFilter }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  // const [token] = useContext(AuthContext);
  // const [userInfo, setUserInfo] = useState([]);

  // const decodedToken = () => {
  //   if (!decodeTokenData(token)) {
  //     return " ";
  //   } else {
  //     return decodeTokenData(token).userId;
  //   }
  // };

  // const userId = decodedToken();

  // useEffect(() => {
  //   const loadUserInfo = async () => {
  //     const response = await fetch(
  //       `http://localhost:8000/api/v1/users/profiles/${userId}`
  //     );
  //     if (response.ok) {
  //       const body = await response.json();
  //       setUserInfo(body.user);
  //     }
  //   };
  //   loadUserInfo();
  // }, [userId]);

  const handleFilter = (e) => {
    e.preventDefault();

    const filterForm = new FormData(e.target);

    const filter = Object.fromEntries(filterForm.entries());

    setFilter(filter);
  };

  return (
    <div className="container-menu">
      <form className="menu-container" onSubmit={handleFilter}>
        Filtro
        <button onClick={onClick} className="menu-trigger" name="Filtro">
          <RiFilter2Line className="funil" />
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <div>EDAD</div>
            <li>
              <label>
                <input type="checkbox" name="alevin" value="1"></input>
                Alevín (10-11)
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="infantil" value="1"></input>
                Infantil (12-13)
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="cadete"></input>
                Cadete (14-15)
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="juvenil"></input>
                Juvenil (15-16)
              </label>
            </li>
            <div>POSICIÓN</div>
            <li>
              <label>
                <input type="checkbox" name="portero"></input>
                Portero
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="defensa"></input>
                Defensa
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="medio"></input>
                Medio
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="delantero"></input>
                Delantero
              </label>
            </li>
            <div>HABILIDADES</div>
            <li>
              <label>
                <input type="checkbox" name="velocidad"></input>
                Velocidad
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="salto"></input>
                Salto
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="defensivo"></input>
                Defensivo
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="regateador"></input>
                Regateador
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="rematador"></input>
                Rematador
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="incansable"></input>
                Incansable
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="paralotodo"></input>
                Paralotodo
              </label>
            </li>
            <div>EQUIPO</div>
            <li>
              <label>
                <input id="buscar-equipo" type="search" name="equipo"></input>
              </label>
            </li>
            <button>Aplicar</button>
          </ul>
        </nav>
      </form>
    </div>
  );
};

export default Filter;
