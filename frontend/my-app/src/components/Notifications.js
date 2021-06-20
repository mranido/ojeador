import React, { useContext, useEffect } from "react";
import { status } from "./../utils/status";
import useContactPlayer from "./../hooks/useContactsPlayer";
import useContactScout from "./../hooks/useContactsScout";
import { AuthContext } from "./AuthContext";
import "./../style/Notification.css";
import { decodeTokenData } from "../utils/decodeToken";
import { Link, Redirect } from "react-router-dom";

export function Notification({ contactId }) {
  const [contactPlayer] = useContactPlayer([]);
  const [contactScout] = useContactScout([]);
  const [token] = useContext(AuthContext);
  const decodedToken = () => {
    if (!decodeTokenData(token)) {
      return " ";
    } else {
      return decodeTokenData(token).userRol;
    }
  };

  console.log(contactPlayer);

  const userRol = decodedToken();

  return (
    <>
      {userRol === "Player" ? (
        <div>
          <h1>Ofertas Recibidas</h1>
          <div className="offerul">
            <ul>
              {contactPlayer.map((i) => {
                return (
                  <div key={i.contactId} className="main-container-offer">
                    <div className="container-offer">
                      <div className="separador-img-p">
                        {i.scoutImage ? (
                          <Link to={`/profile/user/${i.scoutId}`}>
                            <img
                              src={`/images/profiles/${i.scoutImage}`}
                              alt="Imagen de perfil"
                              className="image"
                            ></img>
                          </Link>
                        ) : (
                          <Link to={`/profile/user/${i.scoutImage}`}>
                            <img
                              src={`/images/profiles/image-default.png`}
                              alt="Imagen de perfil"
                              className="image"
                            ></img>
                          </Link>
                        )}{" "}
                      </div>
                      <div>
                        <Link to={`/profile/notifications/${i.contactId}`}>
                          <p className="contact-title">{i.contactTitle}</p>
                        </Link>
                        <p className="contact-name">
                          <span>de: </span>
                          {i.scoutName}
                        </p>
                      </div>
                    </div>

                    {"Estado: "}
                    {Number(i.contactStatus) === 1 ? (
                      <p className="contact-state">Aceptada</p>
                    ) : i.contactStatus !== 0 ? (
                      <p className="contact-state">Pendiente</p>
                    ) : (
                      <p className="contact-state">Rechazada</p>
                    )}
                  </div>
                );
              })}{" "}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h1>Ofertas Enviadas</h1>
          <div className="offerul">
            <ul>
              {contactScout.map((i) => {
                return (
                  <div key={i.contactId} className="main-container-offer">
                    <div className="container-offer">
                      <div>
                        {i.playerImage ? (
                          <Link to={`/profile/user/${i.playerId}`}>
                            <img
                              src={`/images/profiles/${i.playerImage}`}
                              alt="Imagen de perfil"
                              className="image"
                            ></img>
                          </Link>
                        ) : (
                          <Link to={`/profile/user/${i.playerId}`}>
                            <img
                              src={`/images/profiles/image-default.png`}
                              alt="Imagen de perfil"
                              className="image"
                            ></img>
                          </Link>
                        )}{" "}
                      </div>
                      <div>
                        <Link to={`/profile/notifications/${i.contactId}`}>
                          <p>{i.contactTitle}</p>
                        </Link>
                        <p>{i.playerName}</p>
                      </div>
                      <p>
                        {"Estado: "}
                        {Number(i.contactStatus) === 1 ? (
                          <span>Aceptada</span>
                        ) : i.contactStatus !== 0 ? (
                          <span>Pendiente</span>
                        ) : (
                          <span>Rechazada</span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}{" "}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
