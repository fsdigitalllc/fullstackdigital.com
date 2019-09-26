(function() {
  if (document.querySelector(".work-ajax") ) {
    let workAjax = document.querySelector(".work-ajax")
    workAjax.addEventListener("scroll", function(e){
      container = workAjax;
      animateCards(container);
    });
  } else {
    window.addEventListener("scroll", function(e){
      container = window;
      animateCards(container);
    });
    window.addEventListener("resize", function(e){
      container = window;
      animateCards(container);
    });
  }
  
  function animateCards(container) {
      let cY;
  
      if (container === window) {
        cY = container.scrollY
      } else {
        cY = container.scrollTop;
      }
      if (window.innerWidth >= 900 ) {
      let col1 = document.querySelector(".cards .column:first-child");
      let col2 = document.querySelector(".cards .column:last-child");
  
      let row = document.querySelector(".cards");
      
      let larger;
  
      if (col1.offsetHeight > col2.offsetHeight) {
        larger = col1;
        smaller = col2;
      } else {
        larger = col2;
        smaller = col1;
      }
  
      let heightDiff = larger.offsetHeight - smaller.offsetHeight;
      //initial values
      let topOfRow = row.offsetTop + row.offsetParent.offsetTop;
      let rowHeight = larger.offsetHeight - window.innerHeight;
      let scrollInterval = rowHeight / heightDiff;
      // console.log("scrollInterval:");
      // console.log(scrollInterval);
  
      // console.log("columns height:");
      // console.log(rowHeight);
  
      // console.log("scrollInterval:");
      // console.log(scrollInterval);
      //where the magic happens
      let a = (cY - topOfRow ) / scrollInterval;
      //find the bottom of the right column and give a Bool (true)
      let b = cY >= topOfRow + heightDiff + smaller.offsetHeight - window.innerHeight;
      if (cY >= topOfRow && b === false ) {
        smaller.style.transform = `translateY(${a}px)`
      }
    }
  }
})
