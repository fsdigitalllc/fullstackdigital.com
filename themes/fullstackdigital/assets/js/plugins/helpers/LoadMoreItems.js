;(function(global) {
    // Get the items
    // Build the item objects
    // Get all images within the items
    // Add a loaded event listener to each image
    // Fire the event listener callback after the width/height is rendered
    // The callback should include reinitializing aos on that item to account for preloading
    let LoadMoreItems = function (items) {
        return new LoadMoreItems.init(items);
    }

    // Update this


// Scratch pad

// Refactor this so that it's based on if the initial items have actually loaded
// The condition should check if the first items within the initial limit have data-images-loaded="true"
// If the limit is smaller than the total items in that array, 
let limitSections = document.querySelectorAll('[data-limit]');

limitSections.forEach( (section, i) => {
    let sectionItems = section.querySelectorAll(".item");
    let limit = parseFloat(section.getAttribute("data-limit"));

    if (sectionItems.length > limit && limit !== 0) {
        let loadMoreDiv = document.createElement("div");
        loadMoreDiv.className = "btn_loadmore_container";
        loadMoreDiv.innerHTML = "<div class='btn_loadmore'><span class='m_1'>.</span><span class='m_2'>.</span><span class='m_3'>.</span></div>";
        section.appendChild(loadMoreDiv);

        let loadMoreItems = () => {
            
          // Updated loadmore increment to be based on the follow items
          // 1 if 
          let loadMoreIncrement = 3;
          let loadedMore = 0;
          sectionItems.forEach( (s, index) => {

          if (s.getAttribute("data-load") === "false") {
              loadedMore++;

              if (loadedMore < loadMoreIncrement) {
                  s.setAttribute("data-load", "true");
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
        if (index <= limit || limit === 0) {
            sectionItem.setAttribute("data-load", "true")
        } else {
            sectionItem.setAttribute("data-load", "false");

          // Display the load-more btn by adding a class to the wrapping div
          if (!section.classList.contains("load-more")) {
              section.classList.add("load-more");
          }

        }
    });
    
});

    LoadMoreItems.prototype = {
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
    }

    LoadMoreItems.init = function(items, options) {

        // Set default values
        var self = this;
        self.items = items;

        // If param1 is set use that value, otherwise set it to an empty string
        //self.firstTags = Array.prototype.slice.call(firstTags);
        //self.secondTags = Array.prototype.slice.call(secondTags);

        self.validate();
        //self.getItems().loadInOrder();
    }

    // Give access to all prototype properties
    LoadMoreItems.init.prototype = LoadMoreItems.prototype;
    // Pass Panimate to the global object;
    global.LoadMoreItems = LoadMoreItems;

}(window))
