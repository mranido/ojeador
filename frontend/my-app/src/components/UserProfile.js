import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import jwt_decode from "jwt-decode";
import ProfileImage from "./ProfileImage";
import { UploadProfileImage } from "./UploadProfileImage";
import { getAge } from "../utils/getAge";
import moment from "moment";
import {categories} from "../utils/categories"
import Menu from "./Menu";

function GetProfileUser() {
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
  }, [formState, userId, userBirthday]);

    

  const birth = moment(userInfo.userBirthday).format("YYYY-MM-DD");
  const age = getAge(birth);
  const category = categories(age);
  return (
    <>
      {userRol === "Player" ? <div>{userInfo.userNumber}</div> : ""}
      <div>{userInfo.userName}</div>
      <div>
        <img
          src={`/images/profiles/${userInfo.userImage}`}
          alt="Imagen de perfil"
          className="profileimage"
        ></img>
      </div>
      {userRol === "Player" ? (
        <div>
          Edad: {age} años <span>({category})</span>
        </div>
      ) : (
        ""
      )}
      {userRol === "Player" ? (
        <div>Posición: {userInfo.userPosition} </div>
      ) : (
        ""
      )}
      <div>Equipo: {userInfo.userTeam} </div>
      <div>Localidad: {userInfo.userLocation} </div>
      <div>
        <p>{userInfo.userDescription}</p>
      </div>
    </>
  );
}

export { GetProfileUser };
