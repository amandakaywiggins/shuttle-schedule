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
    }];

    
function displayShuttlesArray() {
    for(i=0; i < shuttlesArray.length; i++) {
        var shuttleRow = $("<tr>");
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

        shuttleRow.append($("<th>" + shuttleNameDisplay + "</th><th>" + destinationDisplay 
        + "</th><th>" + "</th><th>" + frequencyDisplay + "</th><th>" + firstShuttleDisplay
         + "</th><th>" + nextShuttle.format("hh:mm") + "</th><th>" + sMinutesToShuttle + "</th>"));
        
         $("#shuttle-times").append(shuttleRow);
    };
};

var config = {
    apiKey: "AIzaSyDTsoZ3Q58YNLsZrobP1BAGpBAdJHLcTx8",
    authDomain: "flymetothemoon-ca0bf.firebaseapp.com",
    databaseURL: "https://flymetothemoon-ca0bf.firebaseio.com",
    projectId: "flymetothemoon-ca0bf",
    storageBucket: "flymetothemoon-ca0bf.appspot.com",
    messagingSenderId: "265804770262"
};

firebase.initializeApp(config);

var database = firebase.database();

var shuttleName = "";
var destination = "";
var firstShuttle = 0;
var frequency = 0;


$("#submit").on("click", function(event){
    event.preventDefault();
    
    shuttleName = $("#shuttle-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-shuttle-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({
        shuttleName: shuttleName,
        destination: destination,
        firstShuttle: firstShuttle,
        frequency: frequency
    });
});

database.ref().on('child_added', function(childSnapshot){
    console.log(childSnapshot.val().shuttleName);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstShuttle);
    console.log(childSnapshot.val().destination);

    var sFrequency = $("#frequency-input").val().trim();
    var firstTime = $("#first-shuttle-input").val().trim();

    shuttleName = childSnapshot.val().shuttleName;
    destination = childSnapshot.val().destination;
    firstShuttle = childSnapshot.val().firstShuttle;
    frequency = childSnapshot.val().frequency;

    var firstTimeConverted = moment(firstTime, "HH").subtract(1, "years");
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
        
        
    $("#shuttle-table").prepend("<tr><td>" + shuttleName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextShuttle.format("hh:mm")+ "</td><td>" + sMinutesToShuttle + "</td></tr>");

    }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
});


$(document).ready(displayShuttlesArray());