"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertIpfsId } from "./AlertIpfsId";
import { useContext, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AppContext from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading/Loading";
import usePostResponse from "@/hooks/usePostResponse";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface different_loadings {
  newTweetLoading: boolean;
  sentimentLoading: {
    tweet_id: string;
    loading: boolean;
  };
  fakeTweetLoading: boolean;
}

export function AgentsTabs({ agent_id }: { agent_id: string }) {
  const {
    newTweetInput,
    setNewTweetInput,

    chat_new_tweets,
    setChatNewTweetsHandler,

    tweet_sentiments,
    setTweetSentimentsHandler,
    updateTweetSentimentsHandler,

    fakeTweetIPFSID,
    fakeTweetInput,
    setFakeTweetInputHandler,
    fakeTweetChat,
    fakeTweetChatHandler,

    different_loadings,
    setDifferentLoadingsHandler,
  } = useContext(AppContext);
  const { postResponse } = usePostResponse();

  useEffect(() => {
    const fetchTweets = async () => {
      if (!agent_id) return;
      const response = await postResponse(
        {
          agent_id,
        },
        "get_all_tweets_by_agent_id"
      );
      setTweetSentimentsHandler(response);
    };
    fetchTweets();
  }, []);

  const handlerGenerateNewTweets = async () => {
    if (newTweetInput === "") return;
    setDifferentLoadingsHandler({
      ...different_loadings,
      newTweetLoading: true,
    });
    setChatNewTweetsHandler({
      question: newTweetInput,
      id: Math.random().toString(36).substr(2, 9),
      is_ai_generated: false,
    });
    setNewTweetInput("");
    const response = await postResponse(
      {
        agent_id: agent_id,
        new_tweet_query: newTweetInput,
      },
      "gen_tweet"
    );
    console.log(response);
    const new_tweet = {
      ...response,
      is_ai_generated: true,
      id: Math.random().toString(36).substr(2, 9),
    };
    setChatNewTweetsHandler(new_tweet);
    setDifferentLoadingsHandler({
      ...different_loadings,
      newTweetLoading: false,
    });
  };

  const handlegetSentiments = async (
    tweet_sentence: string,
    tweet_id: string
  ) => {
    setDifferentLoadingsHandler({
      ...different_loadings,
      sentimentLoading: {
        tweet_id: tweet_id,
        loading: true,
      },
    });
    const response = await postResponse(
      {
        tweet: tweet_sentence,
      },
      "tweet_sentiment"
    );
    const new_sentiment = {
      ...response,
      tweet_id,
      tweet_sentence,
    };
    updateTweetSentimentsHandler(new_sentiment);
    setDifferentLoadingsHandler({
      ...different_loadings,
      sentimentLoading: {
        tweet_id: "",
        loading: false,
      },
    });
  };

  const handleFakeTweetDetection = async () => {
    fakeTweetChatHandler(fakeTweetInput);
    setDifferentLoadingsHandler({
      ...different_loadings,
      fakeTweetLoading: true,
    });
    setFakeTweetInputHandler("");
    const response = await postResponse(
      {
        tweet: fakeTweetInput,
        ipfs_id: fakeTweetIPFSID,
      },
      "fake_tweet_detection"
    );
    fakeTweetChatHandler("Fake Tweet Detection: " + response);
    setDifferentLoadingsHandler({
      ...different_loadings,
      fakeTweetLoading: false,
    });
  };

  return (
    <Tabs defaultValue="create-tweets" className="w-lvw pt-12 min-h-screen">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="create-tweets">Create Tweets</TabsTrigger>
        <TabsTrigger value="tweets-sentiments">Tweets sentiments</TabsTrigger>
        <TabsTrigger value="fake-tweet-detection">
          Fake Tweets Detection
        </TabsTrigger>
      </TabsList>
      <TabsContent value="create-tweets">
        <Card
          className="flex flex-col"
          style={{
            height: "calc(100lvh - 2rem - 3rem - 3rem)",
          }}
        >
          <CardHeader>
            <CardTitle>Create Tweets for the agent</CardTitle>
            <CardDescription>
              Create tweets for the agent. You can create multiple tweets at
              once
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 h-full overflow-y-scroll scrollbar-hide">
            {chat_new_tweets.map((tweet: Tweet) => (
              <Card key={tweet.id} className="p-4 space-y-4">
                <div className="flex flex-col justify-start items-start space-x-4">
                  <p className="text-sm text-gray-500">
                    {tweet.is_ai_generated ? "AI Generated" : "User Generated"}
                  </p>
                  <h2 className="text-lg font-semibold">
                    {"tweet_heading" in tweet ? tweet.tweet_heading : ""}
                  </h2>
                </div>
                <CardContent className="space-y-2">
                  <div className="w-full p-2 border border-gray-300 rounded">
                    <p className="text-gray-500">
                      {"tweet_description" in tweet
                        ? tweet.tweet_description
                        : tweet.question}
                    </p>
                  </div>
                  {"hashtags" in tweet && tweet.hashtags.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold">Hashtags:</h3>
                      <ul className="list-disc list-inside">
                        {tweet.hashtags.map((hashtag, index) => (
                          <Badge variant="outline" key={index} className="ml-3">
                            {hashtag}
                          </Badge>
                        ))}
                      </ul>
                    </div>
                  )}
                  {"tags" in tweet && tweet.tags.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold">Tags:</h3>
                      <ul className="list-disc list-inside">
                        {tweet.tags.map((tag, index) => (
                          <Badge
                            variant="secondary"
                            key={index}
                            className="ml-3"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
          <CardFooter className="relative">
            <Input
              placeholder="Generate tweets for the agent...."
              value={newTweetInput}
              onChange={(e) => setNewTweetInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlerGenerateNewTweets();
                }
              }}
            />
            <div className="absolute right-12 top-2.5">
              {different_loadings.newTweetLoading && (
                <Loading
                  height="12px"
                  size="10px"
                  width="40px"
                  alignItems="center"
                />
              )}
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tweets-sentiments">
        <Card
          className="flex flex-col"
          style={{
            height: "calc(100lvh - 2rem - 3rem - 3rem)",
          }}
        >
          <CardHeader>
            <CardTitle>Tweets Sentiments Analysis by AI</CardTitle>
            <CardDescription>
              Analyze the sentiments of the tweets created by the agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 h-full overflow-y-scroll scrollbar-hide">
            {tweet_sentiments.map((sentiment: each_sentiment) => (
              <Card key={sentiment.tweet_id} className="p-4 space-y-4">
                <div className="flex flex-col justify-start items-start space-x-4">
                  <h2 className="text-base font-normal">
                    {sentiment.tweet_sentence}
                  </h2>
                </div>
                {sentiment.sentiment !== "" ? (
                  <CardContent>
                    <div className="w-full pt-2 pb-2 borde">
                      <p className="text-gray-500">
                        Sentiment: {sentiment.sentiment}
                      </p>
                    </div>
                    <div className="w-full p-2 border border-gray-300 rounded">
                      <p className="text-gray-500">{sentiment.explanation}</p>
                    </div>
                    {sentiment.keywords.length > 0 && (
                      <div className="pt-2 pb-2">
                        <h3 className="text-sm font-semibold">Keywords:</h3>
                        <ul className="list-disc list-inside">
                          {sentiment.keywords.map((keyword, index) => (
                            <Badge
                              variant="outline"
                              key={index}
                              className="ml-2"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                ) : (
                  <div className="flex justify-end">
                    <Button
                      onClick={() =>
                        handlegetSentiments(
                          sentiment.tweet_sentence,
                          sentiment.tweet_id
                        )
                      }
                      variant={
                        different_loadings.sentimentLoading.tweet_id ==
                          sentiment.tweet_id &&
                        different_loadings.sentimentLoading.loading
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {different_loadings.sentimentLoading.tweet_id ==
                        sentiment.tweet_id &&
                      different_loadings.sentimentLoading.loading ? (
                        <Loading
                          height="12px"
                          size="10px"
                          width="40px"
                          alignItems="center"
                        />
                      ) : (
                        "Get Sentiments"
                      )}
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="fake-tweet-detection">
        <Card
          className="flex flex-col"
          style={{
            height: "calc(100lvh - 2rem - 3rem - 3rem)",
          }}
        >
          <CardHeader>
            <CardTitle>Fake Tweets Detection</CardTitle>
            <CardDescription>
              Detect fake tweets created by the agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 h-full overflow-y-scroll scrollbar-hide">
            <AlertIpfsId />
            {fakeTweetChat.map((chat, index) => (
              <Card key={index} className="p-4 space-y-4">
                <p className="text-gray-500">{chat}</p>
              </Card>
            ))}
          </CardContent>
          <CardFooter className="relative">
            <Input
              placeholder="Generate tweets for the agent...."
              value={fakeTweetInput}
              onChange={(e) => setFakeTweetInputHandler(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleFakeTweetDetection();
                }
              }}
              disabled={fakeTweetIPFSID === ""}
            />
            <div className="absolute right-12 top-2.5">
              {different_loadings.fakeTweetLoading && (
                <Loading
                  height="12px"
                  size="10px"
                  width="40px"
                  alignItems="center"
                />
              )}
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
