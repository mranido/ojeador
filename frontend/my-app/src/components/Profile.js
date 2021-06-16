import React from "react";

import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { UpdateUser } from "./UpdateUser";
import { UploadVideo } from "./UploadVideo";
import Logout from "./Logout";
import { Notification } from "./Notifications";
import { GetMyProfile, GetUserProfile } from "./UserProfile";
import "./../style/Profile.css";
import { NotificationsById } from "./NotificationById";

function Profile() {
  let { path, url } = useRouteMatch();

  return (
    <div>
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
        <Route path={`${path}/notifications/:contactId`}>
          <NotificationsById />
        </Route>
      </Switch>
    </div>
  );
}

export default Profile;
