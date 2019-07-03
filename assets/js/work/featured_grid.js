//console.log("featured items loading...");
let gridItems = document.querySelectorAll(".gridgrow");
let container = document.querySelector(".container");
document.body.setAttribute("reverseTiming", 200);
positionCaption();

let startWindowHeight = window.innerHeight;
window.addEventListener("resize", () => {
  positionCaption();
  // if (window.innerHeight === startWindowHeight) {
  //   positionCaption();
  // }
});

function positionCaption (extraSpace) {
  console.log("reposition caption")
  let extra = 0;
  if (extraSpace) {
    extra = extraSpace;
  }
  gridItems.forEach(item => {
    let gridCaption = item.querySelector(".excerpt-group");
    let image = item.querySelector(".gridgrow-image");

    //console.log(image);
    gridCaption.style.left = container.offsetLeft + extra + parseFloat(getComputedStyle(container).paddingLeft) + "px";
    gridCaption.style.position = "absolute";
    
  });

}