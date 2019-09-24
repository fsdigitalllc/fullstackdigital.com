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


    // Var the initializes the object
    let AjaxScriptLoader = function (firstTags, secondTags) {
        return new AjaxScriptLoader.init(firstTags, secondTags);
    }

    // Array of supported script types
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
            console.log(errorMessage, this.firstTags)
        },
        getSrcType: function (node) {
            return node.tagName;
        },
        injectSrc: function() {
            // Check if valid selectors are in use
            this.validate();

            let diffList = this.firstTags.concat(this.secondTags);
            let sameList = this.firstTags.concat(this.secondTags);
            // Start with an empty array to store a list of scripts to rerun
            let runList = [];

            console.log("diff list start", diffList)
            diffList.forEach( (node, index) => {
                
                sameList.forEach( (item, i) => {
                    if (node.outerHTML === item.outerHTML) {
                        diffList.splice(index, 1);
                        console.log("SAME", node.outerHTML, item.outerHTML)
                    }
                })
            })
            console.log("diff list end", diffList)
            

            diffList.forEach(node => {
                let typeAttr = node.getAttribute('type');
                // firstTags = firstPage scripts
                // secondTags = ajax page scripts
                // Compare the two arrays of scripts and find ones that exist on both pages
                //console.log(this.firstTags[5])
                // Get the scripts that exist on both pages

                if (node.tagName === "SCRIPT") {

                    // if there's no type attr (it's inline script) or the type attr isn't supported
                    if (!typeAttr || runScriptTypes.indexOf(typeAttr) !== -1) {
                        //console.log("push this", node)
                        runList.push(function (callback) {
                            insertScript(node, callback)
                        })
                    }
                }
            });
            // insert the script tags sequentially
            // to preserve execution order
            ////////seq(runList, scriptsDone);////////////////
            //console.log("same scripts", sameList)

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

            function insertScript (script, callback) {
  
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
                  document.body.appendChild(s)
                  // clean-up
                  script.parentNode.removeChild(script)
                  // run the callback immediately for inline scripts
                  if (!script.src) {
                    callback()
                  }
                }
              }

            // trigger DOMContentLoaded and ajaxLoadEvent
            // this will inform velocity.animate of the endVal timing for forward animation
            function scriptsDone () {
                let DOMContentLoadedEvent = document.createEvent('Event');
                DOMContentLoadedEvent.initEvent('DOMContentLoaded', true, true);
                document.dispatchEvent(DOMContentLoadedEvent);
            }
        },
    }

    // 2. //
    // Create a function constructor that builds an object and gives it 2 properties with default values
    AjaxScriptLoader.init = function(firstTags, secondTags) {

        // Set default values
        var self = this;

        // If param1 is set use that value, otherwise set it to an empty string
        self.firstTags = Array.prototype.slice.call(firstTags);
        self.secondTags = Array.prototype.slice.call(secondTags);

        self.validate();
    }

    // Give access to all prototype properties
    AjaxScriptLoader.init.prototype = AjaxScriptLoader.prototype;
    // Pass Panimate to the global object;
    global.AjaxScriptLoader = AjaxScriptLoader;

    
    
      
    // First class function for comparing two arrays of scripts
    // If the script exists in the <head> of the other page, but does not exist in the head of the current container, then inject that script and load it in order.
    
    // fn is the comparison function
    // function mapForEachScript(arrStart, arrNext, fn) {

    //     // Create a new array of just sources from scripts
    //     let arrStartSrc = [];
        
    //     for (var i=0; i < arrStart.length; i++) {
    //         if (arrStart[i].src) {
    //             arrStartSrc.push(arrStart[i].src);
    //         }
    //     }

    //     newArr = [];
        
    //     // Loop through the given array
    //     for (var i=0; i < arrNext.length; i++) {

    //         if (arrNext[i].src) {
    //             if (!arrStartSrc.includes(arrNext[i].src)) {
    //                 newArr.push(
    //                     fn(arrNext[i].src)
    //                 )
    //             }
    //         }
    //     };
    //     return newArr;
    // }
    // let loadNewScripts = mapForEachScript(currentScripts, ajaxScripts, function(script) {
    //     document.querySelector("head").innerHTML += script;

    //     console.log(script)
    // });

}(window));