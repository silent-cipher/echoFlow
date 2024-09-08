const extractTweets = (prompt: string) => {
  const tweetRegex = /\[\[(.*?)\]\]/g;
  const tweets = [];
  let match;
  let index = 0;
  while ((match = tweetRegex.exec(prompt)) !== null) {
    const tweetText = match[1].trim();
    tweets.push(tweetText);
    index++;
  }

  return tweets;
};

const prompt_for_new_tweet = (new_tweet_query: string) => {
  const prompt = `Based on the following text provided by the user:
        
       [[[${new_tweet_query}]]]
        
        Generate a creative tweet that includes the following:
        - A catchy heading (short and impactful)
        - A brief description that summarizes the key points of the text
        - Relevant hashtags (no more than 5)
        - Tags for any relevant users or entities (e.g., brands, influencers)
        
        Ensure the tweet is engaging, well-structured, and suitable for a wide audience.
        
        response must be in json formate:
        {{
            "tweet_heading": "The generated tweet heading",
            "tweet_description": "The generated tweet description",
            "hashtags": ["hashtag1", "hashtag2"],
            "tags": ["tag1", "tag2"]
        }}
        `;
  return prompt;
};

export const extractUserTweetQuery = (prompt: string) => {
  const tweetRegex = /\[\[\[(.*?)\]\]\]/g;
  const match: any = tweetRegex.exec(prompt);
  return match[1].trim();
};

const string_to_json_for_new_tweet = (string: string) => {
  try {
    const cleaned_response = string.trim().slice(7, -3).trim();
    const response = JSON.parse(cleaned_response);
    return {
      tweet_heading: response.tweet_heading,
      tweet_description: response.tweet_description,
      hashtags: response.hashtags,
      tags: response.tags,
    };
  } catch (error) {
    try {
      const response = JSON.parse(string);
      return {
        tweet_heading: response.tweet_heading,
        tweet_description: response.tweet_description,
        hashtags: response.hashtags,
        tags: response.tags,
      };
    } catch (error) {
      return {
        tweet_heading: "Error",
        tweet_description: "An error occurred while generating the tweet.",
        hashtags: ["Error"],
        tags: ["Error"],
      };
    }
  }
};

const prompt_for_sentiment_analysis = (tweet: string) => {
  const prompt = `Analyze the sentiment of the following tweet:
    
    Tweet: "${tweet}"
    
    Provide the following information:
    - Overall sentiment: (positive, negative, neutral)
    - Keywords or topics identified in the tweet
    - A brief explanation of why the sentiment was classified that way
    
    response must be in json formate:
    {{
        "sentiment": "positive",
        "keywords": ["keyword1", "keyword2"],
        "explanation": "The tweet contains positive sentiment because..."
    }}`;
  return prompt;
};

const string_to_json_for_sentiment_analysis = (string: string) => {
  try {
    const cleaned_response = string.trim().slice(7, -3).trim();
    console.log(cleaned_response);
    const response = JSON.parse(cleaned_response);
    return {
      sentiment: response.sentiment,
      keywords: response.keywords,
      explanation: response.explanation,
    };
  } catch (error) {
    try {
      const response = JSON.parse(string);
      return {
        sentiment: response.sentiment,
        keywords: response.keywords,
        explanation: response.explanation,
      };
    } catch (error) {
      return {
        sentiment: "Error",
        keywords: ["Error"],
        explanation: "An error occurred while analyzing the sentiment.",
      };
    }
  }
};

const prompt_for_detection_of_fake_tweets = (tweet: string) => {
  const prompt = `Detect fake tweets in the following text:
        
        Tweet: "${tweet}"
        
        Identify whether the tweet is real or fake based on the content and context provided. Provide a brief explanation of why the tweet is classified as real or fake.
        
        response must be in json formate:
        {{
            "classification": "real",
            "explanation": "The tweet is classified as real because..."
        }}`;
  return prompt;
};

const string_to_json_for_detection_of_fake_tweets = (string: string) => {
  try {
    const cleaned_response = string.trim().slice(7, -3).trim();
    const response = JSON.parse(cleaned_response);
    return {
      classification: response.classification,
      explanation: response.explanation,
    };
  } catch (error) {
    const response = JSON.parse(string);
    return {
      classification: response.classification,
      explanation: response.explanation,
    };
  }
};

export {
  extractTweets,
  prompt_for_new_tweet,
  prompt_for_sentiment_analysis,
  string_to_json_for_new_tweet,
  string_to_json_for_sentiment_analysis,
  prompt_for_detection_of_fake_tweets,
  string_to_json_for_detection_of_fake_tweets,
};
