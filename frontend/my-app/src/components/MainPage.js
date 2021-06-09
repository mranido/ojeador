import React, { useContext, useEffect } from "react";
import { useState } from "react";

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
              <p>
                <span>
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
                </span>{" "}
                {url.userName}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
