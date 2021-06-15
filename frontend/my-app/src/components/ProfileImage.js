import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import "./../style/ProfileImage.css";

function ProfileImage(props) {
  const [token, setToken] = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const [userImage, setUserImage] = useState("");
  const decodedToken = jwt_decode(token);
  const { userId } = decodedToken;

  const { userInfoReloader, id } = props;

  useEffect(() => {
    const loadUserInfo = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/profiles/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const body = await response.json();
        setUserInfo(body);
        setUserImage(body.userImage);
      }
    };
    loadUserInfo();
  }, [userInfoReloader, userId]);

  if (userInfo) {
    return userInfo.user.userImage ? (
      <>
        <div>{userInfo.user.userName}</div>
        <img
          className="profileimage"
          src={`/images/profiles/${userInfo.user.userImage}`}
          alt="Foto de Perfil"
        ></img>
      </>
    ) : (
      <>
        <div>{userInfo.user.userName}</div>{" "}
        <img
          src={`/images/profiles/image-default.png`}
          alt="Foto por defecto"
        ></img>
      </>
    );
  } else {
    return "";
  }
}
export default ProfileImage;
