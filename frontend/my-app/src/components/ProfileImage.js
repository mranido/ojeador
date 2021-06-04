import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";


function ProfileImage(props) {
  const [token, setToken] = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const [userImage, setUserImage] = useState("");
  const decodedToken = jwt_decode(token);
  const { userId } = decodedToken;

  const { userInfoReloader,id } = props;

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
        setUserImage(body.userImage)
      }
    };
    loadUserInfo();
  }, [userInfoReloader, userId]);


  if(userInfo) {
    return userInfo.user.userImage ? (
      <Link id={id} to={"/profile/user-profile"}>
        <div>{userInfo.user.userName}</div>
        <img
          src={`/images/profiles/${userInfo.user.userImage}`}
          alt="Foto de Perfil"
        ></img>
      </Link>
    ) : (
      <Link id={id} to={"./profile/user-profile"}>
        <div>{userInfo.user.userName}</div>{" "}
        <img
          src={`/images/profiles/image-default.png`}
          alt="Foto por defecto"
        ></img>
      </Link>
    );
  } else{return 'Vete a tomar por culo'};

}
export default ProfileImage;
