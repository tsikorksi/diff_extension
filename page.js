
document.addEventListener('DOMContentLoaded', function() {
    let sharedData;
    try {
        sharedData = new URLSearchParams(location.search).get('data');
    } catch (e) {}
    sharedData = sharedData.replaceAll(" ", "+")
    document.getElementById('image').src = sharedData;

});
