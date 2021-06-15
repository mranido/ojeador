import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router";

const useContactMessage = () => {
  const [token, setToken] = useContext(AuthContext);
  const decodedToken = jwt_decode(token);
  const { userId } = decodedToken;
  const { contactId } = useParams();
  const [messageId, setMessageId] = useState([]);

  useEffect(() => {
    const getMessageById = async () => {
      const res = await fetch(
        `http://localhost:8000/api/v1/contact/${userId}/${contactId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const fetchedNotifications = await res.json();
        setMessageId(fetchedNotifications);
      }
    };

    getMessageById();
  }, [token, userId, contactId]);

  return [messageId, setMessageId];
};

export default useContactMessage;
