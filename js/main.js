var useBoxes = [];
var allContentBoxes = $("ul li");

for (var k = 0; k < allContentBoxes.length; k++) {
    useBoxes.push(allContentBoxes[k]);
}

var Diff;
var firstBox;
var firstBoxPoint;
var moveableBoxes;
var randomBox;
var heightBox;
var lastBox = [];


function reset() {
    $("ul").find("li").css({
        top: ""
    });
    $("ul").find(".active").removeClass("active");

}

function getFirstBoxPoint(pass) {
    return pass;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


heightBox = $("ul li").height();

$("#check").on("click", function() {
    try {
        reset();

        firstBoxPoint = getFirstBoxPoint(4);
        firstBox = $(useBoxes[firstBoxPoint]);
        moveableBoxes = useBoxes.slice(firstBoxPoint);
        randomBox = $(moveableBoxes[randomNumber(0, moveableBoxes.length - 1)]);
        randomBox.addClass("active");

        // if (lastBox.length === 0) {
        //     Diff = firstBox.offset().top - randomBox.offset().top;
        // } else {
        //     Diff = $(lastBox[0]).offset().top - randomBox.offset().top;
        // }
        Diff = firstBox.offset().top - randomBox.offset().top;
        lastBox.unshift(randomBox);
        $(randomBox)
            .animate({
                "top": Diff
            });

        for (var i = 0; i < moveableBoxes.length; i++) {

            function loopBox(index) {
                return $(moveableBoxes[index]);
            }

            var heightBox = $("ul li").height(); //

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
    } catch (err) {
        console.log("We have an error man! " + err);
    }
});