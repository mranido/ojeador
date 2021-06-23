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
  const [messageId] = useContactMessage([]);
  const [contactStatus, setContactStatus] = useState(messageId.contactStatus);
  const { contactId } = useParams();

  console.log(messageId);

  if (!messageId) return <p>Cargando...</p>;

  const acceptContact = async (e) => {
    e.preventDefault();
    await fetch(
      `http://localhost:8000/api/v1/contact/user/${playerId}/accept/${contactId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: ` Bearer ${token}`,
        },
      }
    );
    setContactStatus(parseInt("1"));
    window.location = "http://localhost:3000/profile/notifications";
  };

  const rejectContact = async (e) => {
    e.preventDefault();
    await fetch(
      `http://localhost:8000/api/v1/contact/user/${playerId}/reject/${contactId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setContactStatus(parseInt(2));
    window.location = "http://localhost:3000/profile/notifications";
  };

  return (
    <>
      {userRol === "Scout" ? (
        <div className="container-notification">
          <div className="separador-img-h1">
            {messageId.userImage ? (
              <img
                src={`/images/profiles/${messageId.userImage}`}
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
            <h1>Oferta enviada a {messageId.userName}</h1>
            <h2>Título: {messageId.contactTitle}</h2>
            <h3>Asunto</h3>
            <p>{messageId.message}</p>
            <p>Estado de la oferta: {status(messageId.contactStatus)}</p>
          </div>
        </div>
      ) : (
        <div className="container-notification">
          <div className="separador-img-h1">
            {messageId.scoutImage ? (
              <img
                src={`/images/profiles/${messageId.scoutImage}`}
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
          </div>
          <h1>Oferta enviada por {messageId.scoutName}</h1>
          <h2>Título: {messageId.contactTitle}</h2>
          <h3>Asunto</h3>
          <p>{messageId.message}</p>
          <div className="form-button">
            <button className="button0" type="submit" onClick={acceptContact}>
              Aceptar
            </button>
          </div>
          <div className="form-button">
            <button className="button1" type="submit" onClick={rejectContact}>
              Rechazar
            </button>
          </div>
          <p>Estado de la oferta: {status(messageId.contactStatus)}</p>
        </div>
      )}
    </>
  );
}
