// WINNING NUMBER

function generateWinningNumber() {
    return Math.ceil(Math.random() * 100)
};

var winningNumber = generateWinningNumber();



// WAIT FOR PAGE TO FULLY LOAD

jQuery(document).ready(function() {

    $(".field").keyup(function(event){
        if(event.keyCode == 13){
            $(".checker").click();
        }
    });

    //COUNTER
    var counter = 4;

    //RETRIEVE USER SUBMISSION FROM TEXT FIELD AND ASSIGN TO userSub
    var userSub = Number($(".field").val());

    //HELPER FUNCTION FOR HINT
    function isEven(n) {
        if (n % 2 === 0) {
            return "even"
        } else {
            return "odd"
        }
    }

    //DO THIS WHEN CHECK IS CLICKED
    $(".checker").on("click", function() {

        if(counter === 4){
            var singularOrPlural = "try"
        } else {
            var singularOrPlural = "tries"
        }

        // UPDATE PLAYER PICK
        userSub = Number($(".field").val());

        // DIFFERENCE BETWEEN PLAYER SUB AND WINNING NUMBER FOR HELP
        var dif = Math.abs(userSub - winningNumber);

        if (counter === 0 && userSub !== winningNumber) {
            $(".tries").css("color", "red")
            $(".checker").css("display", "none")
            $(".hint").css("display", "none")
            $(".tries").text("No more tries left! The winning number was " + winningNumber + ". Restart to try again...")
        } else {
            if (userSub > 100 || userSub < 0 || Number.isInteger(userSub) === false) {
                alert("Ha! Nice try...");
            } else {
                if (userSub === winningNumber) {
                    // alert("You're correct!\nThe correct number is [" + userSub + "]");
                    $(".tries").css("color", "#FFD700")
                    $(".field").css("border", "4px dotted #FFD700")
                    $(".field").css("background-color", "black")
                    $(".field").css("color", "#FFD700")
                    $(".field").css("margin-top", "100px")
                    $(".field").css("margin-bottom", "30px")
                    $(".header").css("background-color", "rgba(255,215,0, 0.40)")
                    $(".header p").css("color", "black")
                    $("h1").css("color", "black")
                    $("h2").css("display", "none")
                    $("h3").css("display", "none")
                    $("h4").css("display", "none")
                    $(".checker").css("display", "none")
                    $(".hint").css("display", "none")
                    $(".tries").text("Good Job! After " + (5 - counter) + " " + singularOrPlural + ", you found the winning number: " + winningNumber);
                } else {
                    $(".tries").css("color", "white")
                    if (counter === 0) {
                        $(".tries").text("You have " + counter + " tries left!");
                    } else if (dif >= 90) {
                        $(".tries").text("You have " + counter + " tries left!\nYou're SUPER COLD!");
                    } else if (dif < 90 && dif >= 50) {
                        $(".tries").text("You have " + counter + " tries left!\nYou're COLD!");
                    } else if (dif < 50 && dif >= 25) {
                        $(".tries").text("You have " + counter + " tries left!\nYou're WARM!");
                    } else if (dif < 25 && dif >= 10) {
                        $(".tries").text("You have " + counter + " tries left!\nYou're HOT!");
                    } else {
                        $(".tries").text("You have " + counter + " tries left!\nYou're BURNING HOT!");
                    }
                }
                counter--;
            }
        }
    });

    var hints = 2;

    $(".hint").on("click", function() {
        $(".tries").css("color", "#3366FF")
        if (hints === 2) {

            if (userSub > winningNumber) {
                $(".tries").text("Too high...")
                $(".hint").text("1 Hint Left")
                hints--
            } else if (userSub < winningNumber) {
                $(".tries").text("Too low...")
                $(".hint").text("1 Hint Left")
                hints--
            }

        } else if (hints === 1) {
            if (userSub > winningNumber) {
                $(".tries").text("Try an " + isEven(winningNumber) + " number.")
                $(".hint").text("0 hints left")
                // $(".hint").css("display", "none")
                $(".hint").css("opacity", 0.5)
                hints--
            } else if (userSub < winningNumber) {
                $(".tries").text("Try an " + isEven(winningNumber) + " number.")
                $(".hint").text("0 hints left")
                // $(".hint").css("display", "none")
                $(".hint").css("opacity", 0.5)
                hints--
            }
        }
    });

    $(".retry").on("click", function() {
        location.reload()
    });

});
