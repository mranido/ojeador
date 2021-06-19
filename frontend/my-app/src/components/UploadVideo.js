import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import jwtDecode from "jwt-decode";
import { Redirect } from "react-router";
import "../style/Button.css";

export const UploadVideo = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [token] = useContext(AuthContext);
  const decodedToken = jwtDecode(token);
  const { userId, userRol } = decodedToken;
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  console.log(userId);
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

      setUploadedFile("Vídeo subido correctamente");

      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };
  return (
    <>
      {token && userRol === "Player" ? (
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
      ) : (
        <Redirect to="/profile/user-profile" />
      )}
    </>
  );
};
