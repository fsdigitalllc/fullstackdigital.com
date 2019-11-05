// Given a passed URL, loads the page and preloads content
// 

(function(global) {

    // Var the initializes the object
    let AjaxLoadPage = function (link) {
        return new AjaxLoadPage.init(link);
    }

    AjaxLoadPage.prototype = {

        ajaxHistory: [],
        // Get the location of this page in the array of pages.
        // [{}, {}, {}]
        getAjaxEntry: function (link = this.link) {
            //link = link || this.link;

            let i = (function(link, _this) {
                let r = false;

                if (_this.ifExistsInArray(link)) {

                    _this.ajaxHistory.forEach( (object, index) => {
                        for (entry in object) {
                            if (entry === "url" && object[entry] === link) {
                                r = index;
                            }
                        }
                    })
                }

                return r;
            }(link, this))

            return this.ajaxHistory[i];
        },
        callback: function() {

        },
        // Add a link object to an array if it doesn't exist
        pushToArray: function(link = this.link) {
            return this.ajaxHistory.push(
                entry = {
                    url: link,
                    state: {
                        preloaded: false
                    },
                    //targetContainer: false,
                    // animation: {
                    //     panimate: false,
                    //     last_direction: false
                    // }
                }
            )
        },
        awaitParse: function(link = this.link) {
            return new Promise(resolve => {
                fetch(link)
                    .then(response => resolve(response.text()));
            })
        },
        // Check ajaxHistory for existing entries
        ifExistsInArray: function(link = this.link) {
            let exists = false;

            if (this.ajaxHistory.length > 0 && link) {
                this.ajaxHistory.forEach( (object, index) => {

                    for (entry in object) {
                        if (entry === "url" && object[entry] === link) {
                            exists = true;
                        }
                    }
                })
            }

            return exists;
        },
        // If it's a valid ajax link, push the object to the array if it doesn't already exist
        isAjaxLink: function (link = this.link) {
            //link = link || this.link;
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
        validate: function(link = this.link) {
            //link = link || this.link;
            let warning;

            // Do not continue the method chain if this does not pass.
            let pass = false;

            if (!link) {
                warning = "No link passed to prototype"
            }

            // Check if it's a valid ajax Link
            if (this.isAjaxLink(link)) {

                // Create an entry in the ajaxHistory array with this url
                this.createAjaxEntry(link);

                // Continue the method chain
                pass = this;
            } else {
                //warning = "Not an ajax link";
                pass = false;
            }

            if (warning) {
                throw warning;
            }

            return pass;
        },
        createAjaxEntry: function (link = this.link) {
            if (!this.ifExistsInArray(link)) {

                if (this.isAjaxLink(link)) {
                    this.pushToArray(link);

                    // Continue the method chain
                    pass = this;
                }
            }
            return this;
        },
        // On mouse hover of a valid link, fetch the page
        // link = a valid link from the same origin
        // preload: a count of the number of images to preload
        preload: async function(link = this.link, preload = 1) {
            

            // Validate the link first
            if (this.validate(link)) {
            // if Object has entries

                // Assume the page is already preloaded
                let preloaded = this.getAjaxEntry(link).state.preloaded, objectEntry;


                if (!preloaded) {
                    // Change value of preloaded key for this entry
                    this.getAjaxEntry(link).state.preloaded = true;
                    // After it downloads, convert the response to a string
                    let responseText = await this.awaitParse(link);

                    // Parse response
                    let parser = new DOMParser();

                    // Parse the text
                    let ajaxHtml = parser.parseFromString(responseText, "text/html");
                    //console.log(responseText)
                    //console.log("thisdfsdf", this.pageData)
                    // Prefetch the top two non-lazy images
                    let images = ajaxHtml.querySelectorAll("img");
                    let preloadedImages = [];

                    if (images.length > 0) {

                        images.forEach( (img, index) => {
                            if (index+1 <= preload) {
                                preloadedImages.push(img);
                            }
                        });
                        //let preloadImages = [images[0], images[1]];

                        preloadedImages.forEach( (preloadImg, index) => {
                            let preloadImgSrc = preloadImg.src || preloadImg.getAttribute("data-src") || preloadImg.getAttribute("data-srcset");
                            fetch(preloadImgSrc)
                        });
                    }
                }
            };
            

            return this;
        },
        getAjaxContent: async function(targetContainer, link = this.link) {

            let responseText = await this.awaitParse(link);

            let parser = new DOMParser();

            let ajaxContent = {
                html: parser.parseFromString(responseText, "text/html"),
                url: link
            }

            // Load any callback
            this.callback();

            return ajaxContent;
        }

    }
    // Create a function constructor that builds an object and gives it 2 properties with default values
    AjaxLoadPage.init = function(link) {
        // Set default values
        var self = this;
        self.link = link;
        //self.link = link;
            
        // Validate should push the type of page (work item, normal page);
        // Preload should push the preload state
        
    }

    // Give access to all prototype properties
    AjaxLoadPage.init.prototype = AjaxLoadPage.prototype;
    // Pass AjaxScriptLoader to the global object;
    global.AjaxLoadPage = AjaxLoadPage;
}(window));