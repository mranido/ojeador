import React, { useContext, useEffect } from "react";
import { useState } from "react";

export function MainPage() {
  const [user, setUser] = useState([]);
  const [userVideo, setUserVideo] = useState([]);
  const [userId, setUserId] = useState("");
  const [userImage, setUserImage] = useState("");
  const [videoIduser, setVideoIduser] = useState("");
  const [userInfoReloader, setUserInfoReloader] = useState(0);
  const refreshUserInfo = () => setUserInfoReloader(Math.random());

  useEffect(() => {
    const loadVideos = async () => {
      const response = await fetch(`http://localhost:8000/api/v1/videos/`);
      if (response.ok) {
        const body2 = await response.json();
        setUserVideo(body2);
        setVideoIduser(body2.videoIduser);
      }
    };
    loadVideos();
  }, []);

  useEffect(() => {
    const loadUserInfo = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/profiles/`
      );
      if (response.ok) {
        const body = await response.json();
        setUser(body.user);
      }
    };
    loadUserInfo();
  }, []);

  console.log(user);
  let videoUrl = userVideo
    .map((i) => {
      return { videoUrl: i.videoUrl, videoIduser: i.videoIduser };
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
              <p>{url.videoIduser}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
