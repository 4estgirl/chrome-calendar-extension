document.addEventListener("DOMContentLoaded", function() {
  const body = document.querySelector('body');
  // API key
  const key = 'AIzaSyBvRvASeCNdlm30o312qoBd8zgKJ_adJ90';
  // calendar id
  const calId = 'c_p2jjf1pb6oet1nd7mfe07bvt8s@group.calendar.google.com';

  // create constructor to get next event
  class NextEvent {
    constructor(event) {
        // event start time
        this.start = event.start.dateTime;
        // event end time
        this.end = Date.parse(event.end.dateTime);
        // add the next event name to the h1
        this.name = event.summary;
        // add the next event information to the p
        this.description = event.description;
        // event location / link
        this.location = event.location;

        // set the html h1 and p
        document.getElementById('next-event-name').innerText = `Your Next Event is: ${this.name}`;
        document.getElementById('next-event-start').innerText = `Your Next Event is at: ${this.start}`;
        document.getElementById('event-content').innerText = `Event Information: ${this.description}, ${this.location}`;
    }
  }


  // make a fetch request to get user Google calendar data
  function getGoogleCalData() {
    fetch (encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calId + '/events?key=' + key))
    .then((data) => data.json())
    .then((data) => {
        console.log(data);
        // populate the next event
        // const newNextEvent = new NextEvent(data.items[1]);

        // get current time and save in variable
        let currentTime = Date.now();
        // create a variable to hold the next event obj
        let nextEvent = data.items[0];
        // iterate through data.items
        for (let i = 1; i < data.items.length; i++){
            // if start time of current item is greater than current time
            // NEED TO CONVERT dateTime
            console.log('I made it in the loop')
            console.log('currentTime', currentTime);
            console.log('currentEventTime', Date.parse(data.items[i].start.dateTime));
            if (currentTime < Date.parse(data.items[i].start.dateTime)){
                console.log('I made it in the first conditional')
                // check if the difference between current time and time of current item is less than the difference of next event time and current time
                console.log('first', Math.abs(currentTime - Date.parse(data.items[i].start.dateTime)));
                console.log('second', Math.abs(currentTime - Date.parse(nextEvent.start.dateTime)));
                if (Math.abs(currentTime - Date.parse(data.items[i].start.dateTime)) < Math.abs(currentTime - Date.parse(nextEvent.start.dateTime))) {
                    console.log('I made it in the 2nd conditional')
                    // reassign next event to be this event
                    nextEvent = data.items[i];
                }
            }
        }
        // create a new NextEvent obj passing in next event
        const newNextEvent = new NextEvent(nextEvent); 
    })
    .catch((data) => {
      console.log("Error!");
    })
      
  }
  getGoogleCalData();

  // when the next event happens
    // popup alert, open links
    // invoke getGoogleCalData to get the next event
});

// general steps
    // get the current event if there is one
        // open any links associated with the event
    // get next event
        //
/*
        var mykey = 'your_api_key'; // typically like Gtg-rtZdsreUr_fLfhgPfgff
        var calendarid = 'you_calendar_id'; // will look somewhat like 3ruy234vodf6hf4sdf5sd84f@group.calendar.google.com
        
        $.ajax({
            type: 'GET',
            url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid+ '/events?key=' + mykey),
            dataType: 'json',
            success: function (response) {
                //do whatever you want with each
            },
            error: function (response) {
                //tell that an error has occurred
            }
        });
        */

// per Google - Use this key in your application by passing it with the key=API_KEY parameter.
// API KEY: AIzaSyBvRvASeCNdlm30o312qoBd8zgKJ_adJ90