/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 * 
 * Last Edited by Puranjay Jain
 */
var winnerclassnames = [];
var cur = 0;
(function () {

    var support = { animations: Modernizr.cssanimations },
		container = document.getElementById('ip-container'),
		header = container.querySelector('header.ip-header'),
		loader = new PathLoader(document.getElementById('ip-loader-circle')),
		animEndEventNames = { 'WebkitAnimation': 'webkitAnimationEnd', 'OAnimation': 'oAnimationEnd', 'msAnimation': 'MSAnimationEnd', 'animation': 'animationend' },
		// animation end event name
		animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

    function init() {
        var onEndInitialAnimation = function () {
            if (support.animations) {
                this.removeEventListener(animEndEventName, onEndInitialAnimation);
            }

            startLoading();
        };

        // disable scrolling
        window.addEventListener('scroll', noscroll);

        // initial animation
        classie.add(container, 'loading');

        if (support.animations) {
            container.addEventListener(animEndEventName, onEndInitialAnimation);
        }
        else {
            onEndInitialAnimation();
        }
    }

    function startLoading() {
        // simulate loading something..
        var simulationFn = function (instance) {
            var progress = 0,
				interval = setInterval(function () {
				    progress = Math.min(progress + Math.random() * 0.1, 1);

				    instance.setProgress(progress);

				    // reached the end
				    if (progress === 1) {
				        classie.remove(container, 'loading');
				        classie.add(container, 'loaded');
				        clearInterval(interval);

				        var onEndHeaderAnimation = function (ev) {
				            if (support.animations) {
				                if (ev.target !== header) return;
				                this.removeEventListener(animEndEventName, onEndHeaderAnimation);
				            }

				            classie.add(document.body, 'layout-switch');
				            window.removeEventListener('scroll', noscroll);
				        };

				        if (support.animations) {
				            header.addEventListener(animEndEventName, onEndHeaderAnimation);
				        }
				        else {
				            onEndHeaderAnimation();
				        }
				    }
				}, 50);
        };

        loader.setProgressFn(simulationFn);
    }

    function noscroll() {
        window.scrollTo(0, 0);
    }

    init();

})();
//get a random number from a string array
function getRandom(x) {
    return x[(Math.floor(Math.random() * x.length))];
}
var magicbutton = document.querySelector('.icon-wand');
magicbutton.addEventListener('click', function () {
    classie.add(document.body, 'hide-logo');
    var name = $('#' + winnerclassnames[cur]).html();
    $(".winnername").html(name);
    $(".enrollment").html(winnerclassnames[cur]);
    $("body").mCustomScrollbar("scrollTo", "top");
    //set text of all the entrants
    setTimeout(function () {
        $(".stage").mCustomScrollbar("scrollTo", "bottom");
    }, 3300);
    setTimeout(function () {
        $(".stage").mCustomScrollbar("scrollTo", "top");
    }, 5000);
    setTimeout(function () {
        $(".stage").mCustomScrollbar("scrollTo", "#" + winnerclassnames[cur]);
    }, 7000);
    setTimeout(function () {
        document.querySelector('.icon-spinner').style[Modernizr.prefixed('animation')] = "buttonPop 1s cubic-bezier(0.7,0,0.3,1) forwards,buttonPop1 0.5s cubic-bezier(0.7,0,0.3,1) 1s forwards";
        document.querySelector('.icon-spinner').classList.add('icon-spinner-before');
        $(".displayname").addClass("visible-displayname");
        $(".displayname").css('position', 'fixed', 'top', '0');
    }, 11000);
    cur++;
}
);
var redobutton = document.querySelector('.icon-spinner');
redobutton.addEventListener('click', function () {
    classie.add(document.body, 'hide-logo');
    var name = $('#' + winnerclassnames[cur]).html();
    $(".winnername").html(name);
    $(".enrollment").html(winnerclassnames[cur]);
    $("body").mCustomScrollbar("scrollTo", "top");
    //set text of all the entrants
    setTimeout(function () {
        $(".stage").mCustomScrollbar("scrollTo", "bottom");
    }, 1000);
    setTimeout(function () {
        $(".stage").mCustomScrollbar("scrollTo", "top");
    }, 3000);
    setTimeout(function () {
        $(".stage").mCustomScrollbar("scrollTo", "#" + winnerclassnames[cur]);
    }, 5000);
    setTimeout(function () {
        document.querySelector('.icon-spinner').style[Modernizr.prefixed('animation')] = "buttonPop 1s cubic-bezier(0.7,0,0.3,1) forwards,buttonPop1 0.5s cubic-bezier(0.7,0,0.3,1) 1s forwards";
        document.querySelector('.icon-spinner').classList.add('icon-spinner-before');
        $(".displayname").addClass("visible-displayname");
        $(".displayname").css('position', 'fixed', 'top', '0');
    }, 7000);
    cur++;
}
);
(function ($) {
    $(window).load(function () {
        $(".stage").mCustomScrollbar({
            theme: "minimal",
            scrollInertia: 2500,
            autoHideScrollbar: true
        });
        $("body").mCustomScrollbar({
            theme: "minimal-dark",
            autoHideScrollbar: true,
            callbacks: {
                onScrollStart: function () {
                    $(".displayname").removeClass("visible-displayname");
                }
            }
        });
        var data = getNames(readTextFile("../data/names.csv")),
            names = data[0],
            enrollment = data[1];
        //winner names
        winnerclassnames = getWinner(enrollment.filter(Boolean));
        for (var i in names) {
            $(".people").append("<li id=\'" + enrollment[i] + "\'>" + names[i] + "</li>");
        }
    });
})(jQuery);
//choose unique winner
function getWinner(names) {
    var arr = [];
    var winners = [];
    while (arr.length < 10) {
        var randomnumber = Math.ceil(Math.random() * names.length);
        var found = false;
        for (var i = 0; i < arr.length; i++) {
            if ((arr[i] == randomnumber) || (arr[i] == "") || (arr[i] == null)) { found = true; break }
        }
        if (!found) {
            arr[arr.length] = randomnumber;
            winners[arr.length - 1] = names[randomnumber];
        }
    }
    return winners;
}
//file data
function getNames(csv) {
    var justnames = [[], []];
    var name = $.csv.toArrays(csv);
    var a = name[0].indexOf("Name");
    var b = name[0].indexOf("Enrollment No");
    for (var j = 1; j < name.length; j++) {
        justnames[0][j - 1] = name[j][a];
        justnames[1][j - 1] = name[j][b];
    }
    return justnames;
}
//read text file
function readTextFile(file) {
    var allText = null;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}