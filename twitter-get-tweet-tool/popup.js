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
  const button = document.createElement("button");
  button.className = "extract-tweets";
  button.innerHTML = "Extract tweets";
  button.addEventListener("click", async () => {
    const activeTab = await getActiveTabURL();
    chrome.tabs.sendMessage(
      activeTab.id,
      {
        type: "POST",
        value: "button clicked",
      },
      (response) => {
        addTweetContainer(response);
      }
    );
  });
  container.appendChild(button);
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

// const BUTTON_IMG_SRC = chrome.runtime.getURL("assets/icon.png");
