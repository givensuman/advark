import browser from "webextension-polyfill";

browser.webRequest.onBeforeRequest.addListener(
  (_details) => {
    return { cancel: true };
  },
  { urls: "*://*.google.com/*" },
  ["blocking"]
);
