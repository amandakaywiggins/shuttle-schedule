// Initialize Firebase
var config = {
    apiKey: "AIzaSyAb6Z515Zb64L7dBIXr74TZSyJ6DhsYhJ4",
    authDomain: "shuttleservice-f4854.firebaseapp.com",
    databaseURL: "https://shuttleservice-f4854.firebaseio.com",
    projectId: "shuttleservice-f4854",
    storageBucket: "shuttleservice-f4854.appspot.com",
    messagingSenderId: "622878148823"
};

firebase.initializeApp(config);
//define variables for firebase
var database = firebase.database();

var shuttleName = "";
var destination = "";
var firstShuttle = "";
var timeFormat = "HH:mm";
var frequency = 0;
var sMinutesToShuttle = 0;
var nextShuttle = "";

//click event for submitting new shuttle
$("#submit").on("click", function(event){
    event.preventDefault();
    
    shuttleName = $("#shuttle-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstShuttle = $("#first-shuttle-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    var firstTimeConverted = moment(firstShuttle, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
            
    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));
            
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in Time: " + diffTime);
            
    var sRemainder = diffTime % frequency;
    console.log(sRemainder);
            
    var sMinutesToShuttle = frequency - sRemainder;
    console.log("Minutes Until Shuttle: " + sMinutesToShuttle);
            
    var nextShuttle = moment().add(sMinutesToShuttle, "minutes");
    console.log("Arrival Time: " + moment(nextShuttle).format("hh:mm"));

    nextShuttle = moment(nextShuttle).format("hh:mm").toString();

    database.ref().push({
        shuttleName: shuttleName,
        destination: destination,
        firstShuttle: firstShuttle,
        frequency: frequency,
        sMinutestoShuttle: sMinutesToShuttle,
        nextArrival: nextShuttle
    });
});

//pull from firebase and append to timetable
database.ref().on("child_added" , function(childSnapshot) {
    console.log(childSnapshot.val());

    shuttleNameDisplay = childSnapshot.val().shuttleName;
    destinationDisplay = childSnapshot.val().destination;
    frequencyDisplay = childSnapshot.val().frequency;
    firstShuttleDisplay = childSnapshot.val().firstShuttle;
    nextShuttleDisplay = childSnapshot.val().nextArrival;
    sMinutesToShuttleDisplay = childSnapshot.val().sMinutestoShuttle;

    var shuttleRow = $("<tr class='shuttles'>");
        shuttleRow.append($("<td>" + shuttleNameDisplay + "</td><td>" + destinationDisplay 
        + "</td><td> Every:<br>" + frequencyDisplay + " min</td><td>"
        + nextShuttleDisplay + "</td><td> Next Shuttle:<br>" + sMinutesToShuttleDisplay + " min</td>"))
        $("tbody").append(shuttleRow);
    }) , function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
};

//permanent shuttles
var shuttlesArray = [{
        shuttleName: "Lunar Express",
        destination: "Luna",
        firstShuttle: "06:00",
        frequency: "10",
    }, {
        shuttleName: "Io Cruiser",
        destination: "Jupiter",
        firstShuttle: "09:00",
        frequency: "60",
    }, {
        shuttleName: "The Mars",
        destination: "Mars",
        firstShuttle: "07:15",
        frequency: "20",
    }, {
        shuttleName: "Nebula",
        destination: "Uranus",
        firstShuttle: "8:45",
        frequency: "45",
    }, {
        shuttleName: "Asteroid Cruiser",
        destination: "Asteroid Belt Station I",
        firstShuttle: "05:30",
        frequency: "30",
    }
];


//display shuttles to timetable
function displayShuttlesArray() {
    for(i=0; i < shuttlesArray.length; i++) {
        var shuttleRow = $("<tr class='shuttles'>");
        var shuttleNameDisplay = shuttlesArray[i].shuttleName;
        var destinationDisplay = shuttlesArray[i].destination;
        var frequencyDisplay = shuttlesArray[i].frequency;
        var firstShuttleDisplay = shuttlesArray[i].firstShuttle;
        var firstTimeConverted = moment(firstShuttleDisplay, "HH").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var sRemainder = diffTime % frequencyDisplay;
        var sMinutesToShuttle = frequencyDisplay - sRemainder;
        var nextShuttle = moment().add(sMinutesToShuttle, "minutes");

        shuttleRow.append($("<td>" + shuttleNameDisplay + "</td><td>" + destinationDisplay 
        + "</td><td>Every:<br>" + frequencyDisplay + " min</td><td>"
        + nextShuttle.format("hh:mm") + "</td><td> Next Shuttle:<br>" + sMinutesToShuttle + " min</td>"));
        
        $("tbody").append(shuttleRow);
    };
};

displayShuttlesArray();
