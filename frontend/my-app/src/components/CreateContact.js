import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { FaStar } from "react-icons/fa";
import "../style/Contact.css";
import "../style/Button.css";
import "../style/Star.css";

export const CreateContact = () => {
  const [token] = useContext(AuthContext);
  const [response, setResponse] = useState("");
  const [contactDescription, setContactDescription] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  let data = useLocation();

  const [userInfoReloader, setUserInfoReloader] = useState(0);
  const refreshUserInfo = () => setUserInfoReloader(Math.random());
  let userName = data.state.userName;
  let avgMedia = data.state.avgMedia;

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
      setResponse("Mensaje de contratación enviado");
    }
    refreshUserInfo();
  }
  return (
    <div className="contact-wrapper">
      <h1>Contacta con el Jugador</h1>
      <div className="img-name">
        <p>{userName}</p>
        {data.state.image ? (
          <img
            src={`/images/profiles/${data.state.image}`}
            alt="Foto del usuario"
            className="contact-image"
          ></img>
        ) : (
          <img
            src={`/images/profiles/image-default.png`}
            alt="Foto del usuario"
            className="contact-image"
          ></img>
        )}
        {avgMedia ? (
          <p className="star">
            {Array(5)
              .fill()
              .map((item, index) => {
                return (
                  <FaStar
                    key={Math.random()}
                    className="star"
                    size={20}
                    value={avgMedia}
                    color={avgMedia > index ? "#5ACA75" : "#e4e5e9"}
                  ></FaStar>
                );
              })}
            <span>{avgMedia}</span>
          </p>
        ) : (
          ""
        )}
      </div>
      <form className="form-button" id={"requestPopUp"} onSubmit={handleSubmit}>
        <label htmlFor="contactTitle">
          Título de la Oferta<span>*</span>
          <textarea
            id="contactTitle"
            value={contactTitle}
            onChange={(e) => setContactTitle(e.target.value)}
          />
        </label>
        <label htmlFor="contactDescription">
          Escriba tu propuesta<span>*</span>
          <textarea
            id="contactDescription"
            value={contactDescription}
            onChange={(e) => setContactDescription(e.target.value)}
          />
        </label>
        {response && <div>{response}</div>}
        <button className="button0" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};
