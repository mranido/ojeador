import React from "react";

import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { UpdateUser } from "./UpdateUser";
import { UploadVideo } from "./UploadVideo";
import { Notification } from "./Notifications";
import Logout from "./Logout";
import { GetMyProfile, GetUserProfile } from "./UserProfile";
import { CreateContact } from "./CreateContact";
import "./../style/Profile.css";

function Profile() {
  let { path, url } = useRouteMatch();

  return (
    <div className="profile-buttons">
      <div className="buttons-wrapper">
        <Link to={`${url}/update-user-profile`}></Link>
        <Link to={`${url}/upload-video`}></Link>
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
        <Route exact path={`${path}/user-profile`}>
          <GetMyProfile />
        </Route>
        <Route exact path={`${path}/user/:id`}>
          <GetUserProfile />
        </Route>
        <Route exact path={`${path}/notifications`}>
          <Notification />
        </Route>
      </Switch>
    </div>
  );
}

export default Profile;
