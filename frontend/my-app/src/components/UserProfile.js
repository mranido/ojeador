import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import jwt_decode from "jwt-decode";
import { getAge } from "../utils/getAge";
import moment from "moment";
import { categories } from "../utils/categories";
import { GetSkills } from "./Skills";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./../style/Button.css";
import "./../style/Star.css";

function GetMyProfile() {
  const [token, setToken] = useContext(AuthContext);
  const decodedToken = jwt_decode(token);
  const { userId, userRol } = decodedToken;

  return (
    <>
      <GetProfile id={userId} />
      <div className="form-button">
        <button className="button0">
          <a href="/profile/update-user-profile">Edita tu Perfil</a>
        </button>
      </div>
      {userRol === "Player" ? (
        <div className="form-button">
          <button className="button1">
            <a href="/profile/upload-video">Sube un vídeo</a>
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
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
  const [userPosition, setUserPosition] = useState("Elije tu posición");
  const [userDescription, setUserDescription] = useState("");
  const [response, setResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [userRating, setUserRating] = useState("");
  const [userAverage, setUserAverage] = useState("");

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

  useEffect(() => {
    const loadUserRating = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/ratings/user/${id}/avgrating`
      );
      if (response.ok) {
        const body2 = await response.json();
        setUserRating(body2);
        setUserAverage(body2.averagePuntuation);
      }
    };
    loadUserRating();
  }, [id]);
  const avgPunt = () => {
    if (userRating) {
      return userRating.map((i) => i.averagePuntuation).pop();
    } else {
      return " ";
    }
  };

  const birth = moment(userInfo.userBirthday).format("YYYY-MM-DD");
  const age = getAge(birth);
  const category = categories(age);
  return (
    <div className="name-team">
      <div className="position-name">
        {userInfo.userRol === "Player" ? (
          <div className="profilenumber">{userInfo.userNumber}</div>
        ) : (
          ""
        )}
        <div className="profilename">{userInfo.userName}</div>
      </div>
      <div className="imageandpuntuation">
        <div className="containerprofileimage">
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
        {avgPunt() && userInfo.userRol === "Player" ? (
          <div className="star">
            {Array(5)
              .fill()
              .map((item, index) => {
                return (
                  <FaStar
                    key={Math.random()}
                    className="star"
                    size={20}
                    color={Number(avgPunt()) > index ? "#5ACA75" : "#e4e5e9"}
                  />
                );
              })}
            <span>{Number(avgPunt())}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      {userInfo.userRol === "Player" ? (
        <div className="space">
          Edad: <span className="bold"> {age > 0 ? age : "-"} años </span>
          <span className="bold">({category})</span>
        </div>
      ) : (
        ""
      )}
      {userInfo.userRol === "Player" ? (
        <div className="space">
          Posición: <span className="bold"> {userInfo.userPosition}</span>{" "}
        </div>
      ) : (
        ""
      )}
      <div className="space">
        Equipo: <span className="bold"> {userInfo.userTeam} </span>{" "}
      </div>
      <div className="space">
        Localidad: <span className="bold"> {userInfo.userLocation} </span>{" "}
      </div>
      <div className="space">
        <p>{userInfo.userDescription}</p>
      </div>
      {userInfo.userRol === "Player" ? <GetSkills id={id} /> : ""}
    </div>
  );
}

export { GetMyProfile, GetUserProfile };
