let subscribedNames = new Set();

function applyGradient() {
  document.querySelectorAll('.name_text__yQG50').forEach(el => {
    const isSubscribed = subscribedNames.has(el.textContent.trim());
    el.classList.toggle('chzzk-gradient-name', isSubscribed);
  });
}

chrome.storage.local.get('subscribedChannels', ({ subscribedChannels }) => {
  if (subscribedChannels) {
    subscribedNames = new Set(subscribedChannels);
    applyGradient();
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.subscribedChannels) {
    subscribedNames = new Set(changes.subscribedChannels.newValue || []);
    applyGradient();
  }
});

chrome.runtime.sendMessage('fetchSubscriptions');

const observer = new MutationObserver(applyGradient);
observer.observe(document.body, { childList: true, subtree: true });
