// 

(function(global) {

    // Var the initializes the object
    let AjaxLoadPage = function (link) {
        return new AjaxLoadPage.init(link);
    }

    let ajaxHistory = [];

    // Check ajaxHistory for existing entries
    function ifExistsInArray(link) {
        let exists = false;

        if (ajaxHistory.length > 0 && link) {
            ajaxHistory.forEach( (object, index) => {

                for (entry in object) {
                    if (entry === "url" && object[entry] === link) {
                        exists = true;
                    }
                }
            })
        }

        return exists;
    }

    // Add a link object to an array if it doesn't exist
    function pushToArray(link) {
        return ajaxHistory.push(
            entry = {
                url: link,
                state: {
                    preloaded: false
                }
            }
        )
    }

    function awaitParse (link) {
        return new Promise(resolve => {
            fetch(link)
                .then(response => resolve(response.text()));
        })
    }

    

    AjaxLoadPage.prototype = {
        callback: function() {
            console.log("callback:", ajaxHistory);
        },
        // If it's a valid ajax link, push the object to the array if it doesn't already exist
        isAjaxLink: function (link) {
            // Is a page on this site
            let r = false;

            if (link.includes(document.location.origin)) {
                r = true;
            } 
            
            if (link.includes("#")) {
                r = false;
            }
            
            if (!link.includes(document.location.origin)) {
                // not a relative url
                r = false;
            }

            return r;

        },
        // Validate if this is a valid aJax link
        // If it's valid, return this
        // If it's an external link or a non ajax link (like a anchor link), just load the page directly.
        validate: function(link) {
            link = link || this.link;
            let warning;

            // Do not continue the method chain if this does not pass.
            let pass = false;

            if (!link) {
                warning = "No link passed to prototype"
            }

            if (warning) {
                throw warning;
            }

            // Check if it's a valid ajax Link

            // There are no issues with the param

            // the array has some items already, so we need to check if there is already an entry for the URL

            // Check if the entry does not exist and it's a valid link to a page on the same origin
            if (!ifExistsInArray(link)) {

                if (this.isAjaxLink(link)) {
                    pushToArray(link);

                    // Continue the method chain
                    pass = this;
                }
                
            }
            // Validate if this is a link that should load an ajax page.
            return pass;
        },
        // On mouse hover of a valid link, fetch the page
        preload: async function(link) {
            link = link || this.link;

            // Validate the link first
            this.validate();
            // if Object has entries

            // Assume the page is already preloaded
            let preloaded = true, objectEntry;

            if (ajaxHistory.length > 0) {
                ajaxHistory.forEach( (object, index) => {

                    //console.log("object", object.url)
                    if (object.url === link) {
                        objectEntry = object;
                        //console.log("object entry", objectEntry)
                        preloaded = object.state.preloaded;

                    }
                });
            }

            if (!preloaded) {
                // Change value of preloaded key for this entry
                objectEntry["state"]["preloaded"] = true;
                // After it downloads, convert the response to a string
                let responseText = await awaitParse(link);

                // Parse response
                let parser = new DOMParser();

                // Parse the text
                let ajaxHtml = parser.parseFromString(responseText, "text/html");
                //console.log(responseText)
                //console.log("thisdfsdf", this.pageData)
                // Prefetch the top two non-lazy images
                let images = ajaxHtml.querySelectorAll("img[src]");

                if (images.length > 0) {
                    let preloadImages = [images[0], images[1]];

                    preloadImages.forEach( (preloadImg, index) => {
                        let preloadImgSrc = preloadImg.src;
                        fetch(preloadImgSrc)
                    });
                }
            }

            return this;
        },
        getAjaxContent: async function(targetContainer, link = this.link) {

            let responseText = await awaitParse(link);

            let parser = new DOMParser();

            let ajaxContent = {
                html: parser.parseFromString(responseText, "text/html"),
                url: link
            }

            this.callback();
            return ajaxContent;
        }

    }
    // Create a function constructor that builds an object and gives it 2 properties with default values
    AjaxLoadPage.init = function(link) {
        // Set default values
        var self = this;

        self.link = link;
            
        // Validate should push the type of page (work item, normal page);
        // Preload should push the preload state
        
    }

    // Give access to all prototype properties
    AjaxLoadPage.init.prototype = AjaxLoadPage.prototype;
    // Pass AjaxScriptLoader to the global object;
    global.AjaxLoadPage = AjaxLoadPage;
}(window));