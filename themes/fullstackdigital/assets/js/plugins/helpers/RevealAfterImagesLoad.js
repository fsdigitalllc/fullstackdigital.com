;(function(global) {
    //console.log("reveal images FUNCTION START")
    // Get the items
    // Build the item objects
    // Get all images within the items
    // Add a loaded event listener to each image
    // Fire the event listener callback after the width/height is rendered
    // The callback should include reinitializing aos on that item to account for preloading
    let RevealAfterImagesLoad = function (items) {
        return new RevealAfterImagesLoad.init(items);
    }

    // Contains all of the items
    let itemArray = [];
    let loadArray = [];
    
    // Event handler for loading images
    let setImageLoaded = (index) => {
        itemArray[index].imagesLoaded = true;
        //console.log(itemArray)
        // loop through the list again
        itemArray.forEach( (item, f) => {

            // get the index of the previous 
            let previous = f - 1;
            if (previous < 0) {
                previous = 0;
            }

            if (item.imagesLoaded === true && ((previous >= 0 && itemArray[previous].imagesLoaded === true ) || f === 0 )) {
                item.node.setAttribute("data-image-loaded", true);
            }
        })

        //console.log(itemArray[index]);
    }

    RevealAfterImagesLoad.prototype = {
        validate: function() {

            var errorMessage;

            if (!this.items) {
                errorMessage = "no items defined";
            }

            if (errorMessage) {
                throw errorMessage;
            }

            return this;
        },
        loadInOrder: function () {
            this.items.forEach( (item, index) => {
                let itemImages = item.querySelectorAll("img");
                let loaded = 0;

                //console.log("que", this.items.length, this.items)
                itemImages.forEach( (img, i) => {
                    let setLoaded = () => {
                        loaded++

                        //console.log("image", img, loaded, itemImages.length)

                        if (loaded === itemImages.length) {
                            item.closest(".item").setAttribute("data-image-loaded", true);
                            img.setAttribute("data-image-loaded", true);
                        }
                    }

                    // Check if an image is loaded, then start the callback
                    img.addEventListener("load", setLoaded, false);
                    
                    // If the image loads before the event is attached, use this fallback method
                    if (img.height > 0) {
                        setLoaded();
                    }
                })
            })
            itemArray.forEach( (item, i) => {

                item.checkImages();

            });
        },
    }

    RevealAfterImagesLoad.init = function(items, options) {

        // Set default values
        var self = this;
        self.items = items;
        console.log("reveal images FUNCTION START")
        // If param1 is set use that value, otherwise set it to an empty string
        //self.firstTags = Array.prototype.slice.call(firstTags);
        //self.secondTags = Array.prototype.slice.call(secondTags);

        self.validate();
        self.loadInOrder();
        //self.getItems().loadInOrder();
    }

    // Give access to all prototype properties
    RevealAfterImagesLoad.init.prototype = RevealAfterImagesLoad.prototype;
    // Pass Panimate to the global object;
    global.RevealAfterImagesLoad = RevealAfterImagesLoad;

}(window))
