"use client";
import { useState } from "react";
import { useNotification } from "./useNotification";

const usePostResponse = () => {
  const { NotificationHandler } = useNotification();
  const [loading, setLoading] = useState(false);

  const postResponse = async (data: any, path: string) => {
    console.log(data);
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/twitter_agent/${path}/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      if (responsedata.response === "Failed") {
        NotificationHandler("Stake Stream", responsedata.response, "Error");
        setLoading(false);
        return null;
      }
      // NotificationHandler("Stake Stream", "Generated By Echo Flow", "Success");
      setLoading(false);
      return responsedata.response;
    } catch (err) {
      setLoading(false);
      console.log(err);
      NotificationHandler("Stake Stream", "Something went wrong", "Error");
      return null;
    }
  };
  return { postResponse, loading };
};

export default usePostResponse;
