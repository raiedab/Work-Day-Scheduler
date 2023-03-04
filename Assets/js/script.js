$(document).ready(function() {
  // Display the current date at the top of the page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  // Save the user's input to local storage when save button is clicked
  $(".saveBtn").on("click", function() {
    var time = $(this).siblings(".hour").text();
    var description = $(this).siblings(".description").val();
    localStorage.setItem(time, description);
  });

  // Load any saved data from local storage
  $(".hour").each(function() {
    var time = $(this).text();
    var description = localStorage.getItem(time);
    if (description !== null) {
      $(this).siblings(".description").val(description);
    }
  });

  // Update the color of each time block based on the current time
  function updateTimeBlockColors() {
    var currentHour = moment().hour();
    $(".hour").each(function() {
      var hour = parseInt($(this).text());
      var description = $(this).siblings(".description");
      if (hour < currentHour) {
        description.addClass("past").removeClass("present future");
      } else if (hour === currentHour) {
        description.addClass("present").removeClass("past future");
      } else {
        description.addClass("future").removeClass("past present");
      }
    });
  }

  // Call updateTimeBlockColors every 15 minutes to update the colors
  setInterval(updateTimeBlockColors, 15 * 60 * 1000);

  // Update the colors for the first time when the page loads
  updateTimeBlockColors();
});
