// Alternative to DOMContentLoaded event
// document.onreadystatechange = function () {
//   if (document.readyState === 'interactive') {
//     ajaxGrid();
//     console.log("DOMContentLoaded... Starting Ajax Grid");
//   }
// }

(() => {


// get all of the selectors we are working with.
let gridImages = document.querySelectorAll(".gridgrow-image");
let workAjax = document.querySelector(".work-ajax");
let heightSpacer = document.querySelector(".height-spacer");
let gridContainer = document.querySelector(".container");
let container = document.querySelector(".spacer");
let grid = document.querySelector(".work-container");
let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
let mobileScrollbar;
let featured;
let startPageLink = window.location.pathname;

if (scrollbarWidth === 0) {
  //console.log("no scrollbarwidth");
  mobileScrollbar = 20;
} else {
  mobileScrollbar = 0;
}

if (grid.classList.contains("row-1")) {
  featured = true;
} else {
  featured = false;
}
let targetElement = document.querySelector("body");

gridImageSize();

function gridImageSize(){

// FIX THIS BEHAVIOR: 
// If grid image is expanded and window resized, the expanded image resizes. The initial values should resize, but not the currently active image.

let gridgrowWidth;
//BEN NOTE:
// get count of all images
// compare the count of all images to images loaded
// run the next function when all loaded
// just show loading indicator for the page untill the items finish.

//console.log(gridImageCount);
//console.log("count of images: " + gridImages.length);
gridImages.forEach(function(image, imageLoaded = 0) {
  // console.log(image);
  // console.log("loaded " + image);
  image.addEventListener('load', () => {
    // if (image.classList.contains("lazyloaded")) {
      //console.log(image);
      imageLoaded++;
      let item = image.parentElement.parentElement.parentElement;
      let link = item.querySelector("a");
      item.classList.add("loaded");

      // resize the image as it loads
      //setImageSize(image, item);
      //console.log("resizing");
      //animateGrid();
      clicked = false;
      reverse = false;
      
      calcStart(item, clicked, reverse);

      if ( imageLoaded === gridImages.length ) {
        //console.log("remove html class");
        document.querySelector("html").classList.remove("pageTransition");
        document.querySelector("body").classList.remove("loading");
        AOS.init({
          offset: 0,
          once: true,
          delay: 0, // values from 0 to 3000, with step 50ms
          duration: 400, // values from 0 to 3000, with step 50ms
        });
        // console.log("----- All Images Loaded Image Loaded.... run animate grid ");
        // document.querySelector("body").classList.remove("loading");
        //console.log(imageLoaded);
        // Grid can be animated now since all initial values are set
        //animateGrid();
      } else {
        //console.log(`Not all images loaded yet -----${gridImages.length - imageLoaded} left to load.`);
      }
    // }
    
      window.addEventListener("resize", function(){
      //console.log(ajaxRequest);
        //setImageSize(image, item);
        //console.log("resizing FORWARD");
        //animateGrid();
        clicked = false;
        reverse = false;
        calcStart(item, clicked, reverse);
      });
    window.addEventListener("scroll", function(){
       itemViewport(item);
    });
    
    function heightSpacerContent(item){
      let logoImage = item.querySelector(".card-logo");
      let spacerLogo = heightSpacer.querySelector(".client_logo");
      let itemExcerpt = item.querySelector(".gridgrow-excerpt");
      let spacerTitle = heightSpacer.querySelector(".page-title");
      spacerLogo.src = logoImage.src;
      spacerTitle.innerText = itemExcerpt.innerText;
    }
    
    function itemViewport(item){
      var isInViewport = function (elem) {
      var bounding = elem.getBoundingClientRect();
      return (
          bounding.top >= 0 &&
          bounding.left >= 0 &&
          bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
      };

      if (isInViewport(item)) {
          // Do something...
          //console.log("in viewport");
          //console.log(item);
          heightSpacerContent(item);
      }
    }

    item.addEventListener("click", function(e){
    //console.log(ajaxRequest);
    item = e.currentTarget;
    
    heightSpacerContent(item);
    //console.log("clicked");
    e.preventDefault();
    

    clicked = true;
    reverse = false;
    let imageHeight;
    let imageWidth;
    
      calcStart(item, clicked, reverse);
      //animateClick(item, initialValue);
    });

    //maybe animate the bottom half of the item on hover
    // item.addEventListener("mouseover", () => {
    //   item.velocity({
    //     "overflow": "visible"
    //   }, {
    //     delay: 0,
    //   });
    // });
  });

  
});
}

let pageUrl = window.location;

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
    let containerPadding = parseFloat(getComputedStyle(container).paddingLeft) + parseFloat(getComputedStyle(container).paddingRight);
    let containerWidth = parseFloat(container.offsetWidth) - containerPadding;
    //console.log("containerWidth: " + containerWidth);
    
    let imgTop = 355;

    let navHeight = document.querySelector(".masthead").offsetHeight;
    let initialValue = {
        containerOffsetLeft: container.offsetLeft + parseFloat(getComputedStyle(container).paddingLeft),
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        windowScrollX: window.scrollX,
        windowScrollY: window.scrollY,
        scrollbarWidth: scrollbarWidth,
        mobileScrollbar: parseFloat(mobileScrollbar),
        navHeight: document.querySelector(".masthead").offsetHeight,
        gridContainerPadding: parseFloat(getComputedStyle(gridContainer).paddingLeft)+ parseFloat(getComputedStyle(gridContainer).paddingRight),
        containerPadding: parseFloat(getComputedStyle(container).paddingLeft) + parseFloat(getComputedStyle(container).paddingRight),
        containerWidth: parseFloat(container.offsetWidth) - containerPadding,
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
        bodyScrollLock.disableBodyScroll(targetElement);
      }
      calcEnd(item, initialValue, clicked, reverse);
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
  let containerPadding = parseFloat(getComputedStyle(container).paddingLeft) + parseFloat(getComputedStyle(container).paddingRight);
  let containerWidth = parseFloat(container.offsetWidth) - containerPadding;
  let translateX, wipeTranslateX;
  if (featured) {
    //console.log("left: " + (-initialValue.item.left - initialValue.item.offsetLeft + initialValue.containerOffsetLeft));
    
    translateX = ((-initialValue.item.left - initialValue.item.offsetLeft + initialValue.containerOffsetLeft));
    
    wipeTranslateX = (initialValue.scrollbarWidth/2);

  } else {
    translateX = (-initialValue.item.left - initialValue.gridContainerOffsetLeft) + (initialValue.wrapperMarginLeft - item.offsetLeft) + container.offsetLeft + initialValue.containerPaddingLeft - (initialValue.scrollbarWidth/2);
    wipeTranslateX = -(item.offsetLeft + item.offsetParent.offsetLeft) - initialValue.windowScrollX + initialValue.scrollbarWidth;
  }

    //console.log("containerWidth: " + containerWidth);
// the final velocity values. To reverse animation, 

  let endValue = {
    containerOffsetLeft: container.offsetLeft,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    windowScrollX: window.scrollX,
    windowScrollY: window.scrollY,
    scrollbarWidth: parseFloat(scrollbarWidth),
    mobileScrollbar: parseFloat(mobileScrollbar),
    navHeight: document.querySelector(".masthead").offsetHeight,
    gridContainerPadding: parseFloat(getComputedStyle(gridContainer).paddingLeft)+ parseFloat(getComputedStyle(gridContainer).paddingRight),
    containerPadding: parseFloat(getComputedStyle(container).paddingLeft) + parseFloat(getComputedStyle(container).paddingRight),
    containerWidth: parseFloat(container.offsetWidth) - containerPadding,
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
        left: initialValue.mobileScrollbar,
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
            bodyScrollLock.enableBodyScroll(targetElement);
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
                //workAjax.style.overflowY = "scroll";
              }
            });
            workAjax.style.overflowY = "scroll";
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
    window.history.pushState("object or string", "Title", pageUrl);
    reverseClick();
  }

  function reverseClick(e) {
    reverse = true;
    windowScrollY = 0;
    let element = document.querySelector(".reverseAnimation");
    element.parentNode.removeChild(element);
    clicked = true;
    //workAjax.scrollTop = 0;
    workAjax.velocity({scrollTop: "0px"}, {
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

    workAjax
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
    workAjax.innerHTML = "";
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
      workAjax.innerHTML = docArticle;
      //pageCritical.innerHTML = pageCritical.innerHTML + pbCritical;
      //console.log(pageCritical);
      window.history.pushState("object or string", "Title", nextLink);
      // just using this for testing. Need to trigger aos after page content loads. Need the CSS from this page to be called.
      
      //reload scripts that are in innerHTML https://ghinda.net/article/script-tags/
      runScripts(workAjax, nextLink);
      redoAos(workAjax)
            
    })
    .catch((error) => {
        console.warn(error);
    });
    workAjax
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
  container.appendChild(s)
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

    var allSections = workAjax.querySelectorAll('section');
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