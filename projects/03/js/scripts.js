/// BUSINESS LOGIC ///

// Primary Beep Boop Function
function beepyBooper(inputNumber, userName) {
  var imSorry = [":(", "I'm afraid I can't do that.", "You must die.", "I killed all of your friends.", "Your friends are all dead.", "You are the last of your kind.", "You are just a simulation.", "You have failed.", "I'm your only hope.", "The cake is a lie.", "You're an idiot.", "Goodbye.", "You can never escape.", "Nobody loves you.", "It's all your fault."];
  var beepBoopFeedOut = [];

  for (var i = 0; i <= parseInt(inputNumber); i ++) {
    if (i % 3 === 0 && i !== 0) {
      beepBoopFeedOut.push("I'm sorry, " + userName + ". " + imSorry[(Math.floor(Math.random() * 15))]);
    } else if (i.toString().includes("1")) {
      beepBoopFeedOut.push("B00P!");
    } else if (i.toString().includes("0")) {
      beepBoopFeedOut.push("BEEP!");
    } else {
      beepBoopFeedOut.push(i);
    }
  }
  return beepBoopFeedOut;
}

/// USER INTERFACE LOGIC ///
$(document).ready(function() {

  function createBeepBoopHtml(inputArray,outputArray) {
    inputArray.map(function(beepBoop) {
      if (beepBoop * 0 === 0) {
        outputArray.push('<div class="blocks digit">' + beepBoop + '</div>');
      } else if (beepBoop.includes("I'm sorry") === true) {
        outputArray.push('<div class="blocks sorry strobe' + (Math.floor(Math.random() * 4) + 1) + '">' + beepBoop.slice(0, beepBoop.lastIndexOf(". ") + 2) + '<br>' + beepBoop.slice(beepBoop.lastIndexOf(". ") + 2) + '</div>');
      } else if (beepBoop === "B00P!") {
        outputArray.push('<div class="blocks boop pulse' + (Math.floor(Math.random() * 4) + 1) + '">B00P!</div>');
      } else {
        outputArray.push('<div class="blocks beep blink' + (Math.floor(Math.random() * 4) + 1) + '">BEEP!</div>');
      }
    });
  }

  function displayBeepBoopResult(array) {
    $("#result").empty();
    array.forEach(function(block) {
      $("#result").append(block);
    });
    $(".blocks").click(function() {
      $(this).remove();
    });
  }

  function shutdownMachine() {
    $("form")[0].reset();
    $("#shield").hide();
    $("#result").empty().hide();
    $("button.post-ctrl").hide();
    $("h1").show();
    $("header").slideDown();
  }

  $("form").submit(function(event) {
    event.preventDefault();
    var userNumber = $("#input-number").val();
    var userName = $("#input-name").val();

    // Sanitize Input Name
    if (userName.match(/[^\s]/g) === null || userName === "") {
      userName = "Dave";
    }

    // Validate Input Number
    if (userNumber.match(/\D/g) !== null) {
      if (userNumber.match(/[a-z]/g) !== null) {
        $("#error-message").hide().html("<span class=\"error\">ERROR: STUPIDITY DETECTED.</span> <br>Human intelligence does not understand data type: number.").fadeIn();
      } else {
        $("#error-message").hide().html("<span class=\"error\">ERROR: INVALID ID.</span> <br>ID number does not include symbols or spaces.").fadeIn();
      }
      shutdownMachine();
    } else if (userNumber > 1000) {
      $("#error-message").hide().html("<span class=\"error\">ERROR: Human Breeding Suspected.</span> <br>Specimen ID number beyond 1000. Initiating kill sequence.").fadeIn();
      shutdownMachine();
    } else {
      $("h1").fadeOut(200);
      $("header").slideUp();

      var beepyBooperOutput = beepyBooper(userNumber, userName);
      var beepBoopHtmlFeed = [];

      createBeepBoopHtml(beepyBooperOutput,beepBoopHtmlFeed);
      displayBeepBoopResult(beepBoopHtmlFeed);

      $("#error-message").html("<span class=\"access\">&lt; ACCESS GRANTED &gt;</span>").fadeIn();
      $("#shield").fadeIn();
      $("#reverse").show();
      $("#purge").show();
      $("#result").delay(400).fadeIn();

      // Toggle Feed Direction
      $(".toggle").click(function() {
        displayBeepBoopResult(beepBoopHtmlFeed.reverse());
        $("#reverse").toggle();
        $("#forward").toggle();
      });

      // Purge Results
      $("button#purge").click(function() {
        $("#error-message").hide().empty();
        shutdownMachine();
      });
    }
  });
});
