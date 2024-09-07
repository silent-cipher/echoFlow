(() => {
  console.log("contentScript for twitter-get-tweet-tool");
  let currentName = "current_tweets";
  let current_tweets = [];

  const fetchTweetss = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get([currentName], (obj) => {
        resolve(obj[currentName] ? JSON.parse(obj[currentName]) : []);
      });
    });
  };

  const getPreviousTweets = async () => {
    current_tweets = (await fetchTweetss()) || [];
    return current_tweets;
  };
  getPreviousTweets();

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value } = obj;
    console.log(type, value);
    if (type === "POST") {
      const CLASS_NAME = "css-175oi2r r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu";
      const length = document.getElementsByClassName(CLASS_NAME).length;

      let set_of_tweets = new Set(current_tweets);
      for (let i = 0; i < length; i++) {
        let tweet = document.getElementsByClassName(CLASS_NAME)[i].innerText;
        tweet = tweet.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
        if (tweet.split(" ").length > 5) {
          set_of_tweets.add(tweet);
        }
      }
      console.log(set_of_tweets);

      let tweets = Array.from(set_of_tweets);
      chrome.storage.sync.set({
        [currentName]: JSON.stringify(tweets),
      });

      current_tweets = tweets;
      response(tweets);
    } else if (type === "GET") {
      response(current_tweets);
    } else if (type === "DELETE") {
      chrome.storage.sync.set({
        [currentName]: JSON.stringify([]),
      });
      current_tweets = [];
      response([]);
    }
  });
})();
