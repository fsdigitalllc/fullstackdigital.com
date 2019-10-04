( function () {


let items = document.querySelectorAll(".gridgrow")


let filter = {
  key: "data-item-featured",
  value: "true",
};

let sort = {
  key: "",
  value: "",  
};


function updateQuery() {
  return Postquery(items).getItems(filter, sort);
}
console.log(
  updateQuery()
  );



// Clicking filter buttons:
// Buttons are active by default
// If the user clicks a button, we should make that the only active button because we are assuming they only want to see that one result
// In this case, turn the click button grey, and unselct the other buttons (they turn to color)
//console.log("Tabs loaded----------");
let filterBtns = document.querySelectorAll('[data-filter]');
let filterItems = document.querySelectorAll('[data-item-filter]');
let activeBtns = [];

  filterBtns.forEach(function(button, index) {

    if (button.classList.contains("active")) {
      activeBtns.push(button.getAttribute("data-filter"));
    }
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

  setQueryString(activeBtns)

  function setQueryString (queryStrings) {
    let hrefWithoutSlash = window.location.href.replace(/\/$/, "");
    let queryPath = "?";
    
    queryStrings.forEach(q => {
      queryPath += q;
    });

    
    if (window.history.state) {
      window.history.state.url = hrefWithoutSlash + queryPath;
      window.history.replaceState(window.history.state, window.history.state.title, window.history.state.url)
    }

  }
  
  function sortItems(button, buttonAttr) {
    //console.log("sorting " + button.innerText);

    filterItems.forEach(function(filterItem, index) {
      
      let absWidth;
      if (filterItem.classList.contains("loaded") ) {
        absWidth = filterItem.offsetWidth;
        //console.log(absWidth);
      }
      let filterItemAttr = filterItem.getAttribute("data-item-filter");
      
        filterItem.style.width = "";
        filterItem.style.visibility = "visible";
        filterItem.style.position = "";
        filterItem.querySelector(".gridgrow-image").style.zIndex = "";
        
      
    });

  }
}());
