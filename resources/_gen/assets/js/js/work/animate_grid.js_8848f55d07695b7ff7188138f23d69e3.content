(function (){

// get all of the selectors we are working with.
let ajaxContainerCreate = document.createElement("DIV");
ajaxContainerCreate.className = "work-ajax";
ajaxContainerCreate.setAttribute("loaded", false);
document.querySelector("body").appendChild(ajaxContainerCreate);
//ocument.querySelector("main").innerHTML = document.querySelector("main").innerHTML + `<div class="work-ajax"></div>`;
let ajaxContainer = document.querySelector(".work-ajax");

let ajaxLoadEvent = new Event('ajaxLoaded');

// Spacer div that should remain in the dom. It checks the target link for header content and measures it's height
let heightSpacer = document.querySelector(".height-spacer");

// The div width we will match on the next page. In this case our container on the next page is slightly smaller
let widthSpacer = document.querySelector(".width-spacer");

// First wrapping parent of all grid items.
let grid = document.querySelector(".work-container");
let gridItems = document.querySelectorAll(".gridgrow");
let gridImages = Array.from(document.querySelectorAll(".gridgrow-image"));

// from https://davidwalsh.name/detect-scrollbar-width
// let getScrollbarWidth = () => {
//   // Create the measurement node
//   let scrollDiv = document.createElement("div");
//   scrollDiv.className = "scrollbar-measure";
//   scrollDiv.style.overflowY = "scroll",
//   scrollDiv.innerHTML = `<div class="scrollbar-measure-inner"></div>`
//   document.body.appendChild(scrollDiv);
//   let scrollDivInner = document.querySelector(".scrollbar-measure-inner");
//   // Get the scrollbar width
//   let scrollbarWidth = scrollDiv.offsetWidth - scrollDivInner.offsetWidth;
//   //console.warn("scrollbarwidth:", scrollbarWidth); // Mac:  15

//   // Devare the DIV 
//   document.body.removeChild(scrollDiv);
//   return scrollbarWidth;
// }
// Can also use this to check scrollbar width:
let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
//let scrollbarWidth = getScrollbarWidth();
//console.log("scrollbarwidth", scrollbarWidth)
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
    spacerTitle.innerText = itemExcerpt.innerText;
  }
};

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

let getItem = (item) => {
  //console.log("item,", item)
  if (item.classList.contains("gridgrow")) {
    let the = {
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
  console.log("ignoreclasslist", ignoreClasslist)
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

  // Mobile tweaks
  let calcTop = 0;
  let calcLeft = 0;

  if (theItem.image.getAttribute("m-top") && window.innerWidth < 720) {
    calcTop = (parseFloat(theItem.image.getAttribute("m-top")) / 100);
    calcLeft = (parseFloat(theItem.image.getAttribute("m-left")) / 100);
  } else if (theItem.image.getAttribute("top")) {
    calcTop = (parseFloat(theItem.image.getAttribute("top")) / 100)
    calcLeft = (parseFloat(theItem.image.getAttribute("left")) / 100);
  }
  
  let left = ((
    theItem.imageWrapper.offsetWidth 
    - sVal(item).width) / 2 
    + theItem.image.parentNode.offsetWidth * calcLeft
    + "px");
  let top = ((
    theItem.imageWrapper.offsetHeight 
    - parseFloat(getComputedStyle(theItem.imageWrapper).marginTop) 
    - sVal(item).height) / 2 
    + theItem.image.parentNode.offsetHeight * calcTop
    + "px");
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
      display: "block"
    }
  }
  return eVal;
}


function sVal (item) {
  let theItem = getItem(item);

  let calcWidth = (parseFloat(theItem.image.getAttribute("width")) / 100 );
  if (window.innerWidth < 720) {
    calcWidth = (parseFloat(theItem.image.getAttribute("m-width")) / 100 );
  }
  let sVal = {
    //width: theItem.image.offsetWidth,
    height: (theItem.image.naturalHeight / (calcImageRatio(theItem))) * calcWidth,
    width: (theItem.image.naturalWidth / (calcImageRatio(theItem))) * calcWidth,
    //width: theItem.imageWrapper.offsetWidth * (parseFloat(theItem.image.getAttribute("width")) / 100 ),
    offsetX: 
      // Get each image to the edge of screen
      theItem.image.parentNode.getBoundingClientRect().x
      + parseFloat(theItem.image.style.left),
    offsetY:
      theItem.image.parentNode.getBoundingClientRect().y 
      + parseFloat(theItem.image.style.top)
      - parseFloat(getComputedStyle(document.querySelector(".gridwrap")).marginTop) 
      - theItem.nav.offsetHeight,
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
      display: "none"
    }
      // 531
      // End Values
  }
  
  return sVal;
}

function animateItem(item, direction) {
  
  let theItem = getItem(item);
  //console.log("itemddf", theItem.image)
  let startVal = sVal(item);
  let endVal = eVal(item);
  let startTranslateX = 0, endTranslateX = endVal.offsetX - startVal.offsetX, startTranslateY = 0, endTranslateY = endVal.offsetY - startVal.offsetY, timing = 475;
  let bgTime = timing;
  // Load content via ajax
  
  if (direction === false) {
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
    animateGridgrow(item, direction);
    
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
          animateGridgrow(item, direction);
        }
      }
    })
    .velocity({
      opacity: [endVal.content.opacity, startVal.content.opacity],
      visibility: [endVal.content.visibility, startVal.content.visibility],
      display: [endVal.content.display, startVal.content.display],
      top: [endVal.content.top, startVal.content.top],
    }, {
      delay: 0,
      easing: "ease-out",
      duration: 200
    })
  }
  //console.log("startval", startVal, "endval", endVal)
  
  function animateGridgrow (item, direction) {
    
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
        
        if (complete > 0.5 && direction === true) {
          theItem.cardFooter.classList.remove("gridgrow-fade-out");
          theItem.cardFooter.classList.add("gridgrow-fade-in");
          ajaxContainer.innerHTML = "";
        } 
        
        if (complete ===  1 && direction === true) {
          transitionComplete(item, direction, startVal, endVal);
          item.classList.remove("active");
        }

      }
    })
    let ajaxLoadedCallback = () => {
      console.log("ajaxloaded");
        transitionComplete(item, direction, startVal, endVal);
      
    }
    document.addEventListener("ajaxLoaded", ajaxLoadedCallback, false);
    ajaxLoad(item, direction);
  }
  
}

// ** this function triggers after the velocity animation completes.
function transitionComplete (item, direction, startVal, endVal) {
  
  Util.loadingAnimation(false);
  if (direction !== true) {

    // Wait on some action to trigger this
    console.log("animation..", direction)
    let startAjaxContent = () => {
      setTimeout(function() {
        // ajaxContainer.velocity({
        //   // opacity: [endVal.content.opacity, startVal.content.opacity],
        //   // visibility: [endVal.content.visibility, startVal.content.visibility],
        //   // display: ["block", "none"],
        //   top: [endVal.content.top, startVal.content.top],
        // }, {
        //   delay: 0,
        //   easing: "ease-out",
        //   duration: 200
        // })
        ajaxContainer.classList.remove("am-out");
        ajaxContainer.classList.add("am-in");
        ajaxContainer.style.top = endVal.content.top + "px";
        
        let reverseBtn = document.createElement("button");
        reverseBtn.classList.add("reverseAnimation");
        reverseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="32px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
          <line x1="64" y1="64" x2="0" y2="0" stroke="#fff" stroke-width="4"></line>
          <line x1="64" y1="0" x2="0" y2="64" stroke="#fff" stroke-width="4"></line>
          </svg>`;
    
          reverseBtn.addEventListener('click', (e) => {
            reverseBtn.parentNode.removeChild(reverseBtn)
            triggerReverse(item);
          });
          
        ajaxContainer.appendChild(reverseBtn);
        ajaxContainer.style.overflowY = "scroll"
      }, 50);
      
    }
    ajaxContainer.querySelector(".work-hero-image").addEventListener("load", startAjaxContent(), false );
    
  } else {
    //item.classList.remove("active");
    ajaxContainer.classList.remove("am-in");
    ajaxContainer.classList.add("am-out");
    document.querySelector("html").style.marginLeft = "";
    document.querySelector("main").style.marginLeft = "";
    document.body.style.overflowY = "scroll";
    bodyScrollLock.enableBodyScroll(document.body);
    ajaxContainer.setAttribute("loaded", false);
    ajaxContainer.style = "";
  }
  
}

let updateContent = function(stateObj) {
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
  let theItem = getItem(item);
  
  if (direction !== true) {
    fetch(theItem.link /*, options */)
    .then((response) => response.text())
    .then((html) => {
      let parser = new DOMParser();
      // Parse the text
      let ajaxHtml = parser.parseFromString(html, "text/html");
      let ajaxContent = ajaxHtml.querySelector('main').innerHTML;
      //let pbCritical = doc.querySelector('.pb_criticalCSS').innerHTML;
      //pageCritical.innerHTML = pageCritical.innerHTML + pbCritical;
      //console.log(pageCritical);
      let pageData = {
        title: ajaxHtml.querySelector('title').innerText,
        html: ajaxContent
      }
      updateContent (pageData)
      runScripts(ajaxContainer, theItem.link);
      redoAos(ajaxContainer);
      
      //window.history.pushState(pageData, pageData.title, theItem.link);
      //console.log("html loaded")

      
      let title = ajaxHtml.querySelector('title').innerText;
      let data = null;
      let link = theItem.link;
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
  }
}

function insertScript (script, callback) {
  console.log(script);

  if (script.tagName === "SCRIPT") {
    let s = document.createElement('script')
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
  } else if (script.tagName === "IMG") {
    script.addEventListener("load", () => {
      console.log("image loaded...", script)
      callback()
    })
  }

  
}
  
// trigger DOMContentLoaded
function scriptsDone () {
  
  let DOMContentLoadedEvent = document.createEvent('Event');
  DOMContentLoadedEvent.initEvent('DOMContentLoaded', true, true);
  document.dispatchEvent(DOMContentLoadedEvent);
  document.dispatchEvent(ajaxLoadEvent);
  console.log("TRIGGER DOM CONTENT LOADED");
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
let runScriptTypes = [
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
  
  // get scripts tags from a node
  let scripts = container.querySelectorAll('script, .work-hero-image, .client_logo');
  console.log("run SCRIPTS ---", scripts);
  let images = container.querySelectorAll('img');
  let runList = [];
  let typeAttr;

    images.forEach((image) => {
      
      //image.src = nextLink + image.src;
      let path = image.getAttribute("src");

      // if (!new RegExp("^(?:/|.+://)").test(path)) {
        
      //   path = nextLink + path;
      //   console.log(path);
      //   image.setAttribute("src", path);
      // }
    });

    let allSections = ajaxContainer.querySelectorAll('section');
    allSections.forEach(section => {
      let m = (window.getComputedStyle(section).getPropertyValue("background-image")).replace(/^url\(["']?/, '').replace(/["']?\)$/, ''); 

      if (m === "none") {
          //console.log(`background image url`);
          //console.log(m);
          m = "";
      } else {
          let newLink = window.location.origin + window.location.pathname;
          m = getComputedStyle(document.querySelector("#section-1")).getPropertyValue("background-image").replace(/^url\(["']?/, '').replace('url(','').replace(')','').replace('\"','');
          m = m.replace(newLink, '', /["']?\)$/, '')
          m = nextLink + m;
          console.log(`${m}`);
          //section.style.backgroundImage = "background-image: url(" + m + ")";
          section.style.backgroundImage = "url('" + m + "')";
      }
    });

    [].forEach.call(scripts, function (script) {
    // Get scripts and critical images, then trigger domcontentloaded event to fade in the ajaxcontainer
    //console.log(script);
    typeAttr = script.getAttribute('type');
    // only run script tags without the type attribute
    // or with a javascript mime attribute value
    if (script.tagName === "SCRIPT") {
      if (!typeAttr || runScriptTypes.indexOf(typeAttr) !== -1) {
        runList.push(function (callback) {
          insertScript(script, callback)
        })
      }
    }
    if (script.tagName === "IMG") {
      runList.push(function (callback) {
        insertScript(script, callback)
        console.log("img", script)
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
let targetActiveClass = 'aos-animate';
let elements = container.querySelectorAll('[data-aos]');
// Call this function when it enters/leaves the viewport
let callback = function(entries, observer) { 
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(targetActiveClass);
    } else {
      entry.target.classList.remove(targetActiveClass);
    }
  });
};

// Create our observer
let observer = new IntersectionObserver(callback, {threshold: 0});
  elements.forEach(element => {
    observer.observe(element);
  });
}
})();