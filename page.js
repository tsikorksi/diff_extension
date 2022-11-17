let sharedData;
try {
    sharedData = new URLSearchParams(location.search).get('data');
} catch (e) {}
var img = document.createElement('img');
img.src = sharedData;
document.getElementById('body').appendChild(img);
console.log(sharedData)