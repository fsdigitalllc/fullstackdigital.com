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

// Outer grid wrapper. Has padding.
let gridContainer = document.querySelector(".container");

// First wrapping parent of all grid items.
let grid = document.querySelector(".work-container");

let gridItems = document.querySelectorAll(".gridgrow");
let gridImages = Array.from(document.querySelectorAll(".gridgrow-image"));

let mobileScrollbar, featured, startPageLink = window.location.pathname;

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
  console.warn("scrollbarwidth:", scrollbarWidth); // Mac:  15

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

// Check if an item is in the browser view. Useful for featured grid and mobile.
let isInViewport = (elem) => {
let bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

let createItem = (item) => {
  item.classList.add("loaded");
  if (isInViewport(item)) {
    setHeightSpacerContent(item);
  }
  item.addEventListener("click", function(e){
    //console.log(ajaxRequest);
    item = e.currentTarget;
    setHeightSpacerContent(item);
    //console.log("clicked");
    e.preventDefault();
    
    clicked = true;
    reverse = false;

    calcStart(item, clicked, reverse);
    //animateClick(item, initialValue);
  });
  
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
    console.log("activeBtn", activeBtn)
    gridImages = Array.from(document.querySelectorAll(`[data-item-filter="${activeBtn}"] .gridgrow-image`));
    console.log("activeBtn", gridImages.length)
  }
  let lazyImages = Array.from(document.querySelectorAll("img[data-src]"));
  let ignoreClasslist = Array.from(document.querySelectorAll(".gridgrow-image"));

  let images = lazyImages.diff(ignoreClasslist)
  
  gridImages = gridImages.concat(images);
  console.log(gridImages)

  gridImages.forEach(function(image, imageLoaded = 0) {
    image.src = image.getAttribute("data-src");
    image.addEventListener('load', () => {
      // if (image.classList.contains("lazyloaded")) {
      //console.log(image);
      
      imageLoaded++;
      // Polyfill for closest needed
      let item = image.closest(".gridgrow");
      if (item) {
        createItem(item)
      }
      console.log("loaded ", image);
      if ( imageLoaded === gridImages.length ) {
        console.log("length", gridImages.length)
        // True/false to start or stop loading icon animation
        //setTimeout(function(){Util.loadingAnimation(false);}, 51000);
        Util.loadingAnimation(false);
      }
    });
  });
}
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
    if (isInViewport(item)) {
      // Do something...
      //console.log("in viewport");
      //console.log(item);
      setHeightSpacerContent(item);
    }
  })
});


function calcStart(item, clicked, reverse) {

  let image = item.querySelector(".gridgrow-image");
  let imageWrapper = image.parentNode;
  let wrapperMargin = parseFloat(getComputedStyle(imageWrapper).marginTop);
  let wipe = item.querySelector(".wipe");
  let wipeParent = item.querySelector(".gridgrow-image-holder");
  let ratio = image.naturalHeight / imageWrapper.offsetHeight, imageHeight, imageWidth, wipeWidth, wipeHeight;

  if (featured) {
  wipeWidth = item.offsetWidth;
  wipeHeight = item.offsetHeight;

  imageHeight = (image.naturalHeight / ratio) * 1;
  imageWidth = (image.naturalWidth / ratio) * 1;

  if (clicked === false) {
    image.style.left = (imageWrapper.offsetWidth - imageWidth) / 2 + "px";
  }

  if (imageWidth > imageWrapper.offsetWidth) {
    imageHeight = (image.naturalHeight / ratio) * .9;
    imageWidth = (image.naturalWidth / ratio) * .9;
  }
  if (image.classList.contains("ddn")) {
    imageHeight = (image.naturalHeight / ratio) * 1.2;
    imageWidth = (image.naturalWidth / ratio) * 1.2;
  } else if (image.classList.contains("rigado")) {
    imageHeight = (image.naturalHeight / ratio) * 1.2;
    imageWidth = (image.naturalWidth / ratio) * 1.2;
    image.style.left = -50 + "px";
  }
  if (window.innerWidth <= 768) {
    imageHeight = (image.naturalHeight / ratio) * .9;
    imageWidth = (image.naturalWidth / ratio) * .9;
    image.style.left = (item.offsetWidth / 2) - + (imageWidth / 2) + "px";
    image.style.top = 20 + "px";
  }

  image.style.right = 0;
  ratio = image.naturalWidth / imageWrapper.offsetWidth;

  if (clicked === false) {
    image.style.height = imageHeight + "px";
    image.style.width = imageWidth + "px";
  }
  
  } else {
    wipeWidth = item.querySelector(".gridgrow-image-holder").offsetWidth;
    wipeHeight = item.querySelector(".gridgrow-image-holder").offsetHeight;
    imageHeight = (image.naturalHeight / ratio) * .7;
    imageWidth = (image.naturalWidth / ratio) * .7;

    if (imageWidth > imageWrapper.offsetWidth) {
      imageHeight = (image.naturalHeight / ratio) * .6;
      imageWidth = (image.naturalWidth / ratio) * .6;
    }

    if (clicked === false) {
      image.style.left = (imageWrapper.offsetWidth - imageWidth) / 2 + "px";
    }
    
    if (!item.classList.contains("active")) {
      //console.log(imageWrapper.offsetHeight);
      //console.log(gridgrowWidth);
      image.style.top = (imageWrapper.offsetHeight - wrapperMargin - imageHeight) / 2 + "px";
      image.style.height = imageHeight + "px";
      image.style.width = imageWidth + "px";
      //console.log("height: " + imageHeight);
    }
  }

  let loadedValues = {
    image: {
      height: imageHeight,
      width: imageWidth,
    },
    wipe: {
      height: wipeHeight,
      width: wipeWidth,
    }
  }
    // I need to grab some starting values ON CLICK
    // Needs to be on click because some positions are based on the scroll offset
    let gridgrowWidth = item.offsetWidth;
    
    //console.log("RESIZING");
    
    let itemImage = item.querySelector(".gridgrow-image");
    let main = document.querySelector("main");
    // 4. Useful if we have called disableBodyScroll for multiple target elements,
    // and we just want a kill-switch to undo all that.
    //bodyScrollLock.clearAllBodyScrollLocks();
    
    //console.log("itemImage");
    //console.log(itemImage);
    let gridContainerPadding = parseFloat(getComputedStyle(gridContainer).paddingLeft)+ parseFloat(getComputedStyle(gridContainer).paddingRight);
    let containerPadding = parseFloat(getComputedStyle(widthSpacer).paddingLeft) + parseFloat(getComputedStyle(widthSpacer).paddingRight);
    let containerWidth = parseFloat(widthSpacer.offsetWidth) - containerPadding;
    //console.log("containerWidth: " + containerWidth);
    
    let imgTop = 355;

    let initialValue = {
        containerOffsetLeft: widthSpacer.offsetLeft + parseFloat(getComputedStyle(widthSpacer).paddingLeft),
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        windowScrollX: window.scrollX,
        windowScrollY: window.scrollY,
        scrollbarWidth: scrollbarWidth,
        navHeight: document.querySelector(".masthead").offsetHeight,
        gridContainerPadding: parseFloat(getComputedStyle(gridContainer).paddingLeft)+ parseFloat(getComputedStyle(gridContainer).paddingRight),
        containerPadding: parseFloat(getComputedStyle(widthSpacer).paddingLeft) + parseFloat(getComputedStyle(widthSpacer).paddingRight),
        containerWidth: parseFloat(widthSpacer.offsetWidth) - containerPadding,
        wrapperMarginTop: parseFloat(getComputedStyle(wipeParent).marginTop),
        wrapperMarginLeft: -(parseFloat(getComputedStyle(wipeParent).marginLeft)),
        containerPaddingLeft: containerPadding / 2,
        gridContainerPaddingLeft: gridContainerPadding / 2,
        gridContainerOffsetLeft: gridContainer.offsetLeft,
        heightSpacerHeight: heightSpacer.offsetHeight,
        wipe: {
          width: loadedValues.wipe.width,
          height: loadedValues.wipe.height,
          translateX: "0px",
          translateY: "0px",
          left: "0.1px",
          top: "0.1px",
          duration: 100,
          delay: 0,
          easing: "swing",
          z: wipe.style.zIndex,
        },
        item: {
          width: loadedValues.image.width,
          height: loadedValues.image.height,
          translateX: "0px",
          translateY: "0px",
          offsetLeft: wipeParent.offsetLeft,
          left: parseFloat(itemImage.style.left),
          top: itemImage.offsetTop,
          backgroundPositionY: "60%",
          duration: 600,
          delay: 0,
          easing: "swing",
          z: itemImage.style.zIndex,
        },
        content: {
          top: 0,
          imgTop: imgTop,
        }
      }
        
      if (clicked && reverse === false) {
        document.querySelector("html").style.marginLeft = "-" + (scrollbarWidth/2) + "px";
        document.querySelector("html").classList.add("pageAnimating", "loading");

        document.querySelector(".masthead").style.width = `calc(100% + ${(scrollbarWidth/2 + "px")})`;
        document.querySelector(".masthead").style.paddingRight = `${(scrollbarWidth/2 + "px")}`;
        main.style.marginLeft = "-" + (scrollbarWidth/2) + "px";
        document.body.style.overflowY = "hidden";
        bodyScrollLock.disableBodyScroll(document.body);
      }
      //calcEnd(item, initialValue, clicked, reverse);
};

function calcEnd(item, initialValue, clicked, reverse) {


  wipe = item.querySelector(".wipe");
  itemImage = item.querySelector(".gridgrow-image");
  let gridgrowWidth = item.offsetWidth;
    
  //console.log("RESIZING");
  
  let wipeParent = item.querySelector(".gridgrow-image-holder");

  // 4. Useful if we have called disableBodyScroll for multiple target elements,
  // and we just want a kill-switch to undo all that.
  //bodyScrollLock.clearAllBodyScrollLocks();
  let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  //console.log("itemImage");
  //console.log(itemImage);
  let gridContainerPadding = parseFloat(getComputedStyle(gridContainer).paddingLeft)+ parseFloat(getComputedStyle(gridContainer).paddingRight);
  let containerPadding = parseFloat(getComputedStyle(widthSpacer).paddingLeft) + parseFloat(getComputedStyle(widthSpacer).paddingRight);
  let containerWidth = parseFloat(widthSpacer.offsetWidth) - containerPadding;
  let translateX, wipeTranslateX;
  if (featured) {
    //console.log("left: " + (-initialValue.item.left - initialValue.item.offsetLeft + initialValue.containerOffsetLeft));
    
    translateX = ((-initialValue.item.left - initialValue.item.offsetLeft + initialValue.containerOffsetLeft));
    
    wipeTranslateX = (initialValue.scrollbarWidth/2);

  } else {
    translateX = (-initialValue.item.left - initialValue.gridContainerOffsetLeft) + (initialValue.wrapperMarginLeft - item.offsetLeft) + widthSpacer.offsetLeft + initialValue.containerPaddingLeft - (initialValue.scrollbarWidth/2);
    wipeTranslateX = -(item.offsetLeft + item.offsetParent.offsetLeft) - initialValue.windowScrollX + initialValue.scrollbarWidth;
  }

    //console.log("containerWidth: " + containerWidth);
// the final velocity values. To reverse animation, 

  let endValue = {
    containerOffsetLeft: widthSpacer.offsetLeft,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    windowScrollX: window.scrollX,
    windowScrollY: window.scrollY,
    scrollbarWidth: parseFloat(scrollbarWidth),
    navHeight: document.querySelector(".masthead").offsetHeight,
    gridContainerPadding: parseFloat(getComputedStyle(gridContainer).paddingLeft)+ parseFloat(getComputedStyle(gridContainer).paddingRight),
    containerPadding: parseFloat(getComputedStyle(widthSpacer).paddingLeft) + parseFloat(getComputedStyle(widthSpacer).paddingRight),
    containerWidth: parseFloat(widthSpacer.offsetWidth) - containerPadding,
    wrapperMarginTop: parseFloat(getComputedStyle(wipeParent).marginTop),
    wrapperMarginLeft: -(parseFloat(getComputedStyle(wipeParent).marginLeft)),
    containerPaddingLeft: containerPadding / 2,
    gridContainerPaddingLeft: gridContainerPadding / 2,
    gridContainerOffsetLeft: gridContainer.offsetLeft,
    heightSpacerHeight: heightSpacer.offsetHeight,
    wipe: {
        width: initialValue.windowWidth + initialValue.scrollbarWidth,
        height: (initialValue.windowHeight) + (initialValue.windowWidth * .2),
        translateX: wipeTranslateX,
        translateY: -((item.offsetTop + grid.offsetParent.offsetTop + initialValue.wrapperMarginTop) - initialValue.windowScrollY - initialValue.navHeight),
        left: initialValue.scrollbarWidth,
        top: "0px",
        duration: 600,
        delay: 0,
        easing: "swing",
        z: 888
      },
      item: {
        width: initialValue.item.width * (initialValue.containerWidth / initialValue.item.width),
        height: initialValue.item.height * (initialValue.containerWidth / initialValue.item.width),        
        translateX: translateX,
        translateY: -((item.offsetTop + itemImage.offsetTop + grid.offsetParent.offsetTop + initialValue.wrapperMarginTop) - initialValue.windowScrollY - initialValue.navHeight - initialValue.heightSpacerHeight),
        offsetLeft: wipeParent.offsetLeft,
        left: initialValue.item.left,
        top: "0px",
        duration: 600,
        delay: 50,
        easing: "swing",
        z: 999
      },
      content: {
        top: 0,
        imgTop: initialValue.content.imgTop,
      }
  }

  if (clicked) {
    animateItem(item, initialValue, endValue, reverse);
  }
  
  if (item.classList.contains("active") && !clicked ) {
    itemImage.style.width = endValue.item.width + "px";
    itemImage.style.height = endValue.item.height + "px";
    itemImage.style.transform = `translateX(${endValue.item.translateX}px) translateY(${endValue.item.translateY}px)`;
  }
}

function animateItem(item, initialValue, endValue, reverse) {

  itemImage = item.querySelector(".gridgrow-image");
  let startValue;

  if (reverse) {
    startValue = endValue;
    endValue = initialValue;
    //wipe.zIndex = 888;
    itemImage.style.visibility = "visible";

  } else {
    startValue = initialValue;
    endValue = endValue;
    itemImage.style.zIndex = 999;
    wipe.style.zIndex = 888;
    item.style.overflow = "visible";
    item.querySelector(".gridwrap").style.overflow = "visible";
    item.querySelector(".gridgrow-image-holder").style.overflow = "visible";

  }
  // Start ajax loading the content
  ajaxWorkItem(item, initialValue, endValue, reverse);
  // Start animation
  velocityAnimate(item, initialValue, startValue, endValue, reverse);
}
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

function setFinalValues(item, initialValue, startValue, endValue) {
  if (item.classList.contains("active")) {
    //console.log("setting final values...");
    itemImage = item.querySelector(".gridgrow-image");
    //console.log(itemImage);
    itemImage.style.width = endValue.item.width;
    itemImage.style.height = endValue.item.height;
  }
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
        calcStart(item, initialValue, endValue, reverse, clicked);
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