import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { decodeTokenData } from "../utils/decodeToken";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./../style/MainPage.css";
import Filter from "./Filter";

export function MainPage() {
  const [user, setUser] = useState([]);
  const [userVideo, setUserVideo] = useState([]);
  const [userInfoReloader, setUserInfoReloader] = useState(0);
  const refreshUserInfo = () => setUserInfoReloader(Math.random());
  const [token] = useContext(AuthContext);
  const decodedToken = () => {
    if (!decodeTokenData(token)) {
      return " ";
    } else {
      return decodeTokenData(token).userRol;
    }
  };

  const userRol = decodedToken();

  useEffect(() => {
    const loadVideos = async () => {
      const response = await fetch(`http://localhost:8000/api/v1/videos/`);
      if (response.ok) {
        const body = await response.json();
        setUserVideo(body);
      }
    };
    loadVideos();
  }, []);

  let videoUrl = userVideo
    .map((i) => {
      return {
        userId: i.userId,
        videoUrl: i.videoUrl,
        videoIduser: i.videoIduser,
        userName: i.userName,
        userImage: i.userImage,
        userNumber: i.userNumber,
        avgMedia: i.avgMedia,
      };
    })
    .reverse();

  return (
    <>
      <Filter />
      <div className="wrap-centra-column">
        <ul className="tag-information">
          {videoUrl.map((url, index) => {
            return (
              <li key={url.videoUrl} prop={url.userId}>
                <video
                  className="video"
                  controls
                  src={`/videos/${url.videoUrl}`}
                  type="video/mp4"
                >
                  {" "}
                </video>
                <div>
                  <div className="container-info">
                    <div>
                      {url.userImage ? (
                        <Link to={`/profile/user/${url.userId}`}>
                          <img
                            src={`/images/profiles/${url.userImage}`}
                            alt="Imagen de perfil"
                            className="image"
                          ></img>
                        </Link>
                      ) : (
                        <Link to={`/profile/user/${url.userId}`}>
                          <img
                            src={`/images/profiles/image-default.png`}
                            alt="Imagen de perfil"
                            className="image"
                          ></img>
                        </Link>
                      )}{" "}
                    </div>{" "}
                    <div>
                      <div>{url.userName}</div>
                      {url.avgMedia ? (
                        <div>
                          {url.avgMedia}
                          <FaStar color="#5ACA75"></FaStar>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {userRol === "Scout" ? (
                      <Link
                        to={{
                          pathname: "/contact",
                          state: {
                            id: url.userId,
                            image: url.userImage,
                            userName: url.userName,
                          },
                        }}
                      >
                        <button>Contacta</button>
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
