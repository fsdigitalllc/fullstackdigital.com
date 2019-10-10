;(function() {

    // Get all items in use on the page and create an array of objects
    let items = [];


    document.querySelectorAll(".item").forEach( (item, index) => {
        items.push (
            item = {
                node: item,
                image: item.querySelector("img"),
                index: index,
                imageLoaded: function () {
                    console.log(this.image, "loaded...")
                },
                isLoaded: function () {
                    this.image.onload = this.imageLoaded;
                    return this.image;
                }
            }
        )
    });

    

    items.forEach( (item, index) => {
            console.log("method", item.isLoaded())


    });
}())