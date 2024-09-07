"use client";
import { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { TbCopyCheckFilled } from "react-icons/tb";
import { useNotification } from "@/hooks/useNotification";

interface each_tweet {
  tweet_heading: string;
  tweet_description: string;
  hashtags: string[];
  tags: string[];
}

export function CopyToClipBoard({ data }: any) {
  const { NotificationHandler } = useNotification();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (obj_data: any) => {
    let text = "";
    if (obj_data.tweet_heading) {
      text += obj_data.tweet_heading + "\n\n";
    }
    if (obj_data.tweet_description) {
      text += obj_data.tweet_description + "\n\n";
    }
    if (obj_data.hashtags) {
      text +=
        obj_data.hashtags.map((tag: string) => `#${tag}`).join(" ") + "\n\n";
    }
    if (obj_data.tags) {
      text += obj_data.tags.map((tag: string) => `${tag}`).join(" ") + "\n\n";
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error: any) {
      NotificationHandler("Galadriel Tweet Agent", error.toString(), "Error");
    }
  };

  return (
    <button
      onClick={() => copyToClipboard(data)}
      className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
    >
      {copied ? <TbCopyCheckFilled color="#32BB71" /> : <MdContentCopy />}
      <span style={{ color: copied ? "#32BB71" : "" }}>
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
