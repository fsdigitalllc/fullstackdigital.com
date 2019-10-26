(function(global) {

    // Var the initializes the object
    let AjaxLoadPage = function (link) {
        return new AjaxLoadPage.init(link);
    }

    let ajaxHistory = [];

    function ifExistsInArray(link) {
        let exists = false;
        ajaxHistory.forEach( (object, index) => {

            for (entry in object) {
                if (entry === "url" && object[entry] === link) {
                    exists = true;
                }
            }
        })

        return exists;
    }

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

    AjaxLoadPage.prototype = {

        // Validate if this is a valid aJax link
        // If it's valid, return this
        // If it's an external link or a non ajax link (like a anchor link), just load the page directly.
        validate: function(l) {
            let link = l || this.link;
            let warning;

            if (!link) {
                warning = "No link passed to prototype"
            }

            if (warning) {
                throw warning;
            }

            // If it's a valid ajax link, push the object to the array if it doesn't already exist

            if (!warning) {

                // array has some items already
                if (ajaxHistory.length > 0) {

                    if (!ifExistsInArray(link)) {
                        pushToArray(link);
                    }

                } else {
                    pushToArray(link);
                }
            }
            // Validate if this is a link that should load an ajax page.
            return this;
        },
        // On mouse hover of a valid link, fetch the page
        preload: function() {

            // Validate the link first
            this.validate();
            // if Object has entries
            // function entryExists(array) {

            //     if (ajaxHistory.length > 0) {

            //     }
            //     let entry = false;


            //     return entry;
            // }
            // if (ajaxHistory.length > 0) {
            //     ajaxHistory.forEach( (object, index) => {

            //         for (entry in object) {
            //             console.log("entry", entry)
            //         }
            //     })
            // }



            // if (ajaxHistory.indexOf(entry) === -1) {
            //     ajaxHistory.push(
            //         entry
            //     )
            // }


            console.log("ajaxHistory", ajaxHistory)
            return this;
        }

    }
    // Create a function constructor that builds an object and gives it 2 properties with default values
    AjaxLoadPage.init = function(link) {
        // Set default values
        var self = this;

        self.link = link;

        self.pageData = {
            
            // Validate should push the type of page (work item, normal page);
            // Preload should push the preload state
            // 

        }
        
        //this.validate();
    }

    // Give access to all prototype properties
    AjaxLoadPage.init.prototype = AjaxLoadPage.prototype;
    // Pass AjaxScriptLoader to the global object;
    global.AjaxLoadPage = AjaxLoadPage;
}(window));