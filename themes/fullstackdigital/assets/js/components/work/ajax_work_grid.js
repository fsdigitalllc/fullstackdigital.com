// Since this is inject asynchronously, need to use DOMContentLoaded to initialize
;(function(global) {


    // Update this
    let items = document.querySelectorAll(".item");

  let itemHover = (e) => {
    let item = e.target.closest('.item');
    
    if (item) {
      let zIndex = parseInt(getComputedStyle(item).zIndex) + 1;
      if (e.type === "mouseenter") {
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

  // Scratch pad

 
  let limitSections = document.querySelectorAll('[data-limit]');

  limitSections.forEach( (section, i) => {
      let sectionItems = section.querySelectorAll(".item");
      let limit = parseFloat(section.getAttribute("data-limit"));

      if (sectionItems.length > limit) {
          let loadMoreDiv = document.createElement("div");
          loadMoreDiv.className = "btn_loadmore_container";
          loadMoreDiv.innerHTML = "<div class='btn_loadmore'><span class='m_1'>.</span><span class='m_2'>.</span><span class='m_3'>.</span></div>";
          section.appendChild(loadMoreDiv);

          let loadMoreItems = (e) => {
              
              let loadMoreIncrement = 3;
              let loadedMore = 0;
              sectionItems.forEach( (s, index) => {

                if (s.getAttribute("data-load") === "false") {
                    loadedMore++;

                    if (loadedMore < loadMoreIncrement) {
                        s.setAttribute("data-load", true);
                    }
                }

                if (s.getAttribute("data-load") === "true" && index === sectionItems.length -1) {
                    loadMoreDiv.parentNode.removeChild(loadMoreDiv)
                }
              });
          }

          loadMoreDiv.addEventListener("click", loadMoreItems, false);
      }

      sectionItems.forEach( (sectionItem, index) => {
          // start index from 1
          index++
          if (index <= limit) {
              sectionItem.setAttribute("data-load", true)
          } else {
              sectionItem.setAttribute("data-load", false)
          }
      });
      
  });


    // Get the items
    // Build the item objects
    // Get all images within the items
    // Add a loaded event listener to each image
    // Fire the event listener callback after the width/height is rendered
    // The callback should include reinitializing aos on that item to account for preloading
    let RevealAfterLoad = function (items) {
        return new RevealAfterLoad.init(items);
    }

    // Contains all of the items
    let itemArray = [];

    // Event handler for loading images
    let setImageLoaded = (index) => {
        itemArray[index].imagesLoaded = true;
        //console.log(itemArray)
        // loop through the list again
        itemArray.forEach( (a, f) => {

            let previous = f - 1;
            if (a.imagesLoaded === true && (previous >= 0 && itemArray[previous].imagesLoaded === true ) || f === 0) {
                console.log("nn", a)
                a.node.setAttribute("data-image-loaded", true);
            }
        })

        //console.log(itemArray[index]);
    }

    RevealAfterLoad.prototype = {
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
        loadItem: function(item) {
            
        },
        getItems: function() {

            this.items.forEach( (item, index) => {

                //this.loadItem(item);
                // Push an items object to the items array
                itemArray.push (
                    itemObject = {
                        index: index,
                        node: item,
                        images: item.querySelectorAll("img"),
                        imagesLoaded: false,
                        checkImages: function () {

                            let loaded = 0;
                            let total = this.images.length;
                            this.images.forEach( (img, i) => {

                                let imgLoaded = (e) => {
                                    loaded++;

                                    if (loaded === total) {
                                        setImageLoaded(this.index);
                                    }
                                }

                                img.addEventListener("load", imgLoaded, false);
                            });

                        },
                    }
                )

                // Get all images in the item and add an event listener

            });
            console.log(itemArray)
            return this;
        },
        loadInOrder: function () {
            itemArray.forEach( (item, i) => {

                item.checkImages();

            });
        },
    }

    RevealAfterLoad.init = function(items, options) {

        // Set default values
        var self = this;
        self.items = items;

        // If param1 is set use that value, otherwise set it to an empty string
        //self.firstTags = Array.prototype.slice.call(firstTags);
        //self.secondTags = Array.prototype.slice.call(secondTags);

        self.validate();
        self.getItems().loadInOrder();
    }

    // Give access to all prototype properties
    RevealAfterLoad.init.prototype = RevealAfterLoad.prototype;
    // Pass Panimate to the global object;
    global.RevealAfterLoad = RevealAfterLoad;

    RevealAfterLoad(
        document.querySelectorAll(".item")
    )
        
}(window))