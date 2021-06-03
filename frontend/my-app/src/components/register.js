import { useState } from "react";
import React from "react";

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
        <p>Registro</p>

        <form onSubmit={handleSubmit}>
          <select onChange={(e) => setUserRol(e.target.value)} value={userRol}>
            <option value="Scout" key="Scout">
              Ojeador
            </option>
            <option value="Player" key="Player">
              Jugador
            </option>
          </select>
          <label>
            <input
              className="register-form-input"
              type="text"
              name="userName"
              placeholder="Nombre y Apellido"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label>
            <input
              className="register-form-input"
              type="email"
              name="userEmail"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </label>
          <label>
            <input
              className="register-form-input"
              type="password"
              name="userPassword"
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </label>
          <label>
            <input
              className="register-form-input"
              type="password"
              name="userPassword"
              placeholder="Repetir Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </label>

          <div className="register-form-button">
            <button type="submit">Enviar</button>
          </div>
          <div className="response-message">
            {errorMsg && <div>{errorMsg}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
