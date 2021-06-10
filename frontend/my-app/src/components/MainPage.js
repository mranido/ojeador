import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./../style/MainPage.css";

export function MainPage() {
  const [user, setUser] = useState([]);
  const [userVideo, setUserVideo] = useState([]);
  const [userInfoReloader, setUserInfoReloader] = useState(0);
  const refreshUserInfo = () => setUserInfoReloader(Math.random());

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
    <div>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {videoUrl.map((url, index) => {
          return (
            <li key={url.videoUrl}>
              <video
                controls
                src={`/videos/${url.videoUrl}`}
                type="video/mp4"
                width="320"
                height="180"
              >
                {" "}
              </video>
              <div>
                <div className="container-info">
                  <div>
                    {url.userImage ? (
                      <img
                        src={`/images/profiles/${url.userImage}`}
                        alt="Imagen de perfil"
                        className="image"
                      ></img>
                    ) : (
                      <img
                        src={`/images/profiles/image-default.png`}
                        alt="Imagen de perfil"
                        className="image"
                      ></img>
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
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
