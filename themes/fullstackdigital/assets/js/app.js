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


// Access the array from AjaxLoadPage
//let ajaxHistory = AjaxLoadPage().ajaxHistory;


let stateObj = {
    title: document.querySelector("title") || "Title",
    url: document.location.href,
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


let getSelectorLink = (self) => {
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


// Var the initializes the object
let AppContentLoader = function (href, targetContainer) {
    return new AppContentLoader.init(href, targetContainer);
}


// Given a relative link, load the content into the target container
AppContentLoader.prototype = {


    ajaxHistory: AjaxLoadPage().ajaxHistory,
    ajaxEntry: function(link = this.href) {
        return AjaxLoadPage().getAjaxEntry(link);
    },

    // Navigator handles forward/backward navigation and sets the proper directions
    navigator: async function () {
        //let self = this;
        if (typeof Panimate !== 'undefined' && this.ajaxEntry().panimate === true) {
            console.log("start panimating");
        } else {
            console.log("start normal loading");
        }
        return this;
    },

    

    loadStart: async function (href = this.href) {
        this.navigator();
        let ajaxHtml = await AjaxLoadPage(href)
        .getAjaxContent(document.querySelector("main"));
    
        // Create an array of promises so that the load process does not start untill all promises are resolved
        Promise.all([ajaxHtml]).then(() => {
            this.ajaxLoadPage(ajaxHtml);
        });
        return this;
    },

    changeWindowContent: function (self) {
        //AOS.init();
        //lazySizes.init();
        document.querySelectorAll("head title")[0].innerText = window.history.state.title;
        AjaxScriptLoader().isLoading(false);


        window.scrollTo (0,0);



        toggleActiveState();
        setSectionSkins();

        return this;
    },

    changeWindowHistory: function () {
    
        // Add a history entry with the stateObj, 
        window.history.pushState(stateObj, stateObj.title, stateObj.url, stateObj.preloaded = true);
    
        // Update the page title based on the URL
        this.changeWindowContent();

        return this;
    },
    
    changeWindowContent: function () {
        //AOS.init();
        //lazySizes.init();
        document.querySelectorAll("head title")[0].innerText = window.history.state.title;
        AjaxScriptLoader().isLoading(false);
        window.scrollTo (0,0);
        toggleActiveState();
        setSectionSkins();

        return this;
    },
    
    
    ajaxLoadPage: async function (response, callBack = this.changeWindowHistory) {
    
        // Start loading indicator
        AjaxScriptLoader().isLoading(true);
    
        // Parsed text response
        let ajaxHtml = response.html;
    
        // Url stored in the object passed to the function
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
                callBack = this.changeWindowContent;
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
    
        // replace <main> content with the content loaded via ajax
        AjaxScriptLoader().removeScripts(ajaxPageScripts, thisPageSrc);
        document.querySelectorAll(this.containerTarget)[0].innerHTML = ajaxMain.innerHTML;
    
        // Array of DOM reliant callbacks to execute after all scripts and styles are loaded
        let callBacks = [AOS.init]
        AjaxScriptLoader().injectSrc(runScripts, callBacks);
    
        // After main loads, Reinject any newly loaded scripts from the <head> and <body> from the next page.
    
        // Run callback after async actions are finished
        // The callback should:
        // 1. Reload any function, like animate on scroll, that need to know if the dom is updated
        // 2. Trigger the DOMContentLoaded event for the newly loaded scripts
        // 3. Stop the loading function, which should toggle the html class and also stop the loading indicator.
        
        // Assign the callback to this object so that the this keyword is passed
        this.callBack = callBack;
        this.callBack();

        return this;
    }
}

// Create a function constructor that builds an object and gives it 2 properties with default values
AppContentLoader.init = function(href, containerTarget) {
    // Set default values
    var self = this;

    self.href = href;
    self.containerTarget = containerTarget || ".site-main";

    // Object associated with a history entry
    // Add default values for the first page load
    AjaxLoadPage().validate(href);
}

// Give access to all prototype properties
AppContentLoader.init.prototype = AppContentLoader.prototype;

global.AppContentLoader = AppContentLoader;


// Expose the current entry based on the appcontentloader method


// For page links that aren't animated, main the container target <main> and just replace the content
function getAjaxContentArea(target) {
    let containerTarget = ".site-main";

    if (target.closest(".item")) {
        containerTarget = ".work-ajax";
    }

    return containerTarget;
}

function setPanimateOptions(target) {
    let panimate = false;
    if (target.closest(".item")) {
        let thisItem = target.closest(".item");
        panimate = [];

        panimate.push({
            start: thisItem.querySelector(".item_image"),
            end: {
                top: document.querySelectorAll("[panimate-top]")[0],
                width: document.querySelectorAll("[panimate-width]")[0]
            }
        }, {
            start: thisItem.querySelector(".item_wipe"),
            top: 0,
            width: window.innerWidth
        })
    }
    return panimate;
}

let ajaxPrepare = async (e) => {
    // Make sure context is within the scope of this function
    let validTarget = false, href;
    //workLink = link => (link.includes(document.location.host) || link[0] === "/") && (!link.includes("#"));

    // e.target.closest throws an error when the mouse enters the screen because the nodeName is #document
    if (e.target && e.target.nodeName !== "#document") {
        validTarget = true;
    }

    if (validTarget) {
        let target = e.target;


        // For ajax animated content, target a container that overlaps main
        

        // Two types of events: click or mouseover. 

        // Click should init the link interaction
        // Mouseover should preload a page if it already isn't preloaded

        // If the selector is a Link or if it's an .item
        href = getSelectorLink(target);

        if (href) {
            let ajaxEntry = AppContentLoader(href).ajaxEntry();

            // Set a variable for the entry within the ajaxhistory array
            
            // For initial page load, check if the target is a work link
            ajaxEntry.container = getAjaxContentArea(target);
            ajaxEntry.panimate = setPanimateOptions(target);

            if (e.type === "click") {
                e.preventDefault();

                AppContentLoader(href, ajaxEntry.container).loadStart();

                // (!isAjaxLink(href) && self.closest('.item').hasAttribute("ajax-link"))
    
            } else {

                AjaxLoadPage().preload(href, 2);
                

                // Set the target container in the object
                
                // Preload
                // Check if it's a valid ajaxLink
    
            }

            // Creates a new entry in the array
            
            console.log("this entry", ajaxEntry);



        }
    }
    return this;
}


document.addEventListener("click", ajaxPrepare, false);

document.addEventListener("touchstartt", ajaxPrepare, false);
document.addEventListener("mouseenter", ajaxPrepare, true);
// Start the methods


window.onpopstate = function() {
    let targetContainer = undefined;

    if (AppContentLoader(window.location.href).ajaxEntry() !== false) {
        //AppContentLoader(window.location.href, )
        targetContainer = AppContentLoader(window.location.href).ajaxEntry().container;
    }
    AppContentLoader(window.location.href, targetContainer).loadStart();
}

// This function loads when the history entry changes
// This function will load after changeWindowHistory();






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