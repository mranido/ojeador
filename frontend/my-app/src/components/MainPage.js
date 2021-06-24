import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { decodeTokenData } from "../utils/decodeToken";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "./../imagesMenu/ojeador.svg";
import "./../style/MainPage.css";
import Filter from "./Filter";
import { getAge } from "../utils/getAge";
import { categories } from "../utils/categories";

export function MainPage() {
  const [user, setUser] = useState([]);
  const [userVideo, setUserVideo] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [userInfoReloader, setUserInfoReloader] = useState(0);
  const refreshUserInfo = () => setUserInfoReloader(Math.random());
  const [filter, setFilter] = useState({});
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
        const data = body.map((i) => {
          return {
            userCategory: categories(getAge(i.userBirthday)),
            userId: i.userId,
            videoUrl: i.videoUrl,
            videoIduser: i.videoIduser,
            userName: i.userName,
            userImage: i.userImage,
            userNumber: i.userNumber,
            avgMedia: i.avgMedia,
            userTeam: i.userTeam,
            userPosition: i.userPosition,
            skillName: i.SkillName,
          };
        });
        setUserVideo(data);
        setFilteredVideos(data.reverse());
      }
    };
    loadVideos();
  }, []);

  console.log(userVideo);
  useEffect(() => {
    let videos = userVideo;

    if (filter.age?.length) {
      videos = videos.filter((v) =>
        filter.age.includes(v.userCategory.toLowerCase())
      );
    }

    if (filter.position?.length) {
      videos = videos.filter((v) =>
        filter.position.includes(v.userPosition.toLowerCase())
      );
    }

    if (filter.skills?.length) {
      videos = videos.filter((v) => v.skillName.includes(filter.skills));
    }

    if (filter.team) {
      videos = videos.filter((v) =>
        v.userTeam.toLowerCase().includes(filter.team.toLowerCase())
      );
    }
    if (filter.team) {
      videos = videos.filter((v) =>
        v.userTeam.toLowerCase().includes(filter.team.toLowerCase())
      );
    }

    setFilteredVideos(videos);
  }, [filter, userVideo]);
  if (!userVideo) {
    return <p>No hay resultados para tu búsqueda</p>;
  }

  return (
    <>
      <Filter setFilter={setFilter} />
      <div className="wrap-centra-column">
        <ul className="tag-information">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((url, index) => {
              return (
                <li key={url.videoUrl} prop={url.userId} className="videosli">
                  <video
                    className="video"
                    controls
                    src={`/videos/${url.videoUrl}`}
                    type="video/mp4"
                  >
                    {" "}
                  </video>
                  <div>
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
                      {userRol === "Scout" ? (
                        <Link
                          to={{
                            pathname: "/contact",
                            state: {
                              id: url.userId,
                              image: url.userImage,
                              userName: url.userName,
                              avgMedia: url.avgMedia,
                            },
                          }}
                        >
                          <button className="button3">Contacta</button>
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <>
              <img
                src={logo}
                className="img-not-found"
                alt="Imagen de ojeador"
              ></img>
              <p> No hay resultados para tu búsqueda</p>
            </>
          )}
        </ul>
      </div>
    </>
  );
}
