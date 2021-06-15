import { useState } from "react";
import React from "react";
import "./../style/Register.css";
import "./../style/Button.css";
import "./../style/FormInput.css";

export function RegisterForm() {
  const [userRol, setUserRol] = useState("Scout");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const nuevoUsuarioServidor = {
      userRol: userRol,
      userName: userName,
      userEmail: userEmail,
      userPassword: userPassword,
    };

    const res = await fetch("http://localhost:8000/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(nuevoUsuarioServidor),
    });
    if (res.status === 201) {
      const resMessage = await res.json();

      setResponse(resMessage);
      window.location = "http://localhost:3000/login";
    } else {
      const resMessage = await res.json();

      setErrorMsg(resMessage.error);
    }
  }
  return (
    <div className="register-wrapper">
      <div className="register">
        <h1>Registro</h1>
        <p>
          Bienvenido a Ojeador. Regístrate para valorar y hacer o recibir
          ofertas
        </p>

        <form onSubmit={handleSubmit}>
          <label className="rol">
            Rol<span>*</span>
            <select
              onChange={(e) => setUserRol(e.target.value)}
              value={userRol}
            >
              <option value="Scout" key="Scout">
                Ojeador
              </option>
              <option value="Player" key="Player">
                Jugador
              </option>
            </select>
          </label>
          <label>
            {" "}
            Nombre<span>*</span>
            <input
              className="form-input"
              type="text"
              name="userName"
              placeholder="Nombre y Apellido"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label>
            {" "}
            Email<span>*</span>
            <input
              className="form-input"
              type="email"
              name="userEmail"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </label>
          <label>
            {" "}
            Contraseña<span>*</span>
            <input
              className="form-input"
              type="password"
              name="userPassword"
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </label>
          <label>
            {" "}
            Repita la Contraseña<span>*</span>
            <input
              className="form-input"
              type="password"
              name="userPassword"
              placeholder="Repetir Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </label>

          <div className="form-button">
            <button type="submit" className="button0">
              Enviar
            </button>
          </div>
          <div className="response-message">
            {errorMsg && <div>{errorMsg}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
