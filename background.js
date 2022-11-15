
chrome.tabs.onActivated.addListener (
    (tab)=> {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content-script.js']
        });
    }
)
