async function fetchSubscribedChannels() {
  try {
    const res = await fetch('https://api.chzzk.naver.com/commercial/v1/subscribe/channels', {
      credentials: 'include'
    });
    if (!res.ok) return;
    const { content } = await res.json();
    const names = (content || []).map(ch => ch.channelName);
    chrome.storage.local.set({ subscribedChannels: names });
  } catch (e) {}
}

chrome.runtime.onInstalled.addListener(fetchSubscribedChannels);
chrome.runtime.onStartup.addListener(fetchSubscribedChannels);

chrome.runtime.onMessage.addListener((msg) => {
  if (msg === 'fetchSubscriptions') fetchSubscribedChannels();
});
