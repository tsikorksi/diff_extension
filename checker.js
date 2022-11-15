import './resemble';
const html2canvas = require('html2canvas');

function getDiff(image1, image2) {
    const options = {
        returnEarlyThreshold: 5,
        outputDiff: true
    };

    compare(image1, image2, options, function (err, data) {
        if (err) {
            console.log("An error!");
        } else {
            console.log(data);
        }
    });
    // return data.getBuffer()
}


function capture() {
    html2canvas(document.body).then((canvas) => {
        let a = document.createElement("a");
        a.download = "ss.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
        console.log("screenshot made");
    });
}

document.getElementById ("checkAllTopicCheckBoxes").addEventListener ("click", capture, false);