//positionCaption();

  document.addEventListener("DOMContentLoaded", () => {
    positionCaption();
  });

  //let startWindowHeight = window.innerHeight;
  window.addEventListener("resize", () => {
    positionCaption();
    // if (window.innerHeight === startWindowHeight) {
    //   positionCaption();
    // }
  });
  
  function positionCaption (extraSpace) {

    if (document.querySelector(".work-row")) {
      //console.log("featured items loading...");
      let gridItems = document.querySelectorAll(".gridgrow");
      let container = document.querySelector(".container");
      document.body.setAttribute("reverseTiming", 200);
      let extra = 0;
      if (extraSpace) {
        extra = extraSpace;
      }
      gridItems.forEach(item => {
        let gridCaption = item.querySelector(".excerpt-group");
        let space = container.offsetLeft + extra + parseFloat(getComputedStyle(container).paddingLeft) + "px";

        //console.log(image);
        gridCaption.style.left = space;
        gridCaption.style.position = "absolute";

        if (window.innerWidth <= 520) {
          gridCaption.style.right = space;
        }
        
      });
    }
    
  
  }