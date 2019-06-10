// Alternative to DOMContentLoaded event
// document.onreadystatechange = function () {
//   if (document.readyState === 'interactive') {
//     ajaxGrid();
//     console.log("DOMContentLoaded... Starting Ajax Grid");
//   }
// }

// Using polyfill.io for polyfills
(() => {


// get all of the selectors we are working with.
let ajaxContainer = document.querySelector(".work-ajax");

// Spacer div that should remain in the dom. It checks the target link for header content and measures it's height
let heightSpacer = document.querySelector(".height-spacer");

// The div width we will match on the next page. In this case our container on the next page is slightly smaller
let widthSpacer = document.querySelector(".width-spacer");

// First wrapping parent of all grid items.
let grid = document.querySelector(".work-container");
let gridItems = document.querySelectorAll(".gridgrow");
let gridImages = Array.from(document.querySelectorAll(".gridgrow-image"));

let featured, startPageLink = window.location.pathname;

// from https://davidwalsh.name/detect-scrollbar-width
let getScrollbarWidth = () => {
  // Create the measurement node
  var scrollDiv = document.createElement("div");
  scrollDiv.className = "scrollbar-measure";
  scrollDiv.style.overflowY = "scroll",
  scrollDiv.innerHTML = `<div class="scrollbar-measure-inner"></div>`
  document.body.appendChild(scrollDiv);
  let scrollDivInner = document.querySelector(".scrollbar-measure-inner");
  // Get the scrollbar width
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDivInner.offsetWidth;
  //console.warn("scrollbarwidth:", scrollbarWidth); // Mac:  15

  // Delete the DIV 
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}
// Can also use this to check scrollbar width:
//let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
let scrollbarWidth = getScrollbarWidth();

if (grid.classList.contains("type-1")) {
  featured = true;
} else {
  featured = false;
}

// On click or if in viewport, populate a div with content that matches the target page.
let setHeightSpacerContent = (item) => {
  let logoImage = item.querySelector(".card-logo");
  let spacerLogo = heightSpacer.querySelector(".client_logo");
  let itemExcerpt = item.querySelector(".gridgrow-excerpt");
  let spacerTitle = heightSpacer.querySelector(".page-title");
  if (spacerLogo.src !== logoImage.src) {
    spacerLogo.src = logoImage.src;
  }
  if (spacerTitle.innerText !== itemExcerpt.innerText) {
    spacerTitle.innerText = itemExcerpt.innerText
  }
}

document.body.addEventListener("click", function(e){
  //console.log(ajaxRequest);
  item = e.target.closest(".gridgrow");
  if (item) {
    e.preventDefault();
    console.log("clicked grid item", item)
    
    setHeightSpacerContent(item);
    //console.log("clicked");
    clicked = true;
    reverse = false;
    //setItemStyles(item, clicked, reverse);
    
  }
  
  //animateClick(item, initialValue);
});

let getItem = (item) => {
  //console.log("item,", item)
  if (item.classList.contains("gridgrow")) {
    let the = {
      widthSpacer: document.querySelector(".width-spacer"),
      heightSpacer: document.querySelector(".height-spacer"),
      containerInner: document.querySelector(".work-container"),
      containerOuter: document.querySelector(".work-outer"),
      image: item.querySelector(".gridgrow-image"),
      imageWrapper: item.querySelector(".gridgrow-image-holder"),
      wipe: item.querySelector(".wipe")
    }
    return the;
  }
}
//console.log("getitem", getItem(document.querySelector(".gridgrow")).widthSpacer)

// Set image width, height, top, left
let createItem = (item) => {
  if (Util.isInViewport(item)) {
    setHeightSpacerContent(item);
  }
  setItemStyles(item)
  //setItemStyles(item)
  
  //console.table("item startValues:", );
}

let gridImagesLoaded = () => {
// just show loading indicator for the page untill the items finish.

//if there are filters, change the order images load in
let loadImages = (activeBtn) => {

  // If there are filters, check for the active panel, then lazy load those images first. Do not load other images until the tab is clicked.
  if (activeBtn.type === "click") {
    activeBtn = activeBtn.target;
    Util.loadingAnimation(true);
  } 
  if (activeBtn) {
    activeBtn = activeBtn.closest(`[data-filter]`).getAttribute("data-filter");
    //console.log("activeBtn", activeBtn)
    gridImages = Array.from(document.querySelectorAll(`[data-item-filter="${activeBtn}"] .gridgrow-image`));
    //console.log("activeBtn", gridImages.length)
  }
  let lazyImages = Array.from(document.querySelectorAll("img[data-src]"));
  let ignoreClasslist = Array.from(document.querySelectorAll(".gridgrow-image"));

  let images = lazyImages.diff(ignoreClasslist)
  
  gridImages = gridImages.concat(images);
  //console.log(gridImages)

  gridImages.forEach(function(image, imageLoaded = 0) {
    image.src = image.getAttribute("data-src");
    image.addEventListener('load', () => {
      // if (image.classList.contains("lazyloaded")) {
      //console.log(image);
      
      imageLoaded++;
      // Polyfill for closest needed
      let item = image.closest(".gridgrow");
      if (item) {
        item.classList.add("loaded");
        createItem(item)
      }
      //console.log("loaded ", image);
      if ( imageLoaded === gridImages.length ) {
        //console.log("length", gridImages.length)
        // True/false to start or stop loading icon animation
        //setTimeout(function(){Util.loadingAnimation(false);}, 51000);
        Util.loadingAnimation(false);
      }
    });
  });
}

  // If the page has a filter, load images that are in the active view and differ loading other images until the filter is pressed.
  let sortBtns = document.querySelectorAll("[data-filter]");
  if (sortBtns.length > 0) {
    sortBtns.forEach((btn) => {
      if (btn.classList.contains("active")) {
        loadImages(btn);
      }
      btn.addEventListener("click", loadImages, false);
    })
  } else {
    loadImages(false);
  }
}

gridImagesLoaded();

window.addEventListener("scroll", () => {
  gridItems.forEach((item) => {
    if (Util.isInViewport(item)) {
      // Do something...
      //console.log("in viewport");
      //console.log(item);
      setHeightSpacerContent(item);
    }
  })
});

window.addEventListener("resize", () => {
  gridItems.forEach((item) => {
    setItemStyles(item)
    //console.log("resizing");
  })
});

let calcImageRatio = (item) => {
  return item.image.naturalWidth / item.imageWrapper.offsetWidth;
}

function setItemStyles(item) {
  let theItem = getItem(item);
  let left = ((theItem.imageWrapper.offsetWidth - sVal(item).width) / 2 + "px");
  let top = ((theItem.imageWrapper.offsetHeight - sVal(item).height) / 2 + "px");
  theItem.image.style.left = left;
  theItem.image.style.top = top;
  //console.log("theitem", theItem.image)
  // Item offset
  if (!item.classList.contains("active")) {
    // Normal item
    theItem.image.style.width = sVal(item).width + "px";
    theItem.image.style.height = sVal(item).height + "px";
    //theItem.image.style.transform = `translateX(0px)`
  } else {
    // Animated grid item
    theItem.image.style.width = eVal(item).width + "px";
    theItem.image.style.height = (eVal(item).height) + "px";
    theItem.image.style.transform = `translateX(${eVal(item).offsetX - sVal(item).offsetX}px)`
  }
  
}

function eVal (item) {
  let theItem = getItem(item);
  let eVal = {
    height: (
      (theItem.widthSpacer.offsetWidth 
      - parseFloat(getComputedStyle(theItem.widthSpacer).paddingLeft) 
      - parseFloat(getComputedStyle(theItem.widthSpacer).paddingRight))
      / sVal(item).width
      * sVal(item).height
      ),
    width: (
      theItem.widthSpacer.offsetWidth 
      - parseFloat(getComputedStyle(theItem.widthSpacer).paddingLeft) 
      - parseFloat(getComputedStyle(theItem.widthSpacer).paddingRight)
      ),
    offsetX: 
    // Get each image to the edge of screen
    theItem.widthSpacer.offsetLeft
    + parseFloat(getComputedStyle(theItem.widthSpacer).paddingLeft),
    //+ ( (theItem.widthSpacer.offsetWidth - parseFloat(getComputedStyle(theItem.widthSpacer).paddingLeft)) / 2 ),
    // End Values
    offsetY:
      window.scrollY + theItem.heightSpacer.offsetHeight,
  }
  return eVal;
}


function sVal (item) {
  let theItem = getItem(item);
  let sVal = {
    //width: theItem.image.offsetWidth,
    height: (theItem.image.naturalHeight / (calcImageRatio(theItem))) * (parseFloat(theItem.image.getAttribute("width")) / 100 ),
    width: (theItem.image.naturalWidth / (calcImageRatio(theItem))) * (parseFloat(theItem.image.getAttribute("width")) / 100 ),
    //width: theItem.imageWrapper.offsetWidth * (parseFloat(theItem.image.getAttribute("width")) / 100 ),
    offsetX: 
      // Get each image to the edge of screen
      item.offsetLeft 
      + theItem.image.offsetLeft 
      + parseFloat(getComputedStyle(theItem.imageWrapper).marginLeft)
      + parseFloat(theItem.containerInner.offsetLeft)
      - parseFloat(getComputedStyle(theItem.containerInner).paddingLeft)
      + theItem.containerOuter.offsetLeft
      - parseFloat(getComputedStyle(theItem.containerOuter).paddingLeft),
    offsetY:
      item.offsetTop
      + theItem.image.offsetTop 
      + theItem.containerInner.offsetTop
      + theItem.containerOuter.offsetTop
      // 531
      // End Values
  }
  return sVal;
}

document.querySelector(".template-related_work").addEventListener("click", () => {
  gridItems.forEach((item) => {
    //animateItem(item, false)
    //console.log("item click", item)
    animateItem(item, false);
  })
})
document.querySelector("nav").addEventListener("click", () => {
  gridItems.forEach((item) => {
    //animateItem(item, false)
    //console.log("item click", item)
    animateItem(item, true);
  })
})

function animateItem(item, direction) {
  
  let theItem = getItem(item);
  //console.log("itemddf", theItem.image)
  let startVal = sVal(item);
  let endVal = eVal(item);
  let startTranslateX = 0, endTranslateX = endVal.offsetX - startVal.offsetX, startTranslateY = 0, endTranslateY = endVal.offsetY - startVal.offsetY;
  

  if (direction !== true) {
    //Forward
    item.classList.add("active");
    
  } else {
    startVal = eVal(item);
    endVal = sVal(item);
    startTranslateX = endTranslateX, endTranslateX = 0, startTranslateY = endTranslateY, endTranslateY = 0;
    item.classList.remove("active");
  }
  console.log("startval", startVal, "endval", endVal, theItem)

  theItem.image.velocity({
    height: [endVal.height, startVal.height],
    width: [endVal.width, startVal.width],
    transform: [`translateX(${endTranslateX}px) translateY(${endTranslateY}px)`, `translateX(${startTranslateX}px) translateY(${startTranslateY}px)`]
  }, {
    delay: 0,
    easing: "ease-out",
    duration: 475,
    progress: function(elements, complete, remaining, start, tweenValue) {
      if (complete ===  1) {
        console.log("complete")
      }
    }
  })
}


// if (clicked && reverse === false) {
//   document.querySelector("html").style.marginLeft = "-" + (scrollbarWidth/2) + "px";
//   document.querySelector("html").classList.add("pageAnimating", "loading");

//   document.querySelector(".masthead").style.width = `calc(100% + ${(scrollbarWidth/2 + "px")})`;
//   document.querySelector(".masthead").style.paddingRight = `${(scrollbarWidth/2 + "px")}`;
//   main.style.marginLeft = "-" + (scrollbarWidth/2) + "px";
//   document.body.style.overflowY = "hidden";
//   bodyScrollLock.disableBodyScroll(document.body);
// }
//calcEnd(item, initialValue, clicked, reverse);

// function calcEnd(item, initialValue, clicked, reverse) {


//   if (clicked) {
//     animateItem(item, initialValue, endValue, reverse);
//   }
  
//   if (item.classList.contains("active") && !clicked ) {
//     itemImage.style.width = endValue.item.width + "px";
//     itemImage.style.height = endValue.item.height + "px";
//     itemImage.style.transform = `translateX(${endValue.item.translateX}px) translateY(${endValue.item.translateY}px)`;
//   }
// }

  function velocityAnimate(item, initialValue, startValue, endValue, reverse) {

    wipe.velocity({
      width: [endValue.wipe.width, startValue.wipe.width],
      height: [endValue.wipe.height, startValue.wipe.height],
      transform: [`translateX(${endValue.wipe.translateX}px) translateY(${endValue.wipe.translateY}px)`, `translateX(${startValue.wipe.translateX}px) translateY(${startValue.wipe.translateY}px)`],
      //transform: [endValue.scale, startValue.scale],
      left: [endValue.wipe.left, startValue.wipe.left],
      top: [endValue.wipe.top, startValue.wipe.top],
    }, 
    {
      delay: startValue.wipe.delay,
      duration: startValue.wipe.duration,
      easing: startValue.wipe.easing,
      /* Velocity's default options */
    });

    itemImage
    .velocity({
      transform: [`translateX(${endValue.item.translateX}px) translateY(${endValue.item.translateY}px)`, `translateX(${startValue.item.translateX}px) translateY(${startValue.item.translateY}px)`],
      //left: [`-${itemOffsetLeft}px`, `${itemOffsetLeft}px`],
      //top: [endValue.item.top, startValue.item.top],
      bottom: [endValue.item.bottom, startValue.item.bottom],
      "background-position-y": [endValue.item.backgroundPositionY, startValue.item.backgroundPositionY],
      width: [endValue.item.width, startValue.item.width],
      height: [endValue.item.height, startValue.item.height]
    }, 
    {
      duration: startValue.item.duration,
      delay: startValue.item.delay,
      easing: startValue.item.easing,
      queue: "",
      loop: false,
      mobileHA: true,
      /* Velocity's default options */
      progress: function(elements, complete, remaining, start, tweenValue) {
        //console.log(complete);
        if (complete === 1) {
          if (reverse) {
            item.style.overflow = "";
            item.querySelector(".gridwrap").style.overflow = "";
            item.querySelector(".gridgrow-image-holder").style.overflow = "";
            document.querySelector("html").style.marginLeft = "";
            document.querySelector("main").style.marginLeft = "";
            document.querySelector(".masthead").style = "";
            document.querySelector("html").classList.remove("pageAnimating", "loading");
            document.body.style.overflowY = "scroll";
            bodyScrollLock.enableBodyScroll(document.body);
            //item.addEventListener("click");
            itemImage.style.zIndex = "";
            wipe.style.zIndex = "";
            item.querySelector(".gridgrow-image").velocity({
              visibility: ["visible", "hidden"],
            }, {
              delay: 0,
              duration: 0,
            });
          } else {
            item.classList.add("active");
            item.querySelector(".gridgrow-image").velocity({
              visibility: ["hidden", "visible"],
            }, {
              delay: 600,
              duration: 100,
              complete: function() {
                //ajaxContainer.style.overflowY = "scroll";
              }
            });
            ajaxContainer.style.overflowY = "scroll";
            reverseAnimation(item, initialValue, startValue, endValue);
          }
        }
      }
    });
  }

function reverseAnimation(item, initialValue, startValue, endValue) {
  let reverseBtn = document.createElement("button");
  reverseBtn.classList.add("reverseAnimation");
  reverseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="32px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
    <line x1="64" y1="64" x2="0" y2="0" stroke="#fff" stroke-width="4"></line>
    <line x1="64" y1="0" x2="0" y2="64" stroke="#fff" stroke-width="4"></line>
    </svg>`;

  //reverseBtn.appendChild(t);
  document.body.appendChild(reverseBtn);
  //detect back btn then hijack it
  window.onpopstate = function(event) {
    window.history.pushState("object or string", "Title", window.location);
    reverseClick();
  }

  function reverseClick(e) {
    reverse = true;
    windowScrollY = 0;
    let element = document.querySelector(".reverseAnimation");
    element.parentNode.removeChild(element);
    clicked = true;
    //ajaxContainer.scrollTop = 0;
    ajaxContainer.velocity({scrollTop: "0px"}, {
      duration: 300,
      delay: 0,
      complete: function() {
        setItemStyles(item, initialValue, endValue, reverse, clicked);
        //console.log(initialValue);
        //console.log(endValue);
        //console.log("REVERSE COMPLETE");
      }
    });
  }
  reverseBtn.addEventListener("click", reverseClick, false);      
}

function ajaxWorkItem (item, initialValue, endValue, reverse) {
  let pageCritical = document.querySelector(".page_critical_css");
  //console.log(pageCritical);
  if (reverse) {
    //add back logo for animation
    document.querySelector("html").classList.add("loading");

    ajaxContainer
    .velocity({
      opacity: 0,
      visibility: ["hidden", "visible"]
    }, {
      duration: 400,
    })
    .velocity({
      display: "none",
    }, {
      duration: 0,
      complete: function() {
          //console.log("REVERSE COMPLETE");
          item.classList.remove("active");
        }
    });
    ajaxContainer.innerHTML = "";
    window.history.pushState("object or string", "Title", startPageLink);

  } else {
    let nextLink = item.querySelector("a").getAttribute("href");    
    //https://stackoverflow.com/questions/36631762/returning-html-with-fetch
    // AJAX CALL
    fetch(nextLink /*, options */)
    .then((response) => response.text())
    .then((html) => {
      let parser = new DOMParser();

      // Parse the text
      var doc = parser.parseFromString(html, "text/html");
      var docArticle = doc.querySelector('main').innerHTML;
      //var pbCritical = doc.querySelector('.pb_criticalCSS').innerHTML;
      ajaxContainer.innerHTML = docArticle;
      //pageCritical.innerHTML = pageCritical.innerHTML + pbCritical;
      //console.log(pageCritical);
      window.history.pushState("object or string", "Title", nextLink);
      // just using this for testing. Need to trigger aos after page content loads. Need the CSS from this page to be called.
      
      //reload scripts that are in innerHTML https://ghinda.net/article/script-tags/
      runScripts(ajaxContainer, nextLink);
      redoAos(ajaxContainer)
            
    })
    .catch((error) => {
        console.warn(error);
    });
    ajaxContainer
    .velocity({
      top: [initialValue.navHeight, 0],
      display: ["block", "none"]
    })
    .velocity({
      opacity: [1, 0],
      visibility: ["visible", "hidden"]
    }, {
      delay: 400,
      duration: 400,
      complete: function() {
      document.querySelector("html").classList.remove("loading");
        //console.log("REVERSE COMPLETE");
      }
    });
  }
}

function insertScript (script, callback) {
  //console.log(script);
  var s = document.createElement('script')
  s.type = 'text/javascript'
  if (script.src) {
    s.onload = callback
    s.onerror = callback
    s.src = script.src
  } else {
    s.textContent = script.innerText
  }
  // re-insert the script tag so it executes.
  widthSpacer.appendChild(s)
  // clean-up
  script.parentNode.removeChild(script)
  // run the callback immediately for inline scripts
  if (!script.src) {
    callback()
  }
}
  
// trigger DOMContentLoaded
function scriptsDone () {
  var DOMContentLoadedEvent = document.createEvent('Event')
  DOMContentLoadedEvent.initEvent('DOMContentLoaded', true, true)
  document.dispatchEvent(DOMContentLoadedEvent)
}
  
  // runs an array of async functions in sequential order
function seq (arr, callback, index) {
  // first call, without an index
  if (typeof index === 'undefined') {
    index = 0
  }

  arr[index](function () {
    index++
    if (index === arr.length) {
      callback()
    } else {
      seq(arr, callback, index)
    }
  })
}

// https://html.spec.whatwg.org/multipage/scripting.html
var runScriptTypes = [
  'application/javascript',
  'application/ecmascript',
  'application/x-ecmascript',
  'application/x-javascript',
  'text/ecmascript',
  'text/javascript',
  'text/javascript1.0',
  'text/javascript1.1',
  'text/javascript1.2',
  'text/javascript1.3',
  'text/javascript1.4',
  'text/javascript1.5',
  'text/jscript',
  'text/livescript',
  'text/x-ecmascript',
  'text/x-javascript'
]

function runScripts (container, nextLink) {
  //console.log(container);
  //console.log("run SCRIPTS ---");
  // get scripts tags from a node
  var scripts = container.querySelectorAll('script');
  var images = container.querySelectorAll('img');
  var runList = [];
  var typeAttr;

    images.forEach(image => {
      
      //image.src = nextLink + image.src;
      let path = image.getAttribute("src");

      if (!new RegExp("^(?:/|.+://)").test(path)) {
        //console.log(path);
        path = nextLink + path;
        image.setAttribute("src", path);
      }
    });

    var allSections = ajaxContainer.querySelectorAll('section');
    allSections.forEach(section => {
      let m = (window.getComputedStyle(section).getPropertyValue("background-image")).replace(/^url\(["']?/, '').replace(/["']?\)$/, ''); 

      if (m === "none") {
          //console.log(`background image url`);
          //console.log(m);
          m = "";
      } else {
          let newLink = window.location.origin + startPageLink;
          m = getComputedStyle(document.querySelector("#section-1")).getPropertyValue("background-image").replace(/^url\(["']?/, '').replace('url(','').replace(')','').replace('\"','');
          m = m.replace(newLink, '', /["']?\)$/, '')
          m = window.location.origin + nextLink + m;
          console.log(`${m}`);
          //section.style.backgroundImage = "background-image: url(" + m + ")";
          section.style.backgroundImage = "url('" + m + "')";
      }
    });

    [].forEach.call(scripts, function (script) {
      //console.log(script);
    typeAttr = script.getAttribute('type');
    // only run script tags without the type attribute
    // or with a javascript mime attribute value
    if (!typeAttr || runScriptTypes.indexOf(typeAttr) !== -1) {
      runList.push(function (callback) {
        
        insertScript(script, callback)
      })
    }
  })
  // insert the script tags sequentially
  // to preserve execution order
  seq(runList, scriptsDone);
}

function redoAos(container) {
// Find the item we want to animate on scroll
let target = container.querySelector('[data-aos]');
var targetActiveClass = 'aos-animate';
let elements = container.querySelectorAll('[data-aos]');
// Call this function when it enters/leaves the viewport
var callback = function(entries, observer) { 
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(targetActiveClass);
    } else {
      entry.target.classList.remove(targetActiveClass);
    }
  });
};

// Create our observer
var observer = new IntersectionObserver(callback, {threshold: 0});
  elements.forEach(element => {
    observer.observe(element);
  });
}
})();