let currentTime = Date.now();
// let newNextEvent = document.getElementById('next');
// console.log('obj', newNextEvent)
// let nextEventTime = Date.parse(newNextEvent.start.dateTime);
let nextEventTime = Date.now();
const target = 'http://127.0.0.1:5500/'
// console.log('num', nextEventTime);
if (currentTime === nextEventTime) {
    if (location.href !== target) {
        // if user clicks OK to view event
        if(confirm('You have an event starting soon! Press OK to view') === true){
            // create a new tab that opens index.html
            // file://./index.html file:///index.html/
            // need another API?
            // chrome.tabs.create({active: true, url: 'index.html'});
            window.location.replace('http://127.0.0.1:5500/');
            // http://localhost:5500/
        };
    }
}