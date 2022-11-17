let sharedData;
try {
    sharedData = new URLSearchParams(location.search).get('data');
} catch (e) {}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('image').src = sharedData;

});
