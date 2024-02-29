document.addEventListener('DOMContentLoaded', () => {
    returnArrowBehaviour();
})

/** handles the independent behaviour of the return to top of page button */
function returnArrowBehaviour(){
    const APPEARANCE_HEIGHT = 600; // height at which the return arrow appears (pixels)

    const returnArrow = document.getElementById("returnArrow");

    alreadyAdded = false; // is the arrow already on screen?

    window.addEventListener('scroll', ()=>{
        if(window.innerWidth <= 768){ // DONT DISPLAY IN MOBILE MODE
            returnArrow.style.display = "none";
            alreadyAdded = false;
        } else {
            currScrollStatus = window.scrollY;

            if((currScrollStatus >= APPEARANCE_HEIGHT) && !alreadyAdded){
                returnArrow.style.display = "flex";

                // trigger load in animation
                returnArrow.classList.add('animate-returnArrow-loadIn');
                // remove after animation to prevent further triggering
                setTimeout(function() {
                    returnArrow.classList.remove('animate-returnArrow-loadIn');
                }, 300);
                alreadyAdded = true;
            }

            if((currScrollStatus < APPEARANCE_HEIGHT) && alreadyAdded){
                console.log("asgasg");
                returnArrow.style.display = "none";
                // trigger load out animation
                returnArrow.classList.add('animate-returnArrow-loadOut');
                // remove after animation to prevent further triggering
                setTimeout(function() {
                    returnArrow.classList.remove('animate-returnArrow-loadOut');
                }, 300);
                alreadyAdded = false;
            }
        }
    })

}

/** handles the onClick behaviour of the return to top of page button */
function returnArrowOnClick(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}