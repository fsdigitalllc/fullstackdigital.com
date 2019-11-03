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
    var Panimate = function(param1, param2) {
        return new Panimate.init(param1, param2);
    }

    // Array of supported items
    var supportedDivs = ['Panimate-start', 'Panimate-end'];


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
            
            // Throw error if this required param is missing in the supportedDivs array
            // If this was a selector, we would need to make sure to get the classname as a string
            if (supportedDivs.indexOf(this.param1) === -1) {
                errorMessage = "Unsported selector passed";
            }
            if (supportedDivs.indexOf(this.param2) === -1) {
                errorMessage = "Missing Param2";
            }

            if (!animateLibrary || animateLibrary === undefined) {
                errorMessage = "VelocityJS Not Loaded";
                throw errorMessage;
            }
            
            // Only throw an error if an error exists
            if (errorMessage) {
                throw errorMessage;
            }
            
        },

        animateBetweenPages: function() {
            // Check if valid selectors are in use
            this.validate();
            return this.param1 + " animateBetweenPages";
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
    Panimate.init = function(param1, param2) {

        // Set default values
        var self = this;

        // If param1 is set use that value, otherwise set it to an empty string
        self.param1 = param1 || '';
        self.param2 = param2 || "test";

        self.validate();
    }

    // Give access to all prototype properties
    Panimate.init.prototype = Panimate.prototype;
    // Pass Panimate to the global object;
    global.Panimate = Panimate;


    // Pass window and Velocity as params to this scope
}(window, Velocity));