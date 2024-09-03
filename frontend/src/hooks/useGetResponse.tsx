"use client";
import { useState } from "react";
import { useNotification } from "./useNotification";

const useGetResponse = () => {
  const { NotificationHandler } = useNotification();
  const [loading, setLoading] = useState(false);

  const getResponse = async (path: string) => {
    console.log(path);
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/${path}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      setLoading(false);
      if (responsedata.message === "Failed") {
        NotificationHandler("Stake Stream", responsedata.response, "Error");
        return null;
      }
      return responsedata.response;
    } catch (err) {
      console.log(err);
      setLoading(false);
      NotificationHandler("Stake Stream", "Something went wrong", "Error");
      return null;
    }
  };
  return { getResponse, loading };
};

export default useGetResponse;
