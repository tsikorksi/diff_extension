// Globals to avoid excessive async
let urls = new Map();
let urlID = ''

/**
 * Create an initial tab and then a timer
 */
chrome.runtime.onInstalled.addListener(async () => {
    chrome.alarms.create({ delayInMinutes: 1 });
});

/**
 * take screenshot and then start a new timer
 */
chrome.alarms.onAlarm.addListener( ()=>{
    timer();
    chrome.alarms.create({ delayInMinutes: 1 });
});

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

}

/**
 * get current tab ID, save it to global
 */
function getTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        urlID = tabs[0].id;


    });
}

/**
 * when screenshot has been made, save it to map, or if exists compare
 * @param imageUri the image data
 */
function onCaptured(imageUri) {
    getTab()
    if (urlID > 5) {
        console.log("Screenshot: " + urlID)
        if (urls.has(urlID)) {
            chrome.scripting.executeScript({
                target: { tabId: urlID },
                files: ['contentScript.js']
            });
            console.log("Sending to: " + urlID)
            chrome.tabs.sendMessage( urlID, {"image1": urls.get(urlID), "image2":imageUri}, read_response);
        } else {
            urls.set(urlID, imageUri);
        }
    }
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

function change_color(color) {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 16, 16);
    context.fillStyle = color;  // Green
    context.fillRect(0, 0, 16, 16);
    const imageData = context.getImageData(0, 0, 16, 16);
    chrome.action.setIcon({imageData: imageData}, () => { /* ... */ });
}

function read_response(request, sender, sendResponse) {
    let diff;
    try {
        diff = request.diff;
    } catch (e) {
        diff = "None"
    }
    if (diff === "None") {
        change_color("#00FF00")
    } else {
        change_color("#FF0000")
        chrome.tabs.create({ url: chrome.runtime.getURL("compare.html?data=" + diff) });
    }
    return true;
}
