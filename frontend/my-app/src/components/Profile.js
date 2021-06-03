import React from "react";

import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { UpdateUser } from "./UpdateUser";
import { UploadVideo } from "./UploadVideo";
import Logout from "./Logout";


function Profile() {
  let { path, url } = useRouteMatch();

  return (
    <div className="profile-buttons">
      <div className="buttons-wrapper">
        <Link to={`${url}/user-profile`}>
          <button type="submit">USUARIO</button>
        </Link>
        <Link to={`${url}/upload-video`}>
          <button type="submit">Subir Vídeos</button>
        </Link>
        <Link to={`${url}/logout`}>
          <button type="submit">Logout</button>
        </Link>
      </div>

      <Switch>
        <Route path={`${path}/user-profile`}>
          <UpdateUser />
        </Route>
        <Route path={`${path}/upload-video`}>
          <UploadVideo />
        </Route>
        <Route path={`${path}/logout`}>
          <Logout />
        </Route>
      </Switch>
    </div>
  );
}

export default Profile;
