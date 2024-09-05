chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("https://twitter.com")) {
    console.log("tab updated");
  }
});
