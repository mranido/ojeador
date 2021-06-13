import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import jwt_decode from "jwt-decode";

const useContactPlayer = () => {
  const [token] = useContext(AuthContext);
  const decodedToken = jwt_decode(token);
  const { userId } = decodedToken;
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const res = await fetch(`http://localhost:8000/player/${userId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
      });

      const fetchedNotifications = await res.json();
      setContacts(fetchedNotifications);
    };

    getContacts();
    let interval = setInterval(() => getContacts(), 50000);

    return () => {
      clearInterval(interval);
    };
  }, [token, userId]);

  return [contacts, setContacts];
};

export default useContactPlayer;
