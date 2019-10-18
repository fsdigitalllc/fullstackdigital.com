// Postquery.js - aJax animation library
// *** Created by Ben Bozzay ***
// Get the start an end values of identical images between pages
// Create reversable aJax animations

// Given an item:
// 1. Get the current offset positions (start values): left, top, right, height, width
// 2. 
// Pass the window context as global
(function(global) {

    // 1. //
    // Init initializes an object
    // We set a var equal to a function that initializes the object
    var Postquery = function(items) {
        return new Postquery.init(items);
    }

    // Array of supported items
    var supportedDivs = ['Postquery-start', 'Postquery-end'];

    let itemChain = [];

    // Add a prototype for our constructor
    // Will use this to add any methods we want to use for our Postquery object
    Postquery.prototype = {
        
        // This points to the object
        // Return this in each statement to make chainable
        validate: function(selector) {

            var errorMessage;
            //console.log("this items", this.items)

            // // if a selector is passed, validate it
            if (typeof this.items !== "object") {
                errorMessage = "Param1 is not of type object";
            }
            
            // // Throw error if this required param is missing in the supportedDivs array
            // // If this was a selector, we would need to make sure to get the classname as a string
            // if (supportedDivs.indexOf(this.param1) === -1) {
            //     errorMessage = "Unsported selector passed";
            // }
            // if (supportedDivs.indexOf(this.param2) === -1) {
            //     errorMessage = "Missing Param2";
            // }

            // if (!animateLibrary || animateLibrary === undefined) {
            //     errorMessage = "VelocityJS Not Loaded";
            //     throw errorMessage;
            // }
            
            // // Only throw an error if an error exists
            if (errorMessage) {
                throw errorMessage;
            }
            return this;
        },
        getItems: function(
            filter = {
                key: "data-filter-item",
                value: "brand"
            },
            sort = {
                key: "data-stort-order",
                value: "order"
            }
        ) {

            let filterArray = [];
            let sortArray = [];
            //console.log("default filter", filter, "default sort", sort)

            // Start by filtering so they only remaining items match the supplied rules
            this.items.forEach( (item, index) => {
                let featured = item.getAttribute("data-item-featured");
                let itemObj = {};
                itemObj.name = item;

                if (featured === "true") {
                    filterArray.push(
                        itemObj
                        )
                }
                
                
            });

            filterArray.forEach( (item, index) => {

            });

            return filterArray;
        },
    };

    // 2. //
    // Create a function constructor that builds an object and gives it 3 properties with default values
    Postquery.init = function(items) {

        // Set default values
        var self = this;

        // If param1 is set use that value, otherwise set it to an empty string
        self.items = items || '';
        
        self.validate();
    }

    // Give access to all prototype properties
    Postquery.init.prototype = Postquery.prototype;
    // Pass Postquery to the global object;
    global.Postquery = Postquery;


    // Pass window and Velocity as params to this scope
}(window));