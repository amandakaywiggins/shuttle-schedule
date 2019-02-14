# Shuttle Schedule
Fly me to the moon!

[Visit the site](https://amandakaywiggins.github.io/shuttle-schedule/index.html)

## Description
Take a relaxing vacation on the Io Cruiser to stunning Jupiter! Or catch the Express to Earth's own Moon!
This intergalaxy shuttle timetable will get you where you need to go with:

    Shuttle Names
    Destinations
    Regular updates on when the next shuttle arrives
    The ability to search for other shuttle services


## Goals
Learn to use Firebase as a database host. Create dynamic and interesting visual UI. 

## Key Code
Pulling data from firebase and manipulating it.

````
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
````
## Author
Amanda Kay Wiggins

## Acknowledgements
Created as part of the UT Bootcamp 

This project is maintained by Amanda Kay Wiggins
