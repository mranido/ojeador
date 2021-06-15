import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const CreateContact = () => {
  const [token] = useContext(AuthContext);
  const [response, setResponse] = useState("");
  const [contactDescription, setContactDescription] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  let data = useLocation();

  const [userInfoReloader, setUserInfoReloader] = useState(0);
  const refreshUserInfo = () => setUserInfoReloader(Math.random());
  let userName = data.state.userName;

  async function handleSubmit(event) {
    event.preventDefault();
    const newcontact = {
      contactDescription: contactDescription,
      contactTitle: contactTitle,
    };
    const respuesta = await fetch(
      `http://localhost:8000/api/v1/contact/user/${data.state.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(newcontact),
      }
    );
    if (respuesta.ok) {
      setResponse("Mensaje de contratación enviada");
    }
    refreshUserInfo();
  }
  return (
    <div>
      <h1>Contacta con el Jugador</h1>
      <p>{userName}</p>
      {data.state.image ? (
        <img
          src={`/images/profiles/${data.state.image}`}
          alt="Foto del usuario"
          className="menu-image"
        ></img>
      ) : (
        <img
          src={`/images/profiles/image-default.png`}
          alt="Foto del usuario"
          className="menu-image"
        ></img>
      )}
      <form id={"requestPopUp"} onSubmit={handleSubmit}>
        <label htmlFor="contactTitle">
          Título de la Oferta
          <textarea
            id="contactTitle"
            value={contactTitle}
            onChange={(e) => setContactTitle(e.target.value)}
          />
        </label>
        <label htmlFor="contactDescription">
          Escriba tu propuesta
          <textarea
            id="contactDescription"
            value={contactDescription}
            onChange={(e) => setContactDescription(e.target.value)}
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {response && <div>{response}</div>}
    </div>
  );
};
