import { useState, useEffect } from "react";

const usePlayerProfile = (userId) => {
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    const getUserProfile = async () => {
      const res = await fetch(
        `http://localhost:8000/api/v1/users/profiles/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const fetchedUserProfile = await res.json();
      setUserProfile(fetchedUserProfile);
    };

    getUserProfile();
    let interval = setInterval(() => getUserProfile(), 1000);

    return () => {
      clearInterval(interval);
    };
  }, [userId]);
  console.log(userId);

  return [userProfile, setUserProfile];
};

export default usePlayerProfile;
