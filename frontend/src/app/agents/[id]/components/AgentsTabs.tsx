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
import { use, useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AppContext from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading/Loading";
import { CopyToClipBoard } from "./CopyToClipBoard";
import usePostResponse from "@/hooks/usePostResponse";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useReadContract,
  useWriteContract,
  useWatchContractEvent,
} from "wagmi";
import { agentManager, agent, openApiChatGpt } from "../../../../../config";
import {
  prompt_for_new_tweet,
  string_to_json_for_new_tweet,
  extractUserTweetQuery,
  extractTweets,
  prompt_for_sentiment_analysis,
  string_to_json_for_sentiment_analysis,
} from "@/hooks/utils";

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
  const [currentSentimentSearchId, setCurrentSentimentSearchId] = useState({
    tweet_id: "",
    tweet_sentence: "",
  });
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

  const {
    data: hash,
    writeContractAsync,
    error,
    isSuccess,
  } = useWriteContract();
  const { data: agentDetails } = useReadContract({
    abi: agentManager.abi,
    address: agentManager.address as `0x${string}`,
    functionName: "getAgentById",
    args: [agent_id],
  });
  const {
    data: sentimentCount,
    refetch: refetchChatCount,
    isRefetching: isRefetchingChatCount,
  } = useReadContract({
    abi: openApiChatGpt.abi,
    address: openApiChatGpt.address as `0x${string}`,
    functionName: "getChatRunsCount",
    args: [],
  });

  console.log(Number(sentimentCount));

  const {
    data: sentiment,
    isRefetching,
    refetch: refetchSentiment,
  } = useReadContract({
    abi: openApiChatGpt.abi,
    address: openApiChatGpt.address as `0x${string}`,
    functionName: "getMessageHistory",
    args: [Number(sentimentCount) - 1],
  });

  console.log(sentiment);
  // if (currentSentimentSearchId.tweet_id != "") {
  //   if (sentiment && (sentiment as any).at(-1).role === "assistant") {
  //     const assistant_response = string_to_json_for_sentiment_analysis(
  //       (sentiment as any).at(-1).content[0].value
  //     );
  //     const new_sentiment = {
  //       ...assistant_response,
  //       ...currentSentimentSearchId,
  //     };
  //     console.log(new_sentiment);
  //     updateTweetSentimentsHandler(new_sentiment);
  //     setCurrentSentimentSearchId({ tweet_id: "", tweet_sentence: "" });
  //   }
  //   // const json_res = string_to_json_for_sentiment_analysis(sentiment);
  //   // const new_sentiment = {
  //   //   ...response,
  //   //   currentSentimentSearchId,
  //   //   tweet_sentence,
  //   // };
  //   // updateTweetSentimentsHandler(new_sentiment);
  // }

  // useEffect(() => {
  //   if (isRefetchingChatCount && isRefetching) {
  //     if ((sentiment as any).at(-1).role === "assistance") {
  //       const assistant_response = string_to_json_for_sentiment_analysis(
  //         (sentiment as any).at(-1).content[0].value
  //       );
  //       const new_sentiment = {
  //         ...assistant_response,
  //         ...currentSentimentSearchId,
  //       };
  //       console.log(new_sentiment);
  //       updateTweetSentimentsHandler(new_sentiment);
  //       setCurrentSentimentSearchId({ tweet_id: "", tweet_sentence: "" });
  //     }
  //   }
  // }, [isRefetchingChatCount]);
  const {
    writeContractAsync: writeContractAsyncSentiment,
    isSuccess: isSuccessSentiment,
  } = useWriteContract();

  useEffect(() => {
    let interval: any;
    const refetchData = async () => {
      interval = setInterval(async () => {
        await refetchChatCount();
        await refetchSentiment();

        console.log(sentiment);
        if (sentiment && (sentiment as any).at(-1).role === "assistant") {
          const assistant_response = string_to_json_for_sentiment_analysis(
            (sentiment as any).at(-1).content[0].value
          );
          const new_sentiment = {
            ...assistant_response,
            ...currentSentimentSearchId,
          };
          console.log(new_sentiment);
          updateTweetSentimentsHandler(new_sentiment);
          setCurrentSentimentSearchId({ tweet_id: "", tweet_sentence: "" });
          setDifferentLoadingsHandler({
            ...different_loadings,
            sentimentLoading: {
              tweet_id: "",
              loading: false,
            },
          });
          clearInterval(interval);
        }
      }, 2000);
    };

    if (currentSentimentSearchId.tweet_id !== "") refetchData();

    return () => clearInterval(interval);
  }, [isSuccessSentiment, currentSentimentSearchId.tweet_id]);

  console.log(agentDetails);

  useWatchContractEvent({
    address: agentDetails as `0x${string}`,
    abi: agent.abi,
    eventName: "AgentRunCreated",
    onLogs(logs) {
      console.log("New logs!", logs);
    },
  });

  const {
    data: agentSystemPrompt,
    refetch: refetchTweetHistory,
    isRefetching: isRefetchingTweetHistory,
  } = useReadContract({
    abi: agent.abi,
    address: agentDetails as `0x${string}`,
    functionName: "getMessageHistory",
    args: [8],
  });

  // useEffect(() => {
  //   let interval: any;
  //   const refetchData = async () => {
  //     interval = setInterval(async () => {
  //       await refetchTweetHistory();
  //       console.log("------------------------------------------------------");
  //       if (agentSystemPrompt && (agentSystemPrompt as any).length >= 3) {
  //         const new_tweet = string_to_json_for_new_tweet(
  //           (agentSystemPrompt as any)[2].content[0].value
  //         );
  //         setChatNewTweetsHandler({
  //           ...new_tweet,
  //           is_ai_generated: true,
  //           id: Math.random().toString(36).substr(2, 9),
  //         });
  //         setDifferentLoadingsHandler({
  //           ...different_loadings,
  //           newTweetLoading: false,
  //         });
  //         clearInterval(interval);
  //       }
  //     }, 2000);
  //   };

  //   if (different_loadings.newTweetLoading) refetchData();

  //   return () => clearInterval(interval);
  // }, [different_loadings.newTweetLoading]);

  useEffect(() => {
    let interval: any;

    const refetchData = async () => {
      interval = setInterval(async () => {
        await refetchTweetHistory();
        console.log("------------------------------------------------------");

        if (agentSystemPrompt && (agentSystemPrompt as any).length >= 3) {
          console.log("Condition met, clearing interval");
          const new_tweet = string_to_json_for_new_tweet(
            (agentSystemPrompt as any)[2].content[0].value
          );
          setChatNewTweetsHandler({
            ...new_tweet,
            is_ai_generated: true,
            id: Math.random().toString(36).substr(2, 9),
          });
          setDifferentLoadingsHandler({
            ...different_loadings,
            newTweetLoading: false,
          });
          clearInterval(interval);
        } else {
          console.log("Condition not met");
        }
      }, 2000);
    };

    if (different_loadings.newTweetLoading) {
      console.log("Starting interval");
      refetchData();
    }
  }, [different_loadings.newTweetLoading]);

  console.log(agentSystemPrompt);

  // useEffect(() => {
  //   const fetchTweets = async () => {
  //     if (!agent_id) return;
  //     const response = await postResponse(
  //       {
  //         agent_id,
  //       },
  //       "get_all_tweets_by_agent_id"
  //     );
  //     setTweetSentimentsHandler(response);
  //   };
  //   fetchTweets();
  // }, []);

  useEffect(() => {
    if (!agentSystemPrompt || (agentSystemPrompt as any).length < 3) return;
    const new_tweet = string_to_json_for_new_tweet(
      (agentSystemPrompt as any)[2].content[0].value
    );
    const userQuery = extractUserTweetQuery(
      (agentSystemPrompt as any)[1].content[0].value
    );

    const allTweets = extractTweets(
      (agentSystemPrompt as any)[0].content[0].value
    );

    // console.log(allTweets);

    setTweetSentimentsHandler(allTweets);

    console.log(userQuery);
    // setChatNewTweetsHandler({
    //   question: userQuery,
    //   is_ai_generated: false,
    //   id: Math.random().toString(36).substr(2, 9),
    // });
    setChatNewTweetsHandler({
      ...new_tweet,
      is_ai_generated: true,
      id: Math.random().toString(36).substr(2, 9),
    });
  }, [agentSystemPrompt]);

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

    if (!agent_id && !agentDetails) return;

    const query = prompt_for_new_tweet(newTweetInput);

    await writeContractAsync({
      abi: agent.abi,
      address: agentDetails as `0x${string}`,
      functionName: "runAgent",
      args: [query, 2],
    });
    // const response = await postResponse(
    //   {
    //     agent_id: agent_id,
    //     new_tweet_query: newTweetInput,
    //   },
    //   "gen_tweet"
    // );
    // console.log(response);
    // const new_tweet = {
    //   ...response,
    //   is_ai_generated: true,
    //   id: Math.random().toString(36).substr(2, 9),
    // };
    // setChatNewTweetsHandler(new_tweet);
    // setDifferentLoadingsHandler({
    //   ...different_loadings,
    //   newTweetLoading: false,
    // });
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

    const query = prompt_for_sentiment_analysis(tweet_sentence);

    await writeContractAsyncSentiment(
      {
        abi: openApiChatGpt.abi,
        address: openApiChatGpt.address as `0x${string}`,
        functionName: "startChat",
        args: [query],
      },
      {
        onSuccess: () => {
          setCurrentSentimentSearchId({ tweet_id, tweet_sentence });
        },
      }
    );

    // const response = await postResponse(
    //   {
    //     tweet: tweet_sentence,
    //   },
    //   "tweet_sentiment"
    // );
    // const new_sentiment = {
    //   ...response,
    //   tweet_id,
    //   tweet_sentence,
    // };
    // updateTweetSentimentsHandler(new_sentiment);
    // setDifferentLoadingsHandler({
    //   ...different_loadings,
    //   sentimentLoading: {
    //     tweet_id: "",
    //     loading: false,
    //   },
    // });
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
                <div className="flex flex-col justify-start items-start space-x-4 relative">
                  <p className="text-sm text-gray-500">
                    {tweet.is_ai_generated ? "AI Generated" : "User Generated"}
                  </p>
                  <h2 className="text-lg font-semibold">
                    {"tweet_heading" in tweet ? tweet.tweet_heading : ""}
                  </h2>
                  <div className="absolute right-8 top-4">
                    {tweet.is_ai_generated && <CopyToClipBoard data={tweet} />}
                  </div>
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
              Detect fake tweets created by the agent by sending the tweet!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 h-full overflow-y-scroll scrollbar-hide">
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
