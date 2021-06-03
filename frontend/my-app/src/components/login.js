import React, { useContext } from "react";
import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import  {AuthContext} from "./AuthContext";

function LoginForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();

    const nuevoUsuarioServidor = {
      userEmail: userEmail,
      userPassword: userPassword,
    };

    const res = await fetch("http://localhost:8000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nuevoUsuarioServidor),
    });
    if (res.status === 200) {
      const resMessage = await res.json();
      setToken(resMessage.accessToken);
    } else {
      const resMessage = await res.json();

      setErrorMsg(resMessage.error);
    }
  }

  return (
    <>
      {token ? (
        <Redirect to="/" />
      ) : (
        <div className="login-wrapper">
          <div className="login">
            <Link to="/"></Link>

            <p>Mi Cuenta</p>

            <form onSubmit={handleSubmit}>
              <label>
                <input
                  className="form-input"
                  type="email"
                  name="userEmail"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Email"
                />
              </label>
              <label>
                <input
                  className="form-input"
                  type="password"
                  name="userPassword"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="Introduzca tu contraseña"
                />
              </label>

              <div className="not-registered">
                <Link to="/register">
                  <p>¿Aún no estás registrado?</p>
                </Link>
              </div>

              <div className="form-button">
                <button type="submit">Enviar</button>
              </div>
              {errorMsg && <div>{errorMsg}</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginForm;
