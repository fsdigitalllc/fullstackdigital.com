// ajaxScriptLoader.js - refresh linked and inlined scripts
// Useful when loading page content with ajax and that content contains new scripts

// *** Created by Ben Bozzay ***
// Given the passed container, 
// Create reversable aJax animations

// Given an item:
// 1. Get the current offset positions (start values): left, top, right, height, width
// 2. 
// Pass the window context as global
(function(global) {
//console.log("AJAX script loader loaded----")


    // Var the initializes the object
    let AjaxScriptLoader = function (firstTags, secondTags) {
        return new AjaxScriptLoader.init(firstTags, secondTags);
    }

    AjaxScriptLoader.prototype = {
        // This points to the object
        // Return this in each statement to make chainable
        validate: function(selector) {

            var errorMessage;

            // if a selector is passed, validate it
            if (selector) {
                if (selector.tagName === "SCRIPT") {
                    errorMessage = "Type supported";
                }
            }
            
            // Throw error if this required param is missing in the supportedDivs array
            // If this was a selector, we would need to make sure to get the classname as a string
            // if (supportedDivs.indexOf(this.param1) === -1) {
            //     errorMessage = "Unsported selector passed";
            // }

            // Param1 is object
            //console.log(errorMessage, this.firstTags)
        },
        getSrcType: function (node) {
            return node.tagName;
        },
        isLoading: function (loading) {

            if (loading === false) {
                setTimeout(function () {
                    document.querySelector("html").setAttribute("contentLoading", false);
                }, 800)
                
            } else {
                document.querySelector("html").setAttribute("contentLoading", true);
            }
            //console.log(performance.now())
            return this;
        },
        getSrcArray: function(pageScripts, ajaxScripts) {
            let arr1 = pageScripts;
            let arr2 = ajaxScripts;
            // console.log("ajaxScripts", arr1)
            // // get a list of pageScripts that do not exist on the ajax loaded page
            // if (reverse === true) {
            //     arr1 = ajaxScripts;
                
            //     arr2 = pageScripts;
            // }
            // Iterate 
            function mapForEachScript (firstNodes, secondNodes, fn) {
                let nodeList = [];

                secondNodes.forEach( (node, index) => {
                    // single node, array of nodes to check
                    let finalNode = fn(node, firstNodes);

                    if (finalNode !== undefined) {
                        nodeList.push(
                        // Compare the item in the array with an item from another array
                        // runNodes();
                            finalNode
                        )   
                    }
                    
                });

                //console.log("final list", nodeList)
                return nodeList;
            }

            let diffNodes = mapForEachScript (arr1, arr2, function (node, arr2) {
                let pushNode = true;

                for (i = 0; i < arr2.length; i++) {
                    // compare one node in the first array to every node in the second array
                    // If there is a match, set pushNode to false
                    // If the script is using the reload tag, include it in the list even though it's a duplicate
                    // If the script is an image, include it in the list even though it's a duplicate

                    //console.log("node", node.getAttribute("ajax-script-reload"))
                    
                    if ( (arr2[i].outerHTML === node.outerHTML) && !node.getAttribute("ajax-script-reload") ) {
                        //console.log("arr2[i]", arr2[i].getAttribute("ajax-script-reload"))
                        // Compare
                        pushNode = false;
                        node = undefined;
                        break;
                    }
                }

                if (!pushNode) {
                    nodeToPush = undefined;
                }

                return node;
            });
            //console.log("difff", diffNodes)
            return diffNodes;
        },
        removeScripts: function(firstArray, secondArray) {
            let arr = this.getSrcArray(firstArray, secondArray, true)
            arr.forEach(s => {
                // Do not remove images from the dom
                if (!s.tagName === "IMG") {
                    s.parentNode.removeChild(s)
                }
            });
            return arr;
        },
        injectSrc: function(array, callBacks) {
            // Check if valid selectors are in use
            this.validate();

            //console.log("injectSRC", array)
            let runNodes = array;
            
            if (runNodes.length > 0) {
                //console.log("RUN SCRIPTS")
                runScripts();
            } else {
                scriptsDone();
            }
            
            // List of filtered scripts, styles that are different from starting page
            function insertScript (script, callback) {

                function appendScripts(s) {
                    // re-insert the script tag so it executes.
                    document.querySelector("body").appendChild(s)
                    // clean-up
                    
                    //s.parentNode.removeChild(s)
                }

                let scriptTag = script.tagName;
                let createTag = scriptTag.toLowerCase(scriptTag);
                let s;
                //console.log("loading...", script)
                if (scriptTag === "SCRIPT") {
                    s = document.createElement(createTag);
                    s.type = 'text/javascript'
                    if (script.src) {
                        
                        s.src = script.src
                        if (script.integrity) {
                            s.integrity = script.integrity;
                        }

                        s.onload = callback
                        s.onerror = callback
                        

                    } else {
                        // run the callback immediately for inline scripts
                        s.textContent = script.innerText;
                        callback();
                    }

                    // if (!script.src) {
                    //     callback();
                    // }
                } else if (scriptTag === "LINK") {
                    s = document.createElement(createTag);
                    s.rel = 'stylesheet';
                    s.onload = callback
                    s.onerror = callback
                    s.href = script.href;
                    if (script.integrity) {
                        s.integrity = script.integrity;
                    }
                } else if (scriptTag === "STYLE") {
                    s = document.createElement(createTag);
                    s.textContent = script.innerText;
                    callback();

                } else if (scriptTag === "IMG") {
                    if (script.complete) {
                        callback();
                    }
                    //callback();
                }
                if (s !== undefined) {
                    appendScripts(s)

                }
            }

            // trigger DOMContentLoaded and ajaxLoadEvent
            // this will inform velocity.animate of the endVal timing for forward animation
            function scriptsDone () {
                
                let DOMContentLoadedEvent = document.createEvent('Event');
                DOMContentLoadedEvent.initEvent('DOMContentLoaded', true, true);
                document.dispatchEvent(DOMContentLoadedEvent);

                // based on an array of callback functions specified by the user
                callBacks.forEach(cb => {
                    cb;
                })
                
                //console.log("scripts done", document)
            }

            // runs an array of async functions in sequential order
            function seq (arr, callback, index) {
                // first call, without an index
                if (typeof index === 'undefined') {
                index = 0
                }
                arr[index](function () {
                    index++;
                    if (index === arr.length) {

                        // LOOP FINISHED
                        // SCRIPTS DONE
                        callback()
                        //console.log(index, arr.length)
                    } else {
                        //console.log("insert", arr[index])
                        // LOOP NOT FINISHED
                        seq(arr, callback, index)
                        //console.log("not finished", index, arr.length)

                    }
                })
            }

            
            function runScripts () {
                
                let runList = [];
                runNodes.forEach(node => {

                    //if (node.tagName === "SCRIPT" || node.tagName === "link") {

                        // if there's no type attr (it's inline script) or the type attr is supported
                        //if (!typeAttr || runScriptTypes.indexOf(typeAttr) !== -1 || runScriptTypes.indexOf(linkAttr) !== -1) {
                            runList.push(function (callback) {
                                insertScript(node, callback)
                            });
                        //}
                    //}
                });

                // insert the script tags sequentially
                // to preserve execution order
                seq(runList, scriptsDone);
            }
        },
    }

    // 2.
    // Create a function constructor that builds an object and gives it 2 properties with default values
    AjaxScriptLoader.init = function(firstTags, secondTags) {

        // Set default values
        var self = this;

        // If param1 is set use that value, otherwise set it to an empty string
        //self.firstTags = Array.prototype.slice.call(firstTags);
        //self.secondTags = Array.prototype.slice.call(secondTags);

        //self.validate();
    }

    // Give access to all prototype properties
    AjaxScriptLoader.init.prototype = AjaxScriptLoader.prototype;
    // Pass AjaxScriptLoader to the global object;
    global.AjaxScriptLoader = AjaxScriptLoader;

}(window));