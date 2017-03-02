var useBoxes = [];
var allContentBoxes = $("ul li");

for (var k = 0; k < allContentBoxes.length; k++) {
    useBoxes.push(allContentBoxes[k]);
}

var Diff;
var firstBox;
var firstBoxPoint;
var moveableBoxes;
var randomNumber;
var randomBox;
var heightBox;
var lastBox = [];
var topPositions = [];


function reset() {
    // $("ul").find("li").css({
    //         top: "0px"
    //     });
    $("ul").find(".active").removeClass("active");

}

function getFirstBoxPoint(pass) {
    return pass;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

heightBox = $("ul li").height();


for (p = 0; p < useBoxes.length; p++) {
    topPositions.push($(useBoxes[p]).offset().top);
}
console.log(topPositions);

firstBoxPoint = getFirstBoxPoint(4);

moveableBoxes = useBoxes.slice(firstBoxPoint);
firstBox = $(moveableBoxes[0]);

$("#check").on("click", function() {
    try {

        randomNumber = getRandomNumber(0, moveableBoxes.length - 1);
        randomBox = $(moveableBoxes[randomNumber]);
        reset();
        randomBox.addClass("active");


        Diff = firstBox.offset().top - randomBox.offset().top;

        console.log(moveableBoxes);
        moveableBoxes.splice(randomNumber, 1);
        moveableBoxes.unshift(randomBox[0]);
        console.log(moveableBoxes);




        $(randomBox)
            .animate({
                "top": Diff
            });


        // for (var i = 0; i < moveableBoxes.length; i++) {

        //     function loopBox(index) {
        //         return $(moveableBoxes[index]);
        //     }

        //     heightBox = $("ul li").height();

        //     if (loopBox(i).hasClass("active")) {
        //         continue;

        //     } else {

        //         if (i > 0) {
        //             var distanceBetweenBoxes = loopBox(i).offset().top - randomBox.offset().top;

        //             if (distanceBetweenBoxes > 5) {
        //                 loopBox(i).animate({
        //                     "top": 0
        //                 });
        //             } else {
        //                 loopBox(i).animate({
        //                     "top": heightBox + 5
        //                 });
        //             }
        //         } else {
        //             loopBox(i).animate({
        //                 "top": heightBox + 5
        //             });
        //         }
        //     }
        // }

        for (var c = 0; c < moveableBoxes.length; c++) {
            $(moveableBoxes[c]).offset({ top: topPositions[firstBoxPoint + c] });
        }


    } catch (err) {
        console.log("We have an error man! " + err);
    }
});