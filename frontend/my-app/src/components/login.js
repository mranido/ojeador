import React, { useContext } from "react";
import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { AiFillEye } from "react-icons/ai";
import "./../style/Login.css";
const eye = <AiFillEye />;

function LoginForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

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
        <Redirect to="/profile/user-profile" />
      ) : (
        <div className="login-wrapper">
          <div className="login">
            <Link to="/"></Link>
            <h1>Iniciar sesión</h1>
            <p>Bienvenido a Ojeador.</p>
            <p>Accede con tu credenciales:</p>

            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Email <span>*</span>
                  <div className="email">
                    <input
                      className="form-input"
                      type="email"
                      name="userEmail"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </label>
              </div>
              <div>
                <label>
                  Contraseña <span>*</span>
                  <div className="pass-wrapper">
                    <input
                      className="form-input"
                      type={passwordShown ? "text" : "password"}
                      name="userPassword"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      placeholder="Introduce tu contraseña"
                    />
                    <i onClick={togglePasswordVisiblity}>{eye}</i>{" "}
                  </div>
                </label>
              </div>
              <div className="not-registered">
                <Link to="/register">
                  <p>¿Aún no estás registrado?</p>
                </Link>
              </div>
              <div className="form-button">
                <button className="button0" type="submit">
                  Enviar
                </button>
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
