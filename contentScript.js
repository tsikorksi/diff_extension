import resemble from "./resemble"

function screen() {
    chrome.tabs.captureVisibleTab(
    )
}


function getDiff(image1, image2) {
    const options = {
        returnEarlyThreshold: 5,
        outputDiff: true
    };
    resemble.compare(image1, image2, options, function (err, data) {
        if (err) {
            console.log("An error!");
        } else {
            console.log(data);
        }
    });
    // return data.getBuffer()
}