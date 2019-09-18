//console.log("Tabs loaded----------");
let filterBtns = document.querySelectorAll('[data-filter]');
let filterItems = document.querySelectorAll('[data-item-filter]');
  filterBtns.forEach(function(button, index) {

    let buttonAttr = button.getAttribute("data-filter");
    // console.log("buttonAttr");
    // console.log(buttonAttr);
    
    button.addEventListener("click", function(){
      sortItems(button, buttonAttr);
    });

    if (button.classList.contains("active")) {
      sortItems(button, buttonAttr);
    }
  });
  
  function sortItems(button, buttonAttr) {
    //console.log("sorting " + button.innerText);

    filterItems.forEach(function(filterItem, index) {
      
      let absWidth;
      if (filterItem.classList.contains("loaded") ) {
        absWidth = filterItem.offsetWidth;
        //console.log(absWidth);
      }
      let filterItemAttr = filterItem.getAttribute("data-item-filter");
      
      if (buttonAttr === filterItemAttr) {
        filterItem.style.width = "";
        filterItem.style.visibility = "visible";
        filterItem.style.position = "";
        filterItem.querySelector(".gridgrow-image").style.zIndex = "";
      } else {
        filterItem.style.width = 525 + "px";
        filterItem.style.visibility = "hidden";
        filterItem.style.position = "absolute";
        filterItem.querySelector(".gridgrow-image").style.zIndex = -1;
      }
      
    });

  }