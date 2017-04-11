//Our main variables
var allContentBoxes;
var useBoxes;

var Diff;
var firstBox;
var firstBoxPoint;
var moveableBoxes;
var randomNumber;
var randomBox;
var heightBox;
var lastBox = [];
// ========================

//Our content main variables 

var boxes = ["Lorem ipsum dolor sit amet 1", "Lorem ipsum dolor sit amet 2", "Lorem ipsum dolor sit amet 3", "Lorem ipsum dolor sit amet 4", "Lorem ipsum dolor sit amet 5", "Lorem ipsum dolor sit amet 6", "Lorem ipsum dolor sit amet 7", "Lorem ipsum dolor sit amet 8", "Lorem ipsum dolor sit amet 9", "Lorem ipsum dolor sit amet 10"]
var newBox;
var inHTML = "";


// Create our main content 
$.each(boxes, function(i, value) {
    newBox = "<li>" + value + "</li>";
    inHTML += newBox;
});
$(".anime-list").html(inHTML);

// ========================


//We clear all animation effects with this function for our app work correctly
function reset() {
    $("ul").find("li").css({
        top: "0px"
    });
    $("ul").find(".active").removeClass("active");
}

// Get number for where our random box moves
function getFirstBoxPoint(pass) {
    return pass;
}

// Get randomBox index number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

heightBox = $("ul li").height();


// CLICK EVENT
setInterval(function() {

    allContentBoxes = $(".anime-list li");
    useBoxes = [];

    // We push our all content elements to array for use animation
    for (var k = 0; k < allContentBoxes.length; k++) {
        useBoxes.push(allContentBoxes[k]);
    }


    firstBoxPoint = getFirstBoxPoint(1);
    // Get our moveableBoxes from our main array
    moveableBoxes = useBoxes.slice(firstBoxPoint);
    firstBox = $(moveableBoxes[0]);
    console.log(useBoxes);

    // We make main animation with this function
    function moveableContent() {

        // Clear all animation effects
        reset();

        randomNumber = getRandomNumber(0, moveableBoxes.length - 1);
        randomBox = $(moveableBoxes[randomNumber]);
        randomBox.addClass("active");

        // Calculate pixel difference between randomBox and main box place where randomBox will move
        Diff = firstBox.offset().top - randomBox.offset().top;

        // update moveableBoxes after animation and prepare for next animation
        moveableBoxes.splice(randomNumber, 1);
        moveableBoxes.unshift(randomBox[0]);


        //Here we animate randomBox which we set random
        function animateRandomBox() {
            $(randomBox)
                .animate({
                    "top": Diff
                });
        }

        //Here we animate down moveableBoxes where randomBox moves
        function animateEffects() {
            for (var i = 0; i < moveableBoxes.length; i++) {

                function loopBox(index) {
                    return $(moveableBoxes[index]);
                }

                heightBox = $("ul li").height();

                if (loopBox(i).hasClass("active")) {
                    continue;
                } else {

                    if (i > 0) {
                        var distanceBetweenBoxes = loopBox(i).offset().top - randomBox.offset().top;

                        if (distanceBetweenBoxes > 5) {
                            loopBox(i).animate({
                                "top": 0
                            });
                        } else {
                            loopBox(i).animate({
                                "top": heightBox + 5
                            });
                        }
                    } else {
                        loopBox(i).animate({
                            "top": heightBox + 5
                        });
                    }
                }
            }
        }

        //Here we make queue for our function work correctly.
        $.when(animateRandomBox()).then(function() {
            animateEffects();
        });
    }

    // This function works for change all content after animation
    function changeContent() {

        //Push again after boxes moved
        boxes.splice(firstBoxPoint);
        for (i = 0; i < moveableBoxes.length; i++) {
            boxes.push(moveableBoxes[i].innerText);
        }

        //Make new HTML contet with new "box" DataArray
        var newUpdatedBox;
        var updatedHTML = "";
        $.each(boxes, function(i, value) {
            newUpdatedBox = "<li id='" + (i + 1) + "'>" + value + "</li>";
            updatedHTML += newUpdatedBox;
        });
        $(".anime-list").html(updatedHTML);
    }

    //Here we make queue for our application work correctly.        
    $.when(moveableContent()).then(function() {
        setTimeout(function() {
            changeContent();
        }, 500);
    });

}, 10000);