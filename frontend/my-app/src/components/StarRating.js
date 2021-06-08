import React, { useState, useEffect, useContext } from "react";
import { FaStar } from "react-icons/fa";
import "./../style/StarRating.css";
import { AuthContext } from "./AuthContext";
import jwt_decode from "jwt-decode";

const StarRating = (props) => {
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(null);
    const [token, setToken] = useContext(AuthContext);
    const decodedToken = jwt_decode(token);
    const { userId, userRol } = decodedToken;
    useEffect(() => {
      const loadPuntuationInfo = async () => {
        const response = await fetch(
          `http://localhost:8000/api/v1/ratings/user/${userId}`
        );
        if (response.ok) {
          const body2 = await response.json();
          setRating(body2);
        }
      };
      loadPuntuationInfo();
    }, [userId]);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={rating.userPuntuation}
              onClick={() => setRating(ratingValue)}
            ></input>
            <FaStar
              className="star"
              size={100}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
