chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed or updated", details.reason);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background received a message:", message, "from:", sender);

  if (message.type === "PING") {
    sendResponse({ type: "PONG", payload: "Hello from background!" });
  }
});
