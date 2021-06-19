import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import jwtDecode from "jwt-decode";
import { Redirect } from "react-router";

export const UploadProfileImage = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [token] = useContext(AuthContext);
  const decodedToken = jwtDecode(token);
  const { userId, userRol } = decodedToken;
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [userInfoReloader, setUserInfoReloader] = useState(0);
  const refreshUserInfo = () => setUserInfoReloader(Math.random());

  console.log(userId);
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/users/profiles/upload-photo/${userId}`,
        formData,
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

      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 1000);

      const { fileName, filePath } = res.data;

      setUploadedFile("Imagen subida correctamente");

      setMessage("Imagen de Pefil cambiada correctamente");
      refreshUserInfo();
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
      {token ? (
        <div className="App">
          <form onSubmit={uploadFile}>
            <div>
              <div className="form-button">
                <label for="buttoni">Selecciona Foto de Perfil</label>
                <input
                  id="buttoni"
                  className="button0"
                  type="file"
                  onChange={onFileChange}
                />
              </div>
            </div>
            <button className="button1" type="submit">
              Cambiar Foto
            </button>
          </form>
        </div>
      ) : (
        <Redirect to="/profile" />
      )}
      {message ? <div>{message}</div> : ""}
    </>
  );
};
