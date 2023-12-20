import hosts from "../hosts/goodbyeads.js";

let blockedHosts = [...hosts]

browser.runtime.onInstalled.addListener((_details) => {
  browser.storage.local.set({ blockedHosts });
});

browser.storage.local.get((data) => {
  if (data.blockedHosts) {
    blockedHosts = data.blockedHosts;
  }
});

browser.storage.onChanged.addListener((changeData) => {
  blockedHosts = changeData.blockedHosts.newValue;
});

const handleWebRequest = (details) => {
  console.log(`advark blocked an ad: ${details}`);
  return { cancel: true };
};

try {
  browser.webRequest.onBeforeRequest.addListener(
    handleWebRequest,
    {
      urls: [...blockedHosts],
    },
    ["blocking"]
  );
} catch (error) {
  console.error(`advark failed to initialize: ${error.message}`);
}
