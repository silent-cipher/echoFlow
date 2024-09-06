"use client";
import React, { useState, useEffect } from "react";
import { useNotification } from "@/hooks/useNotification";

interface each_tweet {
  tweet_heading: string;
  tweet_description: string;
  hashtags: string[];
  tags: string[];
  id: string;
  is_ai_generated: boolean;
}

interface each_tweet_user_input {
  question: string;
  id: string;
  is_ai_generated: boolean;
}

type Tweet = each_tweet | each_tweet_user_input;

interface each_sentiment {
  sentiment: string;
  keywords: string[];
  explanation: string;
  tweet_id: string;
  tweet_sentence: string;
}

type AppContextType = {
  newTweetInput: string;
  setNewTweetInput: (new_tweet_input: string) => void;

  chat_new_tweets: Tweet[];
  setChatNewTweetsHandler: (new_tweets: Tweet) => void;

  tweet_sentiments: each_sentiment[];
  setTweetSentimentsHandler: (new_sentiments: string[]) => void;
  updateTweetSentimentsHandler: (new_sentiment: each_sentiment) => void;
};

const AppContext = React.createContext<AppContextType>({
  newTweetInput: "",
  setNewTweetInput: () => {},

  chat_new_tweets: [],
  setChatNewTweetsHandler: () => {},

  tweet_sentiments: [],
  setTweetSentimentsHandler: () => {},
  updateTweetSentimentsHandler: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<Props> = (props) => {
  const { NotificationHandler } = useNotification();

  const [newTweetInput, setNewTweetInput] = useState<string>("");
  const [chat_new_tweets, setChatNewTweets] = useState<Tweet[]>([]);
  const setChatNewTweetsHandler = (new_tweet: Tweet) => {
    setChatNewTweets((prevTweets) => [...prevTweets, new_tweet]);
  };

  const [tweet_sentiments, setTweetSentiments] = useState<each_sentiment[]>([]);
  const setTweetSentimentsHandler = (new_sentiments: string[]) => {
    const updated_sentiments = new_sentiments.map((sentiment) => ({
      sentiment: "",
      keywords: [],
      explanation: "",
      tweet_id: Math.random().toString(36).substr(2, 9),
      tweet_sentence: sentiment,
    }));
    setTweetSentiments(updated_sentiments);
  };
  const updateTweetSentimentsHandler = (new_sentiment: each_sentiment) => {
    const tweet_id = new_sentiment.tweet_id;
    const updated_sentiments = tweet_sentiments.map((sentiment) =>
      sentiment.tweet_id === tweet_id ? new_sentiment : sentiment
    );
    setTweetSentiments(updated_sentiments);
  };

  return (
    <AppContext.Provider
      value={{
        newTweetInput,
        setNewTweetInput,

        chat_new_tweets,
        setChatNewTweetsHandler: setChatNewTweetsHandler,

        tweet_sentiments,
        setTweetSentimentsHandler,
        updateTweetSentimentsHandler,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
