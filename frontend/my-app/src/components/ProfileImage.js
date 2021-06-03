import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";


function ProfileImage(props) {
  const [token, setToken] = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const decodedToken = jwt_decode(token);
  const { userId } = decodedToken;

  const { userInfoReloader,id } = props;

  useEffect(() => {
    const loadUserInfo = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/profiles/${userId}`
      );
      if (response.ok) {
        const body = await response.json();
        setUserInfo(body);
      }
    };
    loadUserInfo();
  }, [userInfoReloader, userId]);

  
  return userInfo.userImage ? (
    <Link id={id} to={"/profile/user-profile"}>
      <div>{userInfo.userName}</div>
      <img
        src={`../../public/images/profiles/${userInfo.userImage
          .split(".")
          .pop()}`}
        alt="Foto de Perfil"
      ></img>
    </Link>
  ) : (
    <Link id={id} to={"/profile/user-profile"}>
      <div>{userInfo.userName}</div>{" "}
      <img
        src={`/public/images/profiles/image-default.png`}
        alt="Foto por defecto"
      ></img>
    </Link>
  );

}
export default ProfileImage;
