var useBoxes = [];

var Diff;
var firstBox;
var firstBoxPoint;
var moveableBoxes;
var randomNumber;
var randomBox;
var heightBox;
var lastBox = [];
var topPositions = [];



// ========================

var boxes = ["Lorem ipsum dolor sit amet 1", "Lorem ipsum dolor sit amet 2", "Lorem ipsum dolor sit amet 3", "Lorem ipsum dolor sit amet 4", "Lorem ipsum dolor sit amet 5", "Lorem ipsum dolor sit amet 6", "Lorem ipsum dolor sit amet 7", "Lorem ipsum dolor sit amet 8", "Lorem ipsum dolor sit amet 9", "Lorem ipsum dolor sit amet 10"]
var newBox;
var inHTML = "";

$.each(boxes, function(i, value) {
    newBox = "<li id='" + (i + 1) + "'>" + value + "</li>";
    inHTML += newBox;
});
console.log(inHTML);
$(".anime-list").html(inHTML);

// ========================



var allContentBoxes = $(".anime-list li");
for (var k = 0; k < allContentBoxes.length; k++) {
    useBoxes.push(allContentBoxes[k]);
}
console.log(useBoxes);


function reset() {
    $("ul").find("li").css({
        top: "0px"
    });
    $("ul").find(".active").removeClass("active");

}

function getFirstBoxPoint(pass) {
    return pass;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

heightBox = $("ul li").height();


// for (p = 0; p < useBoxes.length; p++) {
//     topPositions.push($(useBoxes[p]).offset().top);
// }
// console.log(topPositions);

firstBoxPoint = getFirstBoxPoint(4);
moveableBoxes = useBoxes.slice(firstBoxPoint);
firstBox = $(moveableBoxes[0]);


$("#check").on("click", function() {
    try {

        function moveableContent() {

            reset();
            randomNumber = getRandomNumber(0, moveableBoxes.length - 1);
            randomBox = $(moveableBoxes[randomNumber]);
            randomBox.addClass("active");
            console.log(randomBox);

            Diff = firstBox.offset().top - randomBox.offset().top;
            // console.log(Diff)

            // console.log(moveableBoxes);
            moveableBoxes.splice(randomNumber, 1);
            moveableBoxes.unshift(randomBox[0]);
            // console.log(moveableBoxes);

            function animateRandomBox() {
                $(randomBox)
                    .animate({
                        "top": Diff
                    });
            }

            // requestAnimationFrame(() => {});

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

            $.when(animateRandomBox()).then(function() {
                animateEffects();
            });
        }

        function changeContent() {

            function removeItems(array, itemLength) {
                for (var i = 0; i < itemLength; i++) {
                    array.pop();
                }
            }
            removeItems(boxes, moveableBoxes.length);

            for (i = 0; i < moveableBoxes.length; i++) {
                boxes.push(moveableBoxes[i].innerText);
            }

            var newUpdatedBox;
            var updatedHTML = "";

            $.each(boxes, function(i, value) {
                newUpdatedBox = "<li id='" + (i + 1) + "'>" + value + "</li>";
                updatedHTML += newUpdatedBox;
            });
            $(".anime-list").html(updatedHTML);

        }


        $.when(moveableContent()).then(function() {
            setTimeout(function() {
                changeContent();
                console.log(useBoxes);
            }, 500);
        });
    } catch (err) {
        console.log("We have an error man! " + err.stack);
    }
});


//=============================================================================================================================