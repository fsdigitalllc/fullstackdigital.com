(function (){

// get all of the selectors we are working with.
let ajaxContainerCreate = document.createElement("DIV");
ajaxContainerCreate.className = "work-ajax";
document.querySelector("body").appendChild(ajaxContainerCreate);''
//ocument.querySelector("main").innerHTML = document.querySelector("main").innerHTML + `<div class="work-ajax"></div>`;
var ajaxContainer = document.querySelector(".work-ajax");

// Spacer div that should remain in the dom. It checks the target link for header content and measures it's height
var heightSpacer = document.querySelector(".height-spacer");

// The div width we will match on the next page. In this case our container on the next page is slightly smaller
var widthSpacer = document.querySelector(".width-spacer");

// First wrapping parent of all grid items.
var grid = document.querySelector(".work-container");
var gridItems = document.querySelectorAll(".gridgrow");
var gridImages = Array.from(document.querySelectorAll(".gridgrow-image"));

// from https://davidwalsh.name/detect-scrollbar-width
// var getScrollbarWidth = () => {
//   // Create the measurement node
//   var scrollDiv = document.createElement("div");
//   scrollDiv.className = "scrollbar-measure";
//   scrollDiv.style.overflowY = "scroll",
//   scrollDiv.innerHTML = `<div class="scrollbar-measure-inner"></div>`
//   document.body.appendChild(scrollDiv);
//   var scrollDivInner = document.querySelector(".scrollbar-measure-inner");
//   // Get the scrollbar width
//   var scrollbarWidth = scrollDiv.offsetWidth - scrollDivInner.offsetWidth;
//   //console.warn("scrollbarwidth:", scrollbarWidth); // Mac:  15

//   // Devare the DIV 
//   document.body.removeChild(scrollDiv);
//   return scrollbarWidth;
// }
// Can also use this to check scrollbar width:
var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
//var scrollbarWidth = getScrollbarWidth();
console.log("scrollbarwidth", scrollbarWidth)
if (grid.classList.contains("type-1")) {
  featured = true;
} else {
  featured = false;
}

// On click or if in viewport, populate a div with content that matches the target page.
var setHeightSpacerContent = (item) => {
  var logoImage = item.querySelector(".card-logo");
  var spacerLogo = heightSpacer.querySelector(".client_logo");
  var itemExcerpt = item.querySelector(".gridgrow-excerpt");
  var spacerTitle = heightSpacer.querySelector(".page-title");
  if (spacerLogo.src !== logoImage.src) {
    spacerLogo.src = logoImage.src;
  }
  if (spacerTitle.innerText !== itemExcerpt.innerText) {
    spacerTitle.innerText = itemExcerpt.innerText
  }
}
document.body.addEventListener("mouseover", function(e){
  //console.log(ajaxRequest);
  item = e.target.closest(".gridgrow");
  if (item) {
    e.preventDefault();
    setHeightSpacerContent(item);
  }
});

document.body.addEventListener("click", function(e){
  //console.log(ajaxRequest);
  item = e.target.closest(".gridgrow");
  if (item) {
    e.preventDefault();    
    setHeightSpacerContent(item);
    animateItem(item, false);
    //console.log("clicked");
    //setItemStyles(item, clicked, reverse);
    
  }
  
  //animateClick(item, initialValue);
});

var getItem = (item) => {
  //console.log("item,", item)
  if (item.classList.contains("gridgrow")) {
    var the = {
      widthSpacer: document.querySelector(".width-spacer"),
      heightSpacer: document.querySelector(".height-spacer"),
      containerInner: document.querySelector(".work-container"),
      containerOuter: document.querySelector(".work-outer"),
      cardFooter: item.querySelector(".card-footer"),
      image: item.querySelector(".gridgrow-image"),
      imageWrapper: item.querySelector(".gridgrow-image-holder"),
      wipe: item.querySelector(".wipe"),
      link: item.querySelector(".gridgrow-link"),
      nav: document.querySelector(".masthead")
    }
    return the;
  }
}
//console.log("getitem", getItem(document.querySelector(".gridgrow")).widthSpacer)

// Set image width, height, top, left
var createItem = (item) => {
  if (Util.isInViewport(item)) {
    setHeightSpacerContent(item);
  }
  setItemStyles(item)
  //setItemStyles(item)
  
  //console.table("item startValues:", );
}

var gridImagesLoaded = () => {
// just show loading indicator for the page untill the items finish.

//if there are filters, change the order images load in
var loadImages = (activeBtn) => {

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
  var lazyImages = Array.from(document.querySelectorAll("img[data-src]"));
  var ignoreClasslist = Array.from(document.querySelectorAll(".gridgrow-image"));
  console.log("ignoreclasslist", ignoreClasslist)
  var images = lazyImages.diff(ignoreClasslist)
  
  gridImages = gridImages.concat(images);
  //console.log(gridImages)

  gridImages.forEach(function(image, imageLoaded = 0) {
    image.src = image.getAttribute("data-src");
    image.addEventListener('load', () => {
      // if (image.classList.contains("lazyloaded")) {
      //console.log(image);
      
      imageLoaded++;
      // Polyfill for closest needed
      var item = image.closest(".gridgrow");
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
  var sortBtns = document.querySelectorAll("[data-filter]");
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

var calcImageRatio = (item) => {
  return item.image.naturalWidth / item.imageWrapper.offsetWidth;
}

function setItemStyles(item) {
  var theItem = getItem(item);
  var left = ((theItem.imageWrapper.offsetWidth - sVal(item).width) / 2 + "px");
  var top = ((theItem.imageWrapper.offsetHeight - parseFloat(getComputedStyle(theItem.imageWrapper).marginTop) - sVal(item).height) / 2 + "px");
  theItem.image.style.left = left;
  theItem.image.style.top = top;
  theItem.wipe.style.left = 0;
  theItem.wipe.style.top = 0;
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
  var theItem = getItem(item);
  var eVal = {
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
      theItem.heightSpacer.offsetHeight,
    bg: {
      width: window.innerWidth,
      height: window.innerHeight,
      x: -(item.offsetLeft + theItem.containerInner.offsetLeft + theItem.containerOuter.offsetLeft - parseFloat(getComputedStyle(theItem.containerOuter).paddingLeft) - scrollbarWidth + parseFloat(getComputedStyle(theItem.imageWrapper).marginLeft)),
      y: (theItem.nav.offsetHeight - (item.offsetTop + theItem.containerInner.offsetTop + theItem.containerOuter.offsetTop)) + window.scrollY,
    },
    content: {
      opacity: 1,
      visibility: "visible",
      top: theItem.nav.offsetHeight,
    }
  }
  return eVal;
}


function sVal (item) {
  var theItem = getItem(item);
  var sVal = {
    //width: theItem.image.offsetWidth,
    height: (theItem.image.naturalHeight / (calcImageRatio(theItem))) * (parseFloat(theItem.image.getAttribute("width")) / 100 ),
    width: (theItem.image.naturalWidth / (calcImageRatio(theItem))) * (parseFloat(theItem.image.getAttribute("width")) / 100 ),
    //width: theItem.imageWrapper.offsetWidth * (parseFloat(theItem.image.getAttribute("width")) / 100 ),
    offsetX: 
      // Get each image to the edge of screen
      theItem.image.parentNode.getBoundingClientRect().x
      + parseFloat(theItem.image.style.left),
    offsetY:
      theItem.image.parentNode.getBoundingClientRect().y 
      + parseFloat(theItem.image.style.top)
      // This is a negative value
      //+ parseFloat(getComputedStyle(document.querySelector(".gridgrow-image-holder")).marginTop) 
      - parseFloat(getComputedStyle(document.querySelector(".gridwrap")).marginTop) 
      - theItem.nav.offsetHeight,
      // item.offsetTop
      // + theItem.image.offsetTop 
      // + theItem.containerInner.offsetTop
      // + theItem.containerOuter.offsetTop,
      //- parseFloat(getComputedStyle(theItem.heightSpacer).paddingBottom),
    bg: {
      width: theItem.wipe.parentNode.offsetWidth,
      height: theItem.wipe.parentNode.offsetHeight,
      x: 0.1,
      y: 0.1
    },
    content: {
      opacity: 0,
      visibility: "hidden",
      top: theItem.nav.offsetHeight,
    }
      // 531
      // End Values
  }
  
  return sVal;
}

function animateItem(item, direction) {
  
  var theItem = getItem(item);
  //console.log("itemddf", theItem.image)
  var startVal = sVal(item);
  var endVal = eVal(item);
  var startTranslateX = 0, endTranslateX = endVal.offsetX - startVal.offsetX, startTranslateY = 0, endTranslateY = endVal.offsetY - startVal.offsetY, timing = 475;
  var bgTime = timing;
  // Load content via ajax
  ajaxLoad(item, direction);
  if (direction !== true) {
    //Forward
    item.classList.add("active");

    // Offset the scrollbar on animating
    document.querySelector("html").style.marginLeft = "-" + (scrollbarWidth/2) + "px";
    document.querySelector("main").style.marginLeft = "-" + (scrollbarWidth/2) + "px";
    
    //lock scrolling ability
    document.body.style.overflowY = "hidden";
    bodyScrollLock.disableBodyScroll(document.body);

    // Start logo loading animation
    Util.loadingAnimation(true);
    bgTime = bgTime - 200;
    theItem.cardFooter.classList.add("gridgrow-fade-out");
    animateGridgrow();
    
  } else {
    startVal = eVal(item);
    endVal = sVal(item);
    startTranslateX = endTranslateX, endTranslateX = 0, startTranslateY = endTranslateY, endTranslateY = 0;
    // Start logo loading animation
    Util.loadingAnimation(true);
    timing = timing + 200;
    bgTime = timing;
    let velocityTime = (ajaxContainer.scrollTop * 0.1);
    if (velocityTime < 200) {
      velocityTime = 200;
    }

    ajaxContainer.velocity({
      scrollTop: 0,
    }, {
      delay: 0,
      easing: "ease-out",
      duration: velocityTime,
      progress: function(elements, complete, remaining, start, tweenValue) {
        if (complete ===  1) {
          animateGridgrow();
        }
      }
    })
    .velocity({
      opacity: [endVal.content.opacity, startVal.content.opacity],
      visibility: [endVal.content.visibility, startVal.content.visibility],
      display: ["block", "none"],
      top: [endVal.content.top, startVal.content.top],
    }, {
      delay: 0,
      easing: "ease-out",
      duration: 200
    })
  }
  //console.log("startval", startVal, "endval", endVal)
  
  function animateGridgrow () {
    theItem.wipe.velocity({
      width: [endVal.bg.width, startVal.bg.width],
      height: [endVal.bg.height, startVal.bg.height],
      transform: [`translateX(${endVal.bg.x}px) translateY(${endVal.bg.y}px)`, `translateX(${startVal.bg.x}px) translateY(${startVal.bg.y}px)`]
    }, {
      delay: 0,
      easing: "ease-out",
      duration: bgTime,
    })
    theItem.image.velocity({
      height: [endVal.height, startVal.height],
      width: [endVal.width, startVal.width],
      transform: [`translateX(${endTranslateX}px) translateY(${endTranslateY}px)`, `translateX(${startTranslateX}px) translateY(${startTranslateY}px)`]
    }, {
      delay: 0,
      easing: "ease-out",
      duration: timing,
      progress: function(elements, complete, remaining, start, tweenValue) {
        if (complete > 0.5 && direction !== false) {
          theItem.cardFooter.classList.remove("gridgrow-fade-out");
          theItem.cardFooter.classList.add("gridgrow-fade-in");
        }
        if (complete ===  1) {
          transitionComplete(item, direction, startVal, endVal);
        }
      }
    })
  }
  
}

function transitionComplete (item, direction, startVal, endVal) {
  
  Util.loadingAnimation(false);
  if (direction !== true) {
    ajaxContainer.velocity({
      opacity: [endVal.content.opacity, startVal.content.opacity],
      visibility: [endVal.content.visibility, startVal.content.visibility],
      display: ["block", "none"],
      top: [endVal.content.top, startVal.content.top],
    }, {
      delay: 0,
      easing: "ease-out",
      duration: 200
    })
    var reverseBtn = document.createElement("button");
    reverseBtn.classList.add("reverseAnimation");
    reverseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="32px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
      <line x1="64" y1="64" x2="0" y2="0" stroke="#fff" stroke-width="4"></line>
      <line x1="64" y1="0" x2="0" y2="64" stroke="#fff" stroke-width="4"></line>
      </svg>`;

      reverseBtn.addEventListener('click', (e) => {
        reverseBtn.parentNode.removeChild(reverseBtn)
        triggerReverse(item);
      });
      
    document.body.appendChild(reverseBtn);
    ajaxContainer.style.overflowY = "scroll"
  } else {
    item.classList.remove("active");
    document.querySelector("html").style.marginLeft = "";
    document.querySelector("main").style.marginLeft = "";
    document.body.style.overflowY = "scroll";
    bodyScrollLock.enableBodyScroll(document.body);
  }
  
}

var updateContent = function(stateObj) {
  // Check to make sure that this state object is not null.
  if (stateObj) {
    document.title = stateObj.title;
    document.querySelector("title").innerText = stateObj.title;
    ajaxContainer.innerHTML = stateObj.html;
  }
};

function triggerReverse (item) {
  //animateItem(item, true);
  history.back();
}

function ajaxLoad (item, direction) {
  var theItem = getItem(item);
  
  if (direction !== true) {
    fetch(theItem.link /*, options */)
    .then((response) => response.text())
    .then((html) => {
      var parser = new DOMParser();
      // Parse the text
      var ajaxHtml = parser.parseFromString(html, "text/html");
      var ajaxContent = ajaxHtml.querySelector('main').innerHTML;
      //var pbCritical = doc.querySelector('.pb_criticalCSS').innerHTML;
      //pageCritical.innerHTML = pageCritical.innerHTML + pbCritical;
      //console.log(pageCritical);
      var pageData = {
        title: ajaxHtml.querySelector('title').innerText,
        html: ajaxContent
      }
      updateContent (pageData)
      runScripts(ajaxContainer, theItem.link);
      redoAos(ajaxContainer);
      
      //window.history.pushState(pageData, pageData.title, theItem.link);
      //console.log("html loaded")

      
    var title = ajaxHtml.querySelector('title').innerText;
    var data = null;
    var link = theItem.link;
    //history.replaceState(data, title, link);
    Util.pushHistory(data, title, link);

    window.onpopstate = function(event) {
      if (event.state) {
        updateContent(event.state)
      }
        animateItem(item, true);
    }
    
    }).then(() => {
      return true;
    });
  } else {
    
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
      var path = image.getAttribute("src");

      if (!new RegExp("^(?:/|.+://)").test(path)) {
        //console.log(path);
        path = nextLink + path;
        image.setAttribute("src", path);
      }
    });

    var allSections = ajaxContainer.querySelectorAll('section');
    allSections.forEach(section => {
      var m = (window.getComputedStyle(section).getPropertyValue("background-image")).replace(/^url\(["']?/, '').replace(/["']?\)$/, ''); 

      if (m === "none") {
          //console.log(`background image url`);
          //console.log(m);
          m = "";
      } else {
          var newLink = window.location.origin + window.location.pathname;
          m = getComputedStyle(document.querySelector("#section-1")).getPropertyValue("background-image").replace(/^url\(["']?/, '').replace('url(','').replace(')','').replace('\"','');
          m = m.replace(newLink, '', /["']?\)$/, '')
          m = nextLink + m;
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
var target = container.querySelector('[data-aos]');
var targetActiveClass = 'aos-animate';
var elements = container.querySelectorAll('[data-aos]');
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