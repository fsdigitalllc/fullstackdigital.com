if (!Util) {

function Util () {};

Array.prototype.diff = function(arr2) {
  var ret = [];
  this.sort();
  arr2.sort();
  for(var i = 0; i < this.length; i += 1) {
      if(arr2.indexOf(this[i]) === -1){
          ret.push(this[i]);
      }
  }
  return ret;
};

Util.imagesLoaded = () => {
  let lazyImages = Array.from(document.querySelectorAll("img[data-src]"));
  let ignoreClasslist = Array.from(document.querySelectorAll(".gridgrow-image"));
  
  let images = lazyImages.diff(ignoreClasslist)
  //console.log("image length", lazyImages)
  if (lazyImages.length > 0) {
    
    images.forEach(function (image, imageLoaded = 0) {
      
      image.classList.add("lazyload", "lazypreload");
      image.addEventListener("load", () => {
        imageLoaded++;
        //console.log("loaded...", image)
        if (images.length === imageLoaded) {
          //console.log("all images loaded")
          if (ignoreClasslist.length > 0) {
            // For now, if there is an ignoreclasslist, another function will probably stop the animation. so don't stop it here.
          } else {
            Util.loadingAnimation(false);
          }
          
        } 
      })
    });
  } else {
    Util.loadingAnimation(false);
  }
  // check if an element exists in array using a comparer function
  // comparer : function(currentElement)
  //console.log(images)

    // Add lazyload class to images that are added via content editor, since it's difficult to modify that markup
    
}
Util.loadingAnimation = (direction = true) => {
  //console.log("loading..direction:", direction)
  if (direction === false) {
    setTimeout(function(){
      document.querySelector("html").classList.remove("pageTransition", "loading");
      //document.body.classList.remove("loading");
      AOS.init({
        offset: 0,
        once: true,
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
      });
    }, 1000)
    
  } if (direction === true) {
    document.querySelector("html").classList.add("loading");
    Util.imagesLoaded();
    //document.body.classList.add("loading");
  }
}


// Check if an item is in the browser view. Useful for featured grid and mobile.
Util.isInViewport = (elem) => {
let bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

Util.pushHistory = (data, title, location) => {
  console.log("push history", data, title, location)
// Create a state object for the content to be toggled via ajax
  window.history.pushState(data, title, location);
};

(() => {
  Util.loadingAnimation();
  
  //add simple support for background images:
  document.addEventListener('lazybeforeunveil', function(e){
      var bg = e.target.getAttribute('data-bg');
      if(bg){
          e.target.style.backgroundImage = 'url(' + bg + ')';
      }
  });

  window.addEventListener("load", () => {
    console.log("first load");
    let title = document.querySelector('title').innerText;
    let data = null;
    let link = window.location;
    Util.pushHistory(data, title, link);
  });
  //Update page content based on the current state object
  //updateContent (pageData)
  //Add the home or work page to the state object
  
  
  window.onpopstate = function(event) {
    console.log("popstate")
    if (event.state) {
      console.log("event title", event.state)
      //updateContent(event.state)
    }
      //animateItem(item, true);
  }
})();
}