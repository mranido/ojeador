import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import jwt_decode from "jwt-decode";

const useContactPlayer = () => {
  const [token, setToken] = useContext(AuthContext);
  const decodedToken = jwt_decode(token);
  const { userId } = decodedToken;
  const [contactPlayer, setContactPlayer] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const res = await fetch(
        `http://localhost:8000/api/v1/contact/player/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedNotifications = await res.json();
      setContactPlayer(fetchedNotifications);
    };

    getContacts();
    let interval = setInterval(() => getContacts(), 50000);

    return () => {
      clearInterval(interval);
    };
  }, [token, userId]);

  return [contactPlayer, setContactPlayer];
};

export default useContactPlayer;
