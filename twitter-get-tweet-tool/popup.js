import { getActiveTabURL } from "./utils.js";

const container = document.getElementsByClassName("container")[0];

const addTweetContainer = (tweets) => {
  const previousTweetContainer =
    document.getElementsByClassName("tweet-container")[0];
  if (previousTweetContainer) {
    previousTweetContainer.remove();
  }

  const tweetContainer = document.createElement("div");
  tweetContainer.className = "tweet-container";
  tweets.forEach((tweet) => {
    const tweetDiv = document.createElement("div");
    tweetDiv.innerHTML = tweet;
    tweetDiv.className = "each-tweet";
    tweetContainer.appendChild(tweetDiv);
  });
  container.appendChild(tweetContainer);
};

const addTweetsButton = () => {
  const buttons = document.createElement("div");
  buttons.className = "button-container";

  const clearButton = document.createElement("button");
  clearButton.innerHTML = "Clear";
  clearButton.className = "clear-button";
  clearButton.addEventListener("click", async () => {
    const activeTab = await getActiveTabURL();
    chrome.tabs.sendMessage(
      activeTab.id,
      {
        type: "DELETE",
        value: "clear button clicked",
      },
      (response) => {
        addTweetContainer(response);
      }
    );
  });
  buttons.appendChild(clearButton);

  const saveButton = document.createElement("button");
  const tweetId = document.createElement("div");
  tweetId.className = "tweet-id";
  saveButton.innerHTML = "Save";
  saveButton.className = "save-button";
  saveButton.addEventListener("click", async () => {
    const tweets = Array.from(
      document.getElementsByClassName("each-tweet")
    ).map((tweet) => tweet.innerText);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/twitter_agent/tweets/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tweets),
        }
      );
      const responsedata = await response.json();
      console.log(responsedata);
      if (responsedata.status === "Failed" || responsedata.status === 404) {
        const notif = document.createElement("div");
        notif.className = "notif";
        notif.innerHTML = "Failed to Save";
        container.appendChild(notif);
        setTimeout(() => {
          notif.remove();
        }, 1500);
      } else {
        const notif = document.createElement("div");
        notif.className = "notif";
        notif.innerHTML = "Saved in Dashboard";
        container.appendChild(notif);
        setTimeout(() => {
          notif.remove();
        }, 1500);

        tweetId.className = "tweet-id";
        tweetId.innerHTML = responsedata.response;
        const copyButton = document.createElement("button");
        copyButton.innerHTML = "Copy";
        copyButton.className = "copy-button";
        copyButton.addEventListener("click", () => {
          navigator.clipboard.writeText(responsedata.response);
          copyButton.innerHTML = "Copied!";
        });
        tweetId.appendChild(copyButton);
        container.appendChild(tweetId);
      }
    } catch (e) {
      const notif = document.createElement("div");
      notif.className = "notif";
      notif.innerHTML = "Failed to Save";
      container.appendChild(notif);
      setTimeout(() => {
        notif.remove();
      }, 1500);
    }
  });
  buttons.appendChild(saveButton);

  const extractButton = document.createElement("button");
  extractButton.innerHTML = "Extract";
  extractButton.className = "extract-button";
  extractButton.addEventListener("click", async () => {
    const activeTab = await getActiveTabURL();
    chrome.tabs.sendMessage(
      activeTab.id,
      {
        type: "POST",
        value: "extract button clicked",
      },
      (response) => {
        addTweetContainer(response);
      }
    );
  });
  buttons.appendChild(extractButton);
  container.appendChild(buttons);
};

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  if (activeTab.url.includes("twitter.com")) {
    chrome.tabs.sendMessage(
      activeTab.id,
      {
        type: "GET",
        value: "popup opened",
      },
      (response) => {
        addTweetContainer(response || []);
      }
    );
    addTweetsButton();
  } else {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML =
      '<div class="title">This is not a twitter page.</div>';
  }
});
