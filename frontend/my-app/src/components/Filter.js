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
  const onClick = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const age = useRef(null);
  const skills = useRef(null);
  const position = useRef(null);
  const [team, setTeam] = useState("");

  const handleFilter = (e) => {
    e.preventDefault();
    const filter = {
      age: Array.from(age.current.querySelectorAll(":checked")).map((el) =>
        el.getAttribute("name")
      ),
      position: Array.from(position.current.querySelectorAll(":checked")).map(
        (el) => el.getAttribute("name")
      ),
      skills: Array.from(skills.current.querySelectorAll(":checked")).map(
        (el) => el.getAttribute("name")
      ),
      team,
    };

    setFilter(filter);
  };

  return (
    <div className="container-menu">
      <form className="menu-container" onSubmit={handleFilter}>
        <button onClick={onClick} className="button1" id="filtro" name="Filtro">
          <div className="funil-name">Filtro</div>
          <RiFilter2Line className="funil" />
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"} filter`}
        >
          <ul ref={age}>
            <div>
              <h3>EDAD</h3>
            </div>
            <li>
              <label>
                <input type="checkbox" name="prebenjamin"></input>
                Prebenjamin (5-8)
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="benjamin"></input>
                Benjam??n (8-10)
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="alevin"></input>
                Alev??n (10-12)
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="infantil"></input>
                Infantil (12-14)
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="cadete"></input>
                Cadete (14-16)
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="juvenil"></input>
                Juvenil (16-18)
              </label>
            </li>
          </ul>
          <div>
            <h3>POSICI??N</h3>
          </div>
          <ul ref={position}>
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
          </ul>
          <div>
            <h3>HABILIDADES</h3>
          </div>
          <ul ref={skills}>
            <li>
              <label>
                <input type="checkbox" name="Velocidad"></input>
                Velocidad
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="Salto"></input>
                Salto
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="Defensivo"></input>
                Defensivo
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="Regateador"></input>
                Regateador
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="Rematador"></input>
                Rematador
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="Incansable"></input>
                Incansable
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="Paralotodo"></input>
                Paralotodo
              </label>
            </li>
            <div>
              <h3>EQUIPO</h3>
            </div>
            <li>
              <label>
                <input
                  className="form-input"
                  id="buscar-equipo"
                  type="search"
                  name="equipo"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                ></input>
              </label>
            </li>
            <button className="button0">Aplicar</button>
          </ul>
        </nav>
      </form>
    </div>
  );
};

export default Filter;
