(function() {

// Start loading indicator on page load
AjaxScriptLoader().isLoading(true);
// History pushstate for all pages

// In case these are leftover
document.addEventListener("DOMContentLoaded", function () {
    AjaxScriptLoader().isLoading(false);
    if (typeof bodyScrollLock !== 'undefined') {
        bodyScrollLock.enableBodyScroll(document.body);
    }
    
}, false)


// Object associated with a history entry
// Add default values for the first page load
let stateObj = {
    title: document.querySelector("title") || "Title",
    url: document.location.href
}

let changeWindowContent = () => {
    AOS.init();
    lazySizes.init();
    document.querySelectorAll("head title")[0].innerText = window.history.state.title;
    AjaxScriptLoader().isLoading(false);
    window.scrollTo (0,0);
    toggleActiveState();
}

// Call this function
let changeWindowHistory = () => {
    //window.history.forward();
    //console.log("window history", stateObj)

    // Add a history entry with the stateObj, 
    window.history.pushState(stateObj, stateObj.title, stateObj.url);

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


const ajaxLoadPage = async (pageLink, callBack = changeWindowHistory) => {

    // Start loading indicator
    AjaxScriptLoader().isLoading(true);
    // Download the target relative page
    const response = await fetch(pageLink);

    // After it downloads, convert the response to a string
    const responseText = await response.text();

    // Parse response
    let parser = new DOMParser();

    // Parse the text
    let ajaxHtml = parser.parseFromString(responseText, "text/html");

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
    let thisPageSrc = document.querySelectorAll('script');
    let ajaxPageScripts = ajaxHtml.querySelectorAll('script');

    let runScripts = AjaxScriptLoader().getSrcArray(thisPageSrc, ajaxPageScripts);
    //AjaxScriptLoader(thisPageSrc, ajaxPageScripts).injectSrc()
    // replace <main> content with the content loaded via ajax
    
    document.querySelectorAll('main')[0].innerHTML = ajaxMain.innerHTML;

    AjaxScriptLoader().injectSrc(runScripts);
    //console.log("scripts", ajaxPageScripts)
    // After main loads, Reinject any newly loaded scripts from the <head> and <body> from the next page.

    // Run callback after async actions are finished
    // The callback should:
    // 1. Reload any function, like animate on scroll, that need to know if the dom is updated
    // 2. Trigger the DOMContentLoaded event for the newly loaded scripts
    // 3. Stop the loading function, which should toggle the html class and also stop the loading indicator.
    callBack();
}

// Starts the ajax functions
// Even handler for relative links
let ajaxLinkClick = (e) => {
    // Make sure context is within the scope of this function
    let self = e.target;
    // Only perform the function if a link is clicked
    if (self.closest('a')) {
        let href = self.href;
        // Check if we are visiting a page on the site and not an external link
        // For absolute references to pages on the site, compare the origin of the href and the current origin
        // Or just check to see if it's a relative path by checking the first character of the link for a /
        // If the link contains an anchor tag, then do default behavior.

        if (href === window.location.href) {
            // do nothing
            e.preventDefault();
        }   else if ( (href.includes(document.location.host) || href[0] === "/") && !href.includes("#") && !self.classList.contains("work-link")) {
            // Prevent default link behavior so that we can override with an ajax request
            e.preventDefault();
            // Load the next page via fetch
            ajaxLoadPage(href)
        }

    }
}
document.addEventListener("click", ajaxLinkClick, false);
//document.addEventListener("mouseover", ajaxLinkClick, false);
// This function loads when the history entry changes
// This function will load after changeWindowHistory();
window.onpopstate = function(event) {
    //console.log(window.location.href)
    ajaxLoadPage(window.location.href);
}




}())