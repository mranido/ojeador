import { useState, useEffect, useContext } from "react";
import React from "react";
import { AuthContext } from "./AuthContext";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
//import { AuthContext } from "./AuthContext";
//import jwt_decode from "jwt-decode";
import { FaStar } from "react-icons/fa";

function GetSkills({ id, setUserVoted }) {
  const [userInfo, setUserInfo] = useState([]);
  //const [token, setToken] = useContext(AuthContext);
  const [hover, setHover] = useState(null);
  const [votation, setVotation] = useState([]);
  const [formState, setFormState] = useState("");
  const [rating, setRating] = useState([]);
  const [userInfoReloader, setUserInfoReloader] = useState(0);
  const refreshUserInfo = () => setUserInfoReloader(Math.random());
  const [token] = useContext(AuthContext);
  let userId;
  if (token) {
    userId = jwtDecode(token).userId;
  }

  useEffect(() => {
    const loadSkillInfo = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/skills/${id}`
      );
      if (response.ok) {
        const body = await response.json();
        setUserInfo(body);
      }
    };
    loadSkillInfo();
  }, [id]);
  useEffect(() => {
    const loadPuntuationInfo = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/ratings/user/${id}`
      );
      if (response.ok) {
        const body2 = await response.json();
        setRating(body2);
      }
    };
    loadPuntuationInfo();
  }, [id, userInfoReloader]);
  if (!rating) {
    return <p>Cargando</p>;
  }

  const userRatings = userInfo.map((skill) => {
    const playerSkill = rating.find((r) => r.skillName === skill.skillName);

    return {
      ratingPositionSkillId: skill.positionSkillId,
      skill: skill.skillName,
      value: playerSkill ? Number(playerSkill.userPuntuation) : 0,
    };
  });
  console.log(userRatings);

  async function handleVote({ skill, vote }) {
    const newvote = {
      ratingPositionSkillId: skill,
      ratingValue: vote,
    };

    const respuesta = await fetch(
      `http://localhost:8000/api/v1/ratings/user/${id}/${userId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(newvote),
      }
    );

    if (respuesta.ok) {
      refreshUserInfo();
    } else {
      alert("No seas presuntuoso. ¡Deja al resto de usuarios la valoración!");
    }
  }

  if (!userRatings) return <p>Cargando...</p>;

  return (
    <div>
      <ul
        style={{
          listStyle: "none",
          paddingLeft: 0,
        }}
      >
        {userRatings.map((rating, index) => {
          return (
            <li
              className="star-rating"
              key={rating.skill + index + rating.value}
            >
              <div className="skill">{rating.skill}</div>
              <div className="star-wrapper">
                {Array(5)
                  .fill()
                  .map((item, index) => {
                    return (
                      <FaStar
                        key={Math.random()}
                        className="star"
                        size={20}
                        value={rating.value}
                        color={rating.value > index ? "#5ACA75" : "#e4e5e9"}
                        onClick={() => {
                          if (userId) {
                            handleVote({
                              skill: rating.ratingPositionSkillId,
                              vote: index + 1,
                            });
                            setUserVoted(true);
                          } else {
                            alert("Debes de estar registrado para poder votar");
                          }
                          //handleSubmit();
                        }}
                      />
                    );
                  })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { GetSkills };
