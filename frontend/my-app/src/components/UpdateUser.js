import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import jwt_decode from "jwt-decode";
import ProfileImage from "./ProfileImage";
import { UploadProfileImage } from "./UploadProfileImage";

function UpdateUser() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userTeam, setUserTeam] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [userPosition, setUserPosition] = useState("Portero");
  const [userDescription, setUserDescription] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [token, setToken] = useContext(AuthContext);
  const decodedToken = jwt_decode(token);
  const [userImage, setUserImage] = useState("");
  const { userId, userRol } = decodedToken;
  const [formState, setFormState] = useState("");

  const [userInfoReloader, setUserInfoReloader] = useState(0);
  const refreshUserInfo = () => setUserInfoReloader(Math.random());

  useEffect(() => {
    const loadUserInfo = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/profiles/${userId}`
      );
      if (response.ok) {
        const body = await response.json();
        setUserInfo(body.user);
        setUserEmail(body.user.userEmail);
        setUserName(body.user.userName);
        setUserTeam(body.user.userTeam);
        setUserNumber(body.user.userNumber);
        setUserDescription(body.user.userDescription);
        setUserLocation(body.user.userLocation);
        setUserBirthday(body.user.userBirthday);
        setUserPosition(body.user.userPosition);
        setUserImage(body.user.userImage);
        setFormState("activo");
      }
    };
    loadUserInfo();
  }, [formState, userId]);


  async function handleSubmit(event) {
    event.preventDefault();

    const nuevoUsuarioPlayer = {
      userName: userName,
      userEmail: userEmail,
      userBirthday: userBirthday,
      userDescription: userDescription,
      userLocation: userLocation,
      userNumber: userNumber,
      userPosition: userPosition,
      userTeam: userTeam,
    };
    const nuevoUsuarioScout = {
      userName: userName,
      userEmail: userEmail,
      userTeam: userTeam,
      userDescription: userDescription,
      userLocation: userLocation,
    };
 
    const res =
      userRol === "Player"
        ? await fetch(
            `http://localhost:8000/api/v1/users/profiles/update_player/${userId}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(nuevoUsuarioPlayer),
            }
          )
        : await fetch(
            `http://localhost:8000/api/v1/users/profiles/update_scout/${userId}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(nuevoUsuarioScout),
            }
          );
    if (res.ok) {
      const resMessage = await res.json();
      setResponse("Usuario Actualizado");
    } else {
      const resMessage = await res.json();
      console.log("eso es el res message", resMessage);
      setResponse(resMessage.error);
    }
    refreshUserInfo();
  }
  return (
    <div className="updateuser-container">
      <div className="update-user-wrapper">
        <p className="update-user-wrapper-p">EDITAR USUARIO</p>
        <ProfileImage id="avatar-profile" userInfoReloader={userInfoReloader} />
        <div className="upload-image-wrapper">
          <div className="upload-image">
            <UploadProfileImage />
          </div>
        </div>

        <div className="update-user">
          <form onSubmit={handleSubmit}>
            <label htmlFor="userName">
              <p>Nombre</p>
              <input
                className="update-user-input"
                type="text"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <label htmlFor="userEmail">
              <p>Email</p>
              <input
                className="update-user-input"
                type="email"
                name="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </label>
            <label htmlFor="userLocation">
              <p>Localidad</p>
              <input
                className="update-user-input"
                type="text"
                name="userLocation"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
              />
            </label>
            <label htmlFor="userTeam">
              <p>Equipo</p>
              <input
                className="update-user-input"
                type="text"
                name="userTeam"
                value={userTeam}
                onChange={(e) => setUserTeam(e.target.value)}
              />
            </label>
            {userRol === "Player" ? (
              <label htmlFor="userNumber">
                <p>Número camiseta</p>
                <input
                  className="update-user-input"
                  type="number"
                  name="userNumber"
                  value={userNumber}
                  onChange={(e) => setUserNumber(e.target.value)}
                />
              </label>
            ) : (
              ""
            )}

            {userRol === "Player" ? (
              <label htmlFor="userBirthday">
                <p>Fecha de Nacimiento</p>
                <input
                  className="update-user-input"
                  type="date"
                  name="userBirthday"
                  value={userBirthday}
                  onChange={(e) => setUserBirthday(e.target.value)}
                />
              </label>
            ) : (
              ""
            )}
            {userRol === "Player" ? (
              <div>
                <p>Elija su posición</p>
                <select
                  onChange={(e) => setUserPosition(e.target.value)}
                  value={userPosition}
                >
                 <option value ='Valor a Seleccionar'>Elija su posicion</option> 
                  <option value="Portero" key="Portero">
                    Portero
                  </option>
                  <option value="Defensa" key="Defensa">
                    Defensa
                  </option>
                  <option value="Mediocentro" key="Mediocentro">
                    Mediocentro
                  </option>
                  <option value="Delantero" key="Delantero">
                    Delantero
                  </option>
                </select>
              </div>
            ) : (
              ""
            )}
            <label htmlFor="userDescription">
              Descripción
              <textarea
                id="userDescription"
                value={userDescription}
                onChange={(e) => setUserDescription(e.target.value)}
              />
            </label>
            <div className="update-user-button">
              <button type="submit">Guardar cambios</button>
            </div>
          </form>
          <div className="response-message-player">
            {response && <div>{response}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export { UpdateUser };
