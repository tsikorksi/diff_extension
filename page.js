
document.addEventListener('DOMContentLoaded', function() {
    let sharedData;
    try {
        sharedData = new URLSearchParams(location.search).get('data');
    } catch (e) {}
    // Account for data transmission
    sharedData = sharedData.replaceAll(" ", "+")
    document.getElementById('image').src = sharedData;

});
