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
                }, 200);
                alreadyAdded = true;
            }

            if((currScrollStatus < APPEARANCE_HEIGHT) && alreadyAdded){
                // trigger load out animation
                returnArrow.classList.add('animate-returnArrow-loadOut');
                // remove after animation to prevent further triggering
                setTimeout(function() {
                    returnArrow.classList.remove('animate-returnArrow-loadOut');
                    returnArrow.style.display = "none";
                }, 100);
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

/** smoothly scrolls straight to the section with the given id */
function scrollDownTo(sectionId){
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/** handles the behaviour related to the sliding down menu in mobile mode */
function mobileMenuBehaviour(){
    const mobileMenu = document.getElementById("mobileMenu");
    const meunButtonX = document.getElementById("menuButtonX");
    const menuButtonSymbol = document.getElementById("menuButtonSymbol");


    
    menuEnabled = null;
    if(mobileMenu.style.display === 'none'){
        menuEnabled = false;
    } else menuEnabled = true;

    if(menuEnabled){ // enabled - turn off menu
        mobileMenu.style.display = 'none';
        menuButtonSymbol.style.display = 'flex';
        meunButtonX.style.display = 'none';
        document.body.style.overflow = 'auto'; // resume scrolling behaviour
        
    } else { // disabled - turn on menu
        mobileMenu.style.display='block';
        menuButtonSymbol.style.display = 'none';
        meunButtonX.style.display = 'block';
        document.body.style.overflow = 'hidden'; // restricts scrolling
    }
    
}