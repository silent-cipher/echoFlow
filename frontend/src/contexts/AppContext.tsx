"use client";
import React, { useState, useEffect } from "react";
import { useNotification } from "@/hooks/useNotification";

type AppContextType = {};

const AppContext = React.createContext<AppContextType>({});

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<Props> = props => {
  const { NotificationHandler } = useNotification();

  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
};

export default AppContext;
