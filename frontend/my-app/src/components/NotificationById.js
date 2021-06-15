import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { decodeTokenData } from "../utils/decodeToken";
import useContactMessage from "../hooks/useContactsById";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { status } from "./../utils/status";

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
        <div>
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
          <h1>Oferta enviada a {userName}</h1>
          <h2>Título: {contactTitle}</h2>
          <h3>Asunto</h3>
          <p>{message}</p>
          <p>Estado de la oferta: {status(contactStatus)}</p>
        </div>
      ) : (
        <div>
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
          <h1>Oferta enviada por {scoutName}</h1>
          <h2>Título: {contactTitle}</h2>
          <h3>Asunto</h3>
          <p>{message}</p>
          <button onClick={acceptContact}>Aceptar</button>
          <button onClick={rejectContact}>Rechazar</button>
          <p>Estado de la oferta: {status(contactStatus)}</p>
        </div>
      )}
    </>
  );
}
