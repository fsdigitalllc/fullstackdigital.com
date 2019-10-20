// Since this is inject asynchronously, need to use DOMContentLoaded to initialize
;(function(global) {
    document.addEventListener("DOMContentLoaded", function () {
        console.log("work -contentloaded ++")
        ajax_work_grid();
    }, false);

    
    function ajax_work_grid () {

        // Change the z-index of a hovered grid item so that it overlaps the item below
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


        // Append a load more button to work items
        // Reveal more items on click

        LoadMoreItems(document.querySelectorAll(".item"));

        // Display an item only when the images have loaded
        // The order should be sequentual
        RevealAfterImagesLoad(document.querySelectorAll(".item"));

        // Animate items with 60fps
        //Velocity();
    }
    
        
}(window))