import React, { Fragment, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import jwtDecode from "jwt-decode";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "../style/Button.css";

export const UploadVideo = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [userVideo, setUserVideo] = useState([]);
  const [uploadedFile, setUploadedFile] = useState({});
  const [token] = useContext(AuthContext);
  const decodedToken = jwtDecode(token);
  const { userId, userRol } = decodedToken;
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [userInfoReloader, setUserInfoReloader] = useState(0);
  const refreshUserInfo = () => setUserInfoReloader(Math.random());

  useEffect(() => {
    const loadVideos = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/videos/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const body = await response.json();
        setUserVideo(body);
      }
    };
    loadVideos();
  }, [token, userId]);

  let videoUrl = userVideo
    .map((i) => {
      return {
        userId: i.userId,
        videoId: i.videoId,
        videoUrl: i.videoUrl,
        videoIduser: i.videoIduser,
        userName: i.userName,
        userImage: i.userImage,
        userNumber: i.userNumber,
        avgMedia: i.avgMedia,
        userTeam: i.userTeam,
        userPosition: i.userPosition,
      };
    })
    .reverse();

  let { videoId } = videoUrl;
  console.log(videoId);
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileVideo", file);
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/videos/user/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );

      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile("");

      setMessage("Vídeo subido correctamente");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage(
          "Hubo un problema con el servidor, vuelve a cargar la página"
        );
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };
  const deletedVideo = async (videoId, e) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/videos/user/${userId}/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );

      setMessage("Vídeo eliminado");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("Ocurrió un problema con el servidor");
      } else {
        setMessage(err.response.data.msg);
      }
    }
    refreshUserInfo();
  };

  return (
    <>
      {token && userRol === "Player" ? (
        <div>
          <div className="App">
            <form onSubmit={uploadFile}>
              <div className="form-button">
                <label for="buttoni">Escoge un Vídeo</label>
                <input id="buttoni" type="file" onChange={onFileChange} />
              </div>
              <button className="button1" type="submit">
                Subir Vídeo
              </button>
            </form>
          </div>
          <>
            <div className="wrap-centra-column">
              <ul className="tag-information">
                {videoUrl.map((url, index) => {
                  return (
                    <li
                      key={url.videoId}
                      prop={url.videoId}
                      className="videosli"
                    >
                      <video
                        className="video"
                        controls
                        src={`/videos/${url.videoUrl}`}
                        type="video/mp4"
                      ></video>
                      <div>
                        {" "}
                        <div className="container-infowithbutton">
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
                          </div>
                          <div className="cubo-vasura">
                            <FaTrashAlt
                              onClick={() => deletedVideo(url.videoId)}
                            ></FaTrashAlt>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        </div>
      ) : (
        <Redirect to="/profile/user-profile" />
      )}
      <p className="form-input">{message ? <div>{message}</div> : ""}</p>
    </>
  );
};
