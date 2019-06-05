//console.log("featured items loading...");
let gridItems = document.querySelectorAll(".gridgrow");
let container = document.querySelector(".container");

positionCaption();

window.addEventListener("resize", () => {
  positionCaption();
});

function positionCaption () {

  gridItems.forEach(item => {
    let gridCaption = item.querySelector(".excerpt-group");
    let image = item.querySelector(".gridgrow-image");

    //console.log(image);
    gridCaption.style.left = container.offsetLeft + parseFloat(getComputedStyle(container).paddingLeft) + "px";
    gridCaption.style.position = "absolute";

    if (image.classList.contains("ddn")) {
      image.style.top = -50 + "px";
    } else if (image.classList.contains("rigado")) {
      image.style.top = 50 + "px";
    } else {
      image.style.top = 50 + "px";
    }
    
  });

}