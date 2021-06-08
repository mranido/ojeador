import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import jwt_decode from "jwt-decode";
import ProfileImage from "./ProfileImage";
import { UploadProfileImage } from "./UploadProfileImage";
import { getAge } from "../utils/getAge";
import moment from "moment";
import { categories } from "../utils/categories";
import Menu from "./Menu";
import { GetSkills } from "./Skills";
import { useParams } from "react-router-dom";

function GetMyProfile() {
  const [token, setToken] = useContext(AuthContext);
  const decodedToken = jwt_decode(token);
  const { userId } = decodedToken;

  return <GetProfile id={userId} />;
}

function GetUserProfile() {
  const { id } = useParams();

  return <GetProfile id={id} />;
}

function GetProfile({ id }) {
  const [userName, setUserName] = useState("");
  const [userRol, setUserRol] = useState("");
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

  const [userImage, setUserImage] = useState("");
  const [formState, setFormState] = useState("");

  const [userInfoReloader, setUserInfoReloader] = useState(0);
  const refreshUserInfo = () => setUserInfoReloader(Math.random());

  useEffect(() => {
    const loadUserInfo = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/profiles/${id}`
      );
      if (response.ok) {
        const body = await response.json();
        setUserInfo(body.user);
        setUserRol(body.user.userRol);
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
  }, [formState, id, userBirthday]);

  const birth = moment(userInfo.userBirthday).format("YYYY-MM-DD");
  const age = getAge(birth);
  const category = categories(age);
  return (
    <>
      {userInfo.userRol === "Player" ? <div>{userInfo.userNumber}</div> : ""}
      <div>{userInfo.userName}</div>
      <div>
        {userInfo.userImage ? (
          <img
            src={`/images/profiles/${userInfo.userImage}`}
            alt="Imagen de perfil"
            className="profileimage"
          ></img>
        ) : (
          <img
            src={`/images/profiles/image-default.png`}
            alt="Imagen de perfil"
            className="profileimage"
          ></img>
        )}
      </div>
      {userInfo.userRol === "Player" ? (
        <div>
          Edad: {age} años <span>({category})</span>
        </div>
      ) : (
        ""
      )}
      {userInfo.userRol === "Player" ? (
        <div>Posición: {userInfo.userPosition} </div>
      ) : (
        ""
      )}
      <div>Equipo: {userInfo.userTeam} </div>
      <div>Localidad: {userInfo.userLocation} </div>
      <div>
        <p>{userInfo.userDescription}</p>
      </div>
      {userInfo.userRol === "Player" ? <GetSkills id={id} /> : ""}
    </>
  );
}

export { GetMyProfile, GetUserProfile };
