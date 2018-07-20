
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD4hCuif3xCB9xO8GZxy2qWvxflJze0I6M",
    authDomain: "train-scheduler-ca710.firebaseapp.com",
    databaseURL: "https://train-scheduler-ca710.firebaseio.com",
    projectId: "train-scheduler-ca710",
    storageBucket: "train-scheduler-ca710.appspot.com",
    messagingSenderId: "307991242541"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding new trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input from form
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" objects for holding the data
    var newTrain = {
        train: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    };

    // Uploads the train data to the database
    database.ref().push(newTrain);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#first-train-input").val("");
});

// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {

    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = parseInt(childSnapshot.val().frequency);

    // Makes the train time look better 
    var trainTimePretty = moment(trainTime, "HH:mm A").subtract(1, "years");

    //Variables used to calculate the minutes away
    var diffTime = moment().diff(moment(trainTimePretty), "minutes");

    var timeRemainder = diffTime % frequency;

    var minutes = frequency - timeRemainder;

    var minsAway = moment().add(minutes, "minutes").format("HH:mm");

    // Create the new row
    var newRow = $("<tr>");

    var name = $("<td>" + trainName + "</td>");
    var location = $("<td>" + destination + "</td>");
    var firstTrain = $("<td>" + trainTime + "</td>")
    var amount = $("<td>" + frequency + "</td>");
    var times = $("<td>" + minsAway + "</td>");
    var mins = $("<td>" + minutes + "</td>");

    newRow.append(name, location, firstTrain, amount, times, mins);
    
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

