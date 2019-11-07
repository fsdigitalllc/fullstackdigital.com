(function(global) {

//let scriptsOnLoad = [aos.init]
// Start loading indicator on page load
AjaxScriptLoader().isLoading(true);
// History pushstate for all pages

// In case these are leftover
document.addEventListener("DOMContentLoaded", function () {
    AjaxScriptLoader().isLoading(false);
    if (typeof bodyScrollLock !== 'undefined') {
        bodyScrollLock.enableBodyScroll(document.body);
    }
    AOS.init();
    //lazySizes.init();
    setSectionSkins();
    lazySizes.init();

}, false)




// Object associated with a history entry
// Add default values for the first page load
let stateObj = {
    title: document.querySelector("title") || "Title",
    url: document.location.href,
}

let changeWindowContent = () => {
    //AOS.init();
    //lazySizes.init();
    document.querySelectorAll("head title")[0].innerText = window.history.state.title;
    AjaxScriptLoader().isLoading(false);
    window.scrollTo (0,0);
    toggleActiveState();
    setSectionSkins();
}

// Call this function
let changeWindowHistory = () => {
    //window.history.forward();
    //console.log("window history", stateObj)

    // Add a history entry with the stateObj, 
    window.history.pushState(stateObj, stateObj.title, stateObj.url, stateObj.preloaded = true);

    console.log("history entry", stateObj.url, stateObj.title)
    // Update the page title based on the URL
    changeWindowContent();
}

// Toggle the navigation items active state
let toggleActiveState = () => {
    //let activeBtn = self.closest("li");
    let navLinks = document.querySelectorAll(".masthead li a");
    navLinks.forEach(link => {
        let li = link.closest("li");
        if (link.href === window.location.href && !li.classList.contains("active")) {
            li.classList.add("active")
        } else {
            li.classList.remove("active");
        }
    });
}


const ajaxLoadPage = async (response, callBack = changeWindowHistory) => {

    // Start loading indicator
    AjaxScriptLoader().isLoading(true);

    // Parsed text response
    let ajaxHtml = response.html;

    // Url stored in tthe object passed to the function
    let pageLink = response.url;


    // Get some stuff
    let ajaxTitle = ajaxHtml.querySelector("title");
    let ajaxMain = ajaxHtml.querySelector("main");
    let ajaxBodyClass = ajaxHtml.querySelector("body").classList;

    // Change the current body class to match the next page
    document.querySelector("body").className = ajaxBodyClass;
    
    // Update the history stateObj to include the next page title and url
    // If the history entry exists, don't do anything
    if (window.history.state) {
        if (window.history.state.url === pageLink) {
            callBack = changeWindowContent;
        }
    }
    if (ajaxTitle) {
        stateObj.title = ajaxTitle.innerText;
    }
    stateObj.url = pageLink;
    
    
    // After the <main> page HTML has changed, get all of the current scripts
    let thisPageSrc = document.querySelectorAll('script, style, link[rel="stylesheet"]');
    let ajaxPageScripts = ajaxHtml.querySelectorAll('script, style, link[rel="stylesheet"]');
    let runScripts = AjaxScriptLoader().getSrcArray(thisPageSrc, ajaxPageScripts);
    //AjaxScriptLoader(thisPageSrc, ajaxPageScripts).injectSrc()
    // replace <main> content with the content loaded via ajax
    AjaxScriptLoader().removeScripts(ajaxPageScripts, thisPageSrc);
    document.querySelectorAll('main')[0].innerHTML = ajaxMain.innerHTML;

    // Array of DOM reliant callbacks to execute after all scripts and styles are loaded
    let callBacks = [AOS.init]
    AjaxScriptLoader().injectSrc(runScripts, callBacks);

    // After main loads, Reinject any newly loaded scripts from the <head> and <body> from the next page.

    // Run callback after async actions are finished
    // The callback should:
    // 1. Reload any function, like animate on scroll, that need to know if the dom is updated
    // 2. Trigger the DOMContentLoaded event for the newly loaded scripts
    // 3. Stop the loading function, which should toggle the html class and also stop the loading indicator.
    callBack();
}


// function initAjaxLoadPage(link) {
//     ajaxLoadPage(link);
// }


// Starts the ajax functions
// Even handler for relative links
let ajaxPrepare = async (e) => {
    // Make sure context is within the scope of this function
    let validTarget = false,
    href;
    //workLink = link => (link.includes(document.location.host) || link[0] === "/") && (!link.includes("#"));

    // e.target.closest throws an error when the mouse enters the screen because the nodeName is #document
    if (e.target && e.target.nodeName !== "#document") {
        validTarget = true;
    }

    if (validTarget) {
        let target = e.target;


        let getSelectorLink = (self = target) => {
            let link = false;

            if (self.closest('a') && self.closest("a").hasAttribute("href")) {
                link = self.closest("a").href;
            } else if (self.closest("[ajax-link]") && self.closest("[ajax-link]").hasAttribute("ajax-link")) {
                link = self.closest("[ajax-link]").getAttribute("ajax-link");
            }


            if (link) {
                link = buildLink(link);
                function buildLink (url) {
                    
                    // Check if it's  relative URL, then return the absolute URL
                    if (url[0] === "/" && !url.includes(document.location.host)) {
                        return document.location.origin + url;
                    } else {
                        return url;
                    }
                }
            }

            // return either false or the cleaned link
            return link;
        }

        // Two types of events: click or mouseover. 
        // Click should init the link interaction
        // Mouseover should preload a page if it already isn't preloaded
        if (getSelectorLink()) { 
            href = getSelectorLink();
            let isRelativeAjaxLink = AjaxLoadPage().isAjaxLink(href);

            
            if (e.type === "click") {
                
                if (isRelativeAjaxLink) {
                    e.preventDefault();
                    //initAjaxLoadPage(href)   
                    

                    let ajaxHtml = await AjaxLoadPage(href)
                    .getAjaxContent(document.querySelector("main"));
                    
                    ajaxLoadPage(ajaxHtml);
                        
                }
    
                //
                // (!isAjaxLink(href) && self.closest('.item').hasAttribute("ajax-link"))
    
            } else {
                
                // Preload
                // Check if it's a valid ajaxLink
                AjaxLoadPage(href).preload();
    
            }

        }
    }
    
}


document.addEventListener("click", ajaxPrepare, false);
document.addEventListener("mouseenter", ajaxPrepare, true);

// This function loads when the history entry changes
// This function will load after changeWindowHistory();
window.onpopstate = async function(event) {
    //console.log(window.location.href)
    let ajaxHtml = await AjaxLoadPage(window.location.href)
    .getAjaxContent(document.querySelector("main"));
    ajaxLoadPage(ajaxHtml);
}





// Extra layout functions

function setSectionSkins () {
    let sections = document.querySelectorAll("section");

    sections.forEach(section => {
        let bgColor = getComputedStyle(section).backgroundColor;
        let skin = lightOrDark(bgColor);
        //console.log(section, bgColor, skin)

        section.setAttribute("skin", skin)
    });
}

function lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;
    
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        
        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

        return 'light';
    } 
    else {

        return 'dark';
    }
}


}(window));