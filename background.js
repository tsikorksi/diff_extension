// Globals to avoid excessive async
let urls = new Map();
let urlID = ''

chrome.runtime.onInstalled.addListener(async () => {
    let url = chrome.runtime.getURL("index.html");
    let tab = await chrome.tabs.create({ url });
    console.log(`Created tab ${tab.id}`);
    chrome.alarms.create({ delayInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener(timer);

chrome.tabs.onActivated.addListener (timer);

/**
 * Run the screenshot function with a short delay for promise
 */
function timer(){
    setTimeout(function () {
        insert();
    }, 500);
}

/**
 * screenshot and then log it
 */
function insert() {
    let cap = chrome.tabs.captureVisibleTab(
    )
    cap.then(onCaptured, onError);

    console.log("Screenshot: " + urlID)
}

/**
 * get current tab ID, save it to global
 */
function getTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0];
        urlID = activeTab.id; // or do whatever you need

    });
}

/**
 * when screenshot has been made, save it to map
 * @param imageUri the image data
 */
function onCaptured(imageUri) {
    getTab()
    urls.set(urlID, imageUri);
}


/**
 * if failed, ignore if invalid tab otherwise log it
 * @param error the error data
 */
function onError(error) {
    if (error.toString() !== "Error: Either the '<all_urls>' or 'activeTab' permission is required."){
        //console.log(`Error: ${error}`);
    }
    else {
        console.log(`Error: ${error}`);
    }
}