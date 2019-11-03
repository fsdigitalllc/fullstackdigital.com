// Since this is inject asynchronously, need to use DOMContentLoaded to initialize
;(function(global) {

    
    // Var the initializes the object
    let WorkGrid = function (items) {
        return new WorkGrid.init(items);
    }

    WorkGrid.prototype = {
        // This points to the object
        // Return this in each statement to make chainable
        validate: function(selector) {

            var errorMessage;

            // if a selector is passed, validate it
            if (selector) {
                if (selector.tagName === "SCRIPT") {
                    errorMessage = "Type supported";
                }
            }
            return this;
        },
        createAjaxContainer: function(containerClass = "work-ajax") {
            
            if (!document.querySelector(`.${containerClass}`)) {
                let createDiv = document.createElement("div");
                createDiv.className = containerClass;
                document.querySelector("main").appendChild(createDiv);
            }
            
            return this;
        },
        buildGrid: function() {

            // Change the z-index of a hovered grid item so that it overlaps the item below
            let items = this.items;
    
            let itemHover = (e) => {
                let item = e.target.closest('.item');
    
                if (item) {
                    let zIndex = parseInt(getComputedStyle(item).zIndex) + 1;
                    if (e.type === "mouseenter") {
                        console.log(
                            //"buildGrid --- z_index changing"
                        )
                        item.style.zIndex = zIndex;
                    }
                    if (e.type === "mouseleave") {
                        item.style.zIndex = "";
                    }
                }
            }
    
            items.forEach( (item, index) => {
    
                item.addEventListener("mouseleave", itemHover, false);
                item.addEventListener("mouseenter", itemHover, false);
            });
    
    
            // Append a load more button to work items
            // Reveal more items on click
    
            LoadMoreItems(items);
    
            // Display an item only when the images have loaded
            // The order should be sequentual
            RevealAfterImagesLoad(items);
            
            //createAjaxContainer();
            // Animate items with 60fps
            //Velocity();
            return this;
        }
    }

     // 2.
    // Create a function constructor that builds an object and gives it 2 properties with default values
    WorkGrid.init = function(items) {

        // Set default values
        var self = this;

        self.items = items || document.querySelectorAll(".item");
        //console.log("starts", this)
        // If param1 is set use that value, otherwise set it to an empty string
        //self.firstTags = Array.prototype.slice.call(firstTags);
        //self.secondTags = Array.prototype.slice.call(secondTags);

        self.validate().buildGrid().createAjaxContainer();
    }

    // Give access to all prototype properties
    WorkGrid.init.prototype = WorkGrid.prototype;
    // Pass AjaxScriptLoader to the global object;
    global.WorkGrid = WorkGrid;


    // Start WorkGrid
    WorkGrid(
        document.querySelectorAll(".item")
        );
    
        
}(window))