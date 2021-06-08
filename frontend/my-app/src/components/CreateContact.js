import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CreateContact = ({ userId }) => {
  const [token] = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const request = async (e) => {
    console.log("content", content);
    await fetch(
      `http://localhost:8000/api/v1/contact/user/${userId}/contact/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      }
    );
  };

  return (
    <form id={"requestPopUp"} className={"hidden"} onSubmit={request}>
      <textarea
        name="reqContent"
        id="reqContent"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={"Escribe aquí..."}
      />
      <button>Enviar</button>
    </form>
  );
};
