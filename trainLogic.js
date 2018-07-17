// need to change firebase link




// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
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
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      train: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.trainTime);
    console.log(newTrain.frequency);
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#first-train-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);
  
   // var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
    // var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;

    // Prettify the employee start
    var trainTimePretty = moment.unix(trainTime).format("MM/DD/YYYY");
    //var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
  
    // Calculate the total billed rate
    var minsAway = trainTime - frequency;
    console.log(minsAway);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(trainTimePretty),
      $("<td>").text(minsAway),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  