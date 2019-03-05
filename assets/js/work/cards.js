document.addEventListener("DOMContentLoaded", function(e) {
  console.log("cards---");
  animateCards();
});
window.addEventListener("resize", function(e){
  animateCards();
});
window.addEventListener("scroll", function(e){
  animateCards();
});
    function animateCards() {

      if (window.innerWidth >= 900 ) {
      let col1 = document.querySelector(".cards .column:first-child");
      let col2 = document.querySelector(".cards .column:last-child");

      let row = document.querySelector(".cards");
      console.log(row);
      let larger;

      if (col1.offsetHeight > col2.offsetHeight) {
        larger = col1;
        smaller = col2;
      } else {
        larger = col2;
        smaller = col1;
      }

      let heightDiff = larger.offsetHeight - smaller.offsetHeight;
      console.log(heightDiff);

			//initial values
			let topOfRow = row.offsetTop + row.offsetParent.offsetTop;
			let rowHeight = larger.offsetHeight - window.innerHeight;
			let scrollInterval = rowHeight / heightDiff;
      console.log("scrollInterval:");
      console.log(scrollInterval);

      console.log("columns height:");
      console.log(rowHeight);

      console.log("scrollInterval:");
      console.log(scrollInterval);
		  //where the magic happens
      let a = (window.scrollY - topOfRow ) / scrollInterval;
      console.log("a:");
      console.log(a);
			//find the bottom of the right column and give a Bool (true)
      let b = window.scrollY >= topOfRow + heightDiff + smaller.offsetHeight - window.innerHeight;
      console.log("b:");
      console.log(b);

  
      console.log("b: " + b);
        if (window.scrollY >= topOfRow && b === false ) {
        
          smaller.style.transform = `translateY(${a}px)`
        }
    //if the user scrolls to the top of the collumns and the user has not scrolled to the bottom of the right column
    
    
      }
    }