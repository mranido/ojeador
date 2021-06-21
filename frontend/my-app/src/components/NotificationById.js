import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { decodeTokenData } from "../utils/decodeToken";
import useContactMessage from "../hooks/useContactsById";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "../style/Button.css";
import { status } from "./../utils/status";
import "../style/Notification.css";

export function NotificationsById() {
  const [token] = useContext(AuthContext);
  const decodedToken = () => {
    if (!decodeTokenData(token)) {
      return " ";
    } else {
      return decodeTokenData(token).userRol;
    }
  };
  const decodedToken2 = () => {
    if (!decodeTokenData(token)) {
      return " ";
    } else {
      return decodeTokenData(token).userId;
    }
  };
  const userRol = decodedToken();
  const playerId = decodedToken2();
  const [requestStatus, setRequestStatus] = useState("");
  const { contactId } = useParams();

  const [messageId, setMessageId] = useContactMessage();

  if (!messageId[0]) return <p>Cargando...</p>;
  const {
    scoutName,
    message,
    contactStatus,
    scoutImage,
    contactTitle,
    userImage,
    userName,
  } = messageId[0];

  const acceptContact = async (e) => {
    e.preventDefault();
    await fetch(
      `http://localhost:8000/api/v1/contact/user/${playerId}/accept/${contactId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: ` Bearer ${token}`,
        },
      }
    );
    setRequestStatus(1);
  };

  const rejectContact = async (e) => {
    e.preventDefault();
    await fetch(
      `http://localhost:8000/api/v1/contact/user/${playerId}/reject/${contactId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRequestStatus(0);
  };

  return (
    <>
      {userRol === "Scout" ? (
        <div className="container-notification">
          <div className="separador-img-h1">
            {userImage ? (
              <img
                src={`/images/profiles/${userImage}`}
                alt="Imagen de perfil"
                className="image"
              ></img>
            ) : (
              <img
                src={`/images/profiles/image-default.png`}
                alt="Imagen de perfil"
                className="image"
              ></img>
            )}
            <h1 className="flotame">Oferta enviada a {userName}</h1>
          </div>
          <h2>Título: {contactTitle}</h2>
          <h3>Asunto</h3>
          <p>{message}</p>
          <p>Estado de la oferta: {status(contactStatus)}</p>
        </div>
      ) : (
        <div className="container-notification">
          <div className="separador-img-h1">
            {scoutImage ? (
              <img
                src={`/images/profiles/${scoutImage}`}
                alt="Imagen de perfil"
                className="image"
              ></img>
            ) : (
              <img
                src={`/images/profiles/image-default.png`}
                alt="Imagen de perfil"
                className="image"
              ></img>
            )}
            <div className="flotame">Oferta enviada por {scoutName}</div>
          </div>
          <h2>Título: {contactTitle}</h2>
          <h3>Asunto</h3>
          <p>{message}</p>
          <div className="form-button">
            <button className="button0" onClick={acceptContact}>
              Aceptar
            </button>
          </div>
          <div className="form-button">
            <button className="button1" onClick={rejectContact}>
              Rechazar
            </button>
          </div>
          <p>Estado de la oferta: {status(contactStatus)}</p>
        </div>
      )}
    </>
  );
}
