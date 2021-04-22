import React from "react";
import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";

const Sidebar = () => {
  const {
    user: { fullname, username, userId },
  } = useUser();
  console.log(username);
  return (
    <div className="p-4">
      <User username={username} fullName={fullname} />
      <Suggestions userId={userId} />
    </div>
  );
};

export default Sidebar;
