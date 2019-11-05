// Panimate.js - aJax animation library
// *** Created by Ben Bozzay ***
// Get the start an end values of identical images between pages
// Create reversable aJax animations

// Given an item:
// 1. Get the current offset positions (start values): left, top, right, height, width
// 2. 
// Pass the window context as global
(function(global, animateLibrary) {

    // 1. //
    // Init initializes an object
    // We set a var equal to a function that initializes the object
    let Panimate = function(start, end, options) {
        return new Panimate.init(start, end, options);
    }

    // Array of supported items
    var supportedDivs = ['panimate-start', 'panimate-end'];

   

    // Add a prototype for our constructor
    // Will use this to add any methods we want to use for our Panimate object
    Panimate.prototype = {
        // This points to the object
        // Return this in each statement to make chainable
        validate: function(selector) {

            var errorMessage;

            // if a selector is passed, validate it
            if (selector) {
                if (selector.tagName !== "IMG") {
                    errorMessage = "Not of type Image";
                }
            }

            if (!document.querySelector("[panimate-container]")) {
                errorMessage = "panimate-container not defined"
            }

            if (!animateLibrary || animateLibrary === undefined) {
                errorMessage = "Animation library Not Loaded";
                throw errorMessage;
            }
            
            // Only throw an error if an error exists
            if (errorMessage) {
                throw errorMessage;
            }
            
        },

        getStartValues: function(startImage, topOffset) {
            this.validate(startImage);

            var startVals = {

                y: (function(topOffset) {
                    
                    if (topOffset) {

                    }
                    return startImage.getBoundingClientRect().y;

                }(topOffset)),

                x: startImage.getBoundingClientRect().x
            }

            return startVals;
        },
        setStartValues: function(startImage, topOffset) {
            this.validate(startImage);
            console.log(this.getStartValues(startImage))
            startImage.style.transform = `translate(-${this.getStartValues(startImage).x}px, -${this.getStartValues(startImage, topOffset).y}px)`;
            return this;
        }

    };

    // 2. //
    // Create a function constructor that builds an object and gives it 3 properties with default values
    Panimate.init = function(start, end, options) {

        // Set default values
        var self = this;

        self.start = start || document.querySelectorAll("[panimate-start]");
        self.end = end || document.querySelectorAll("[panimate-end]");

        self.options = options || {
            forward: {

            },
            back: {
                duration: 400,
                easing: "linear",
            }
        }
        
        self.validate();
    }

    // Give access to all prototype properties
    Panimate.init.prototype = Panimate.prototype;
    // Pass Panimate to the global object;
    global.Panimate = Panimate;


    // Pass window and Velocity as params to this scope
}(window, Velocity));