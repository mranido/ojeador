import { useState, useEffect, useContext } from "react";
import React from "react";
import { AuthContext } from "./AuthContext";
import jwt_decode from "jwt-decode";
import { FaStar } from "react-icons/fa";

function GetSkills({ id }) {
  const [userInfo, setUserInfo] = useState([]);
  const [token, setToken] = useContext(AuthContext);
  const [hover, setHover] = useState(null);
  const decodedToken = jwt_decode(token);
  const { userId, userRol } = decodedToken;
  const [formState, setFormState] = useState("");
  const [rating, setRating] = useState([]);
  const [userInfoReloader, setUserInfoReloader] = useState(0);
  const refreshUserInfo = () => setUserInfoReloader(Math.random());

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
  }, [userId, id]);
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
  }, [userId, id]);

  const userRatings = userInfo.map((skill) => {
    const playerSkill = rating.find((r) => r.skillName === skill.skillName);

    return {
      skill: skill.skillName,
      value: playerSkill ? Number(playerSkill.userPuntuation) : 0,
    };
  });

  if (!userRatings) return <p>Cargando...</p>;

  return (
    <div>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {userRatings.map((rating, index) => {
          return (
            <li key={rating.skill}>
              {rating.skill}
              {Array(5)
                .fill()
                .map((item, index) => {
                  return (
                    <FaStar
                      className="star"
                      size={25}
                      color={rating.value > index ? "#5ACA75" : "#e4e5e9"}
                    />
                  );
                })}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { GetSkills };
