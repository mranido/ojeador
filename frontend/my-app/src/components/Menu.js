import React, { useRef, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useDetectOutsideClick } from "./../hooks/useDetectedOutsideClick";
import "./../style/Menu.css";
import { decodeTokenData } from "../utils/decodeToken";
import LogOut from "./Logout";

const Menu = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const [token] = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);

  const decodedToken = () => {
    if (!decodeTokenData(token)) {
      return " ";
    } else {
      return decodeTokenData(token).userId;
    }
  };

  const userId = decodedToken();

  useEffect(() => {
    const loadUserInfo = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/profiles/${userId}`
      );
      if (response.ok) {
        const body = await response.json();
        setUserInfo(body.user);
      }
    };
    loadUserInfo();
  }, [userId]);
  return (
    <>
      {token === "" ? (
        <div className="container-menu">
          <div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
              <img
                src={`/images/profiles/image-default.png`}
                className="menu-image"
                alt="User avatar"
              />
            </button>
            <nav
              ref={dropdownRef}
              className={`menu ${isActive ? "active" : "inactive"}`}
            >
              <ul>
                <li>
                  <a href="/login">Iniciar sesión</a>
                </li>
                <li>
                  <a href="/register">Regístrate</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <div className="container-menu">
          <div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
              {userInfo.userImage ? (
                <img
                  src={`/images/profiles/${userInfo.userImage}`}
                  className="menu-image"
                  alt="User avatar"
                />
              ) : (
                <img
                  src={`/images/profiles/image-default.png`}
                  className="menu-image"
                  alt="User avatar"
                />
              )}
            </button>
            <nav
              ref={dropdownRef}
              className={`menu ${isActive ? "active" : "inactive"}`}
            >
              <ul>
                <li>
                  <a href="/profile/update-user-profile">Cambiar Perfil</a>
                </li>
                <li>
                  <a href="/profile/user-profile">Ver tu Perfil</a>
                </li>
                <li>
                  <a href="/login" onClick={LogOut}>
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
