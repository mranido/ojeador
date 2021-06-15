import React, { useContext, useEffect } from "react";
import { status } from "./../utils/status";
import useContactPlayer from "./../hooks/useContactsPlayer";
import useContactScout from "./../hooks/useContactsScout";
import { AuthContext } from "./AuthContext";
import { decodeTokenData } from "../utils/decodeToken";
import { Link } from "react-router-dom";

export function Notification({ contactId }) {
  const [contactPlayer] = useContactPlayer();
  const [contactScout] = useContactScout();
  const [token] = useContext(AuthContext);
  const decodedToken = () => {
    if (!decodeTokenData(token)) {
      return " ";
    } else {
      return decodeTokenData(token).userRol;
    }
  };

  const userRol = decodedToken();

  let contactsPlayer = contactPlayer
    .map((i) => {
      return {
        contactId: i.contactId,
        scoutId: i.scoutId,
        scoutName: i.scoutName,
        message: i.message,
        contactStatus: i.contactStatus,
        scoutImage: i.scoutImage,
        contactTitle: i.contactTitle,
        scoutTeam: i.scoutTeam,
        userRol: "Player",
        playerId: i.playerId,
      };
    })
    .reverse();
  let contactsScout = contactScout
    .map((i) => {
      return {
        scoutId: i.scoutId,
        contactId: i.contactId,
        playerId: i.playerId,
        playerName: i.userName,
        message: i.message,
        contactStatus: i.contactStatus,
        playerImage: i.userImage,
        contactTitle: i.contactTitle,
        playerTeam: i.playerTeam,
        userRol: "Scout",
      };
    })
    .reverse();
  console.log(contactsPlayer);

  return (
    <>
      {userRol === "Player" ? (
        <div>
          <h1>Ofertas Recibidas</h1>
          <div>
            <ul>
              {contactsPlayer.map((i) => {
                return (
                  <div key={i.contactId}>
                    <div>
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
                    <Link to={`/profile/notifications/${i.contactId}`}>
                      <p>{i.contactTitle}</p>
                    </Link>
                    <p>{i.scoutName}</p>
                    {i.contactStatus ? (
                      <p>{status(i.contactStatus)}</p>
                    ) : (
                      "Pendiente"
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
          <div>
            <ul>
              {contactsScout.map((i) => {
                return (
                  <div key={i.contactId}>
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
                    <Link to={`/profile/notifications/${i.contactId}`}>
                      <p>{i.contactTitle}</p>
                    </Link>
                    <p>{i.playerName}</p>
                    {i.contactStatus ? (
                      <p>{status(i.contactStatus)}</p>
                    ) : (
                      <p>Pendiente</p>
                    )}
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
