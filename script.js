$(function () {
  // Adds event listeners to buttons using classes as selectors because id's are for specific ones.
  // Stores the hour and memo in text box into localstorage
  $(".btn").on("click", function () {
    var timeBlockId = $(this).closest("div").attr("id");

    var userInput = $(this).siblings("textarea").val();

    localStorage.setItem(timeBlockId, userInput);
  });
  // To get the current hour no need to import because in js because it was imported in the html
  var currentHour = dayjs().hour();
  // Gets the number from the id to check against the current time to then set the classes for the time blocks.
  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
  // Sets the text area text to the previous memo by pulling from local storage.
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var storedInput = localStorage.getItem(timeBlockId);

    $(this).find("textarea").val(storedInput);
  });
  // Deletes all keys in local storage and set the text value of the time blocks to blank.
  $("#clearBtn").on("click", function () {
    localStorage.clear();
    $("textarea").val("");
  });
  var currentDate = dayjs().format("MMMM DD, YYYY");
  $("#currentDay").text(currentDate);
});
