"use client";
import React, { useContext } from "react";
import classes from "@/components/notification/notifications.module.css";
import Notification from "@/components/notification/Notification";
import NotificationContext from "@/contexts/NotificationContext";

const Notifications = () => {
  const notificationsCtx = useContext(NotificationContext);
  return (
    <div className={`${classes.container}`}>
      {notificationsCtx.typeMessage.map(message => (
        <Notification {...message} key={message.id} />
      ))}
    </div>
  );
};

export default Notifications;
