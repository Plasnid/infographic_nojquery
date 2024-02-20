// **set initial screen number
let screenNum = 1;

// **total number of screens, get the screens then get the number
let allScreens = document.querySelectorAll("section");
let totalScreens = allScreens.length;
console.log(allScreens);
console.log(totalScreens);

// **transition duration
let dur = 1;

/**
 ** delay for starting screen animations
 ** make equal to duration... The time it takes content to transition off screen
 ** add more time to delay the build on a little more
*/
let delay = dur + 0.5;
// disables nav when transitioning from screen to screen
let navActive = true;
// vars used for nav
let currentScreen, prevScreen, nextScreen;
// hides all screens except for screen 1
allScreens.forEach((screen, num) =>{
    console.log(num);
    if(num!=0){
        console.log(`${num} should be hidden`);
        screen.style.opacity =0;
        screen.style.display = "none";
    }else{
        console.log(`${num} should not be hidden`);
    }
})


// set up main div on paused timeline until begin button clicked
let main = gsap.from("main", {
    duration: dur,
    opacity: 0
}).pause();

// set up begin button on paused timeline until page load
let begin = gsap.from("#btnContainer", {
    duration: dur,
    opacity: 0,
    onReverseComplete: function() {
        console.log("Reverse Complete");
        loadScreen1();
        // show the main div
        document.querySelector("main").style.display = "block";
        document.querySelector("main").style.opacity = 1;
        main.play();
    }
}).pause();

// preload all content and then reveal begin button
document.addEventListener("DOMContentLoaded",function(){
    console.log("LOADED!!");
    // fade out preloader GIF
    gsap.to("#loading", {
        duration: dur,
        opacity: 0,
        onComplete: function() {
            document.querySelector("#begin").style.opacity = 1;
            // when done show begin button
            begin.play(); 
        }
    });
});

// begin button click function
document.querySelector("#begin").addEventListener("click",function() {
    begin.reverse();
});

// next and previous navigation functions
function showNextScreen(){
    // check if nav is active
    if(navActive){
        console.log("nextScreen");
        navActive = false;
        // ! Make sure you got that hashtag!
        // target the current
        currentScreen = `#screen${screenNum}`;
        console.log(currentScreen);
        // set the next screen number 
        screenNum++;
        showHideNav(screenNum);
        // target the next screen
        nextScreen = `#screen${screenNum}`;
        // transitions current screen out
        gsap.fromTo(currentScreen, {
            x: 0
        }, {
            duration: dur,
            delay: 0.5,
            x: -960,
            ease: "power2.inOut"
        });
        // show next screen
        document.querySelector(nextScreen).style.display = "block";
        document.querySelector(nextScreen).style.opacity = 1;
        gsap.fromTo(nextScreen, {
            x: 960
        }, {
            duration: dur,
            delay: 0.5,
            x: 0,
            ease: "power2.inOut",
            onComplete: function() {
                console.log("Next Screen Animation Finished");
                // hide current screen
                document.querySelector(currentScreen).style.opacity = 0;
                document.querySelector(currentScreen).style.display = "none";
                // re-enable nav
                navActive = true;
            }
        });

        // ! ACCESS FIELD OF AN OBJECT [] allows for a field but we have a variable
        // ! CAN CONCATENATE BUT ALSO RUN THE FUNCTION
        // load function to animate conents of the screen
        // set up off screen
        window[`loadScreen${screenNum}`]();
    }
}

function showPrevScreen(){
    // check if nav is active
    if(navActive){
        console.log("prevScreen");
        navActive = false;
        // ! Make sure you got that hashtag!
        // target the current
        currentScreen = `#screen${screenNum}`;
        // set the prev screen number 
        screenNum--;
        showHideNav(screenNum);
        // target the prev screen
        prevScreen = `#screen${screenNum}`;
        // transitions current screen out
        gsap.fromTo(currentScreen, {
            x: 0
        }, {
            duration: dur,
            delay: 0.5,
            x: 960,
            ease: "power2.inOut"
        });

        // show prev screen
        document.querySelector(prevScreen).style.opacity = 1;
        document.querySelector(prevScreen).style.display = "block";

        gsap.fromTo(prevScreen, {
            x: -960
        }, {
            duration: dur,
            delay: 0.5,
            x: 0,
            ease: "power2.inOut",
            onComplete: function() {
                console.log("Prev Screen Animation Finished");
                // hide current screen
                document.querySelector(currentScreen).style.opacity = 0;
                document.querySelector(currentScreen).style.display = "none";
                // re-enable nav
                navActive = true;
            }
        });

        // ! ACCESS FIELD OF AN OBJECT [] allows for a field but we have a variable
        // ! CAN CONCATENATE BUT ALSO RUN THE FUNCTION
        // load function to animate conents of the screen
        // set up off screen
        window[`loadScreen${screenNum}`]();
    
    }
}
// next and previous button clicks
document.querySelector("#next").addEventListener("click",showNextScreen);
document.querySelector("#prev").addEventListener("click", showPrevScreen);
// show/hide next/prev buttons
function showHideNav(currentScreen) {
    console.log("showHideNav reached");
    let nextBtn = document.querySelector("#next");
    let prevBtn = document.querySelector("#prev");
    if(currentScreen == 1) {
        console.log("should show just the next");
        gsap.to(prevBtn,{opacity: 0, duration: 1});
        gsap.to(nextBtn,{opacity: 1, duration: 1});
    } else if(currentScreen == totalScreens) {
        console.log("should show just the prev")
        gsap.to(prevBtn,{opacity: 1, duration: 1});
        gsap.to(nextBtn,{opacity: 0, duration: 1});
    }
    else {
        console.log("show all nav")
        gsap.to(prevBtn,{opacity: 1, duration: 1});
        gsap.to(nextBtn,{opacity: 1, duration: 1});
    }

}

// set up nav on page load
showHideNav(screenNum);

// functions for loading on content of each screen
// LOAD SCREEN 1 ///////////////////////////////////////////////
function loadScreen1() {
    // animate content on with delays
    gsap.from("#screen1 h1", {
        duration: dur,
        delay: delay,
        opacity: 0
    });
}

// LOAD SCREEN 2 ///////////////////////////////////////////////
function loadScreen2() {
    // animate content on with delays
    gsap.from("#screen2 h1", {
        duration: dur,
        delay: delay,
        opacity: 0
    });
}

// LOAD SCREEN 3 ///////////////////////////////////////////////
function loadScreen3() {
    // animate content on with delays
    gsap.from("#screen3 h1", {
        duration: dur,
        delay: delay,
        opacity: 0
    });
}

// LOAD SCREEN 4 ///////////////////////////////////////////////
function loadScreen4() {
    // animate content on with delays
    gsap.from("#screen4 h1", {
        duration: dur,
        delay: delay,
        opacity: 0
    });
}

// LOAD SCREEN 5 ///////////////////////////////////////////////
function loadScreen5() {
    // animate content on with delays
    gsap.from("#screen5 h1", {
        duration: dur,
        delay: delay,
        opacity: 0
    });
}

// LOAD SCREEN 6 ///////////////////////////////////////////////
function loadScreen6() {
    // animate content on with delays
    gsap.from("#screen6 h1", {
        duration: dur,
        delay: delay,
        opacity: 0
    });
}