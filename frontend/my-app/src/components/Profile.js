import React from "react";

import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { UpdateUser } from "./UpdateUser";
import { UploadVideo } from "./UploadVideo";
import Logout from "./Logout";
import { GetProfileUser } from "./UserProfile";


function Profile() {
  let { path, url } = useRouteMatch();

  return (
    <div className="profile-buttons">
      <div className="buttons-wrapper">
        <Link to={`${url}/update-user-profile`}>
          <button type="submit">Cambiar Perfil</button>
        </Link>
        <Link to={`${url}/upload-video`}>
          <button type="submit">Subir Vídeos</button>
        </Link>
        <Link to={`${url}/logout`}>
          <button type="submit">Logout</button>
        </Link>
        <Link to={`${url}/user-profile`}>
          <button type="submit">Profile</button>
        </Link>
      </div>

      <Switch>
        <Route path={`${path}/update-user-profile`}>
          <UpdateUser />
        </Route>
        <Route path={`${path}/upload-video`}>
          <UploadVideo />
        </Route>
        <Route path={`${path}/logout`}>
          <Logout />
        </Route>
        <Route path={`${path}/user-profile`}>
          <GetProfileUser />
        </Route>
      </Switch>
    </div>
  );
}

export default Profile;