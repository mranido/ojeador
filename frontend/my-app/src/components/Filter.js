import React, { useRef, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useDetectOutsideClick } from "./../hooks/useDetectedOutsideClick";
import "./../style/Menu.css";
import { decodeTokenData } from "../utils/decodeToken";
import LogOut from "./Logout";
import { RiFilter2Line } from "react-icons/ri";

const Filter = () => {
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
  return (
    <div className="container-menu">
      <div className="menu-container">
        Filtro
        <button onClick={onClick} className="menu-trigger" value="Filtro">
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
                <input type="checkbox" value="alevin"></input>
                Alevín (10-11)
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" value="infantil"></input>
                Infantil (12-13)
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" value="cadete"></input>
                Cadete (14-15)
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" value="juvenil"></input>
                Juvenil (15-16)
              </label>
            </li>
            <div>POSICIÓN</div>
            <li>
              <label>
                <input type="checkbox" value="portero"></input>
                Portero
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" value="defensa"></input>
                Defensa
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" value="medio"></input>
                Medio
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" value="delantero"></input>
                Delantero
              </label>
            </li>
            <div>HABILIDADES</div>
            <li>
              <label>
                <input type="checkbox" value="velocidad"></input>
                Velocidad
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" value="salto"></input>
                Salto
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" value="defensivo"></input>
                Defensivo
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" value="regateador"></input>
                Regateador
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" value="rematador"></input>
                Rematador
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" value="incansable"></input>
                Incansable
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" value="paralotodo"></input>
                Paralotodo
              </label>
            </li>
            <div>EQUIPO</div>
            <li>
              <label>
                <input id="buscar-equipo" type="search"></input>
              </label>
            </li>
            <button>Aplicar</button>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Filter;
