document.addEventListener('DOMContentLoaded', () => {
    returnArrowBehaviour();
    drawHeaderImgBubbles()
    slideShowBehaviour();
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


    
    menuEnabled = false;
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


// possible to be retreived from a backend in the future
const headingImgs = ["../img/headers/header-1.jpg",
                     "../img/headers/header-2.jpg",
                     "../img/headers/header-3.jpg"];


/** draws the header image bubble based on the array of header images */
function drawHeaderImgBubbles(){
    const imgBubbleContainer = document.getElementById("imgBubbleSelector");
    if(headingImgs.length <= 1) return; // do not include bubble if 1 or no images

    for(let i = 0; i < headingImgs.length; i ++){
        let imgBubble = document.createElement('div');
        imgBubble.className = "imgBubble";
        imgBubble.id = "imgBubble-" + i;
        imgBubbleContainer.append(imgBubble);

    }
}

/** fixes the colour of the header image bubbles based on the index of the 
 * currently displayed image */
function fixHeaderImgBubbles(currentlyDisplayedIndex){
    // set all bubbles to blank except the current one, which should be coloured
    for(let i = 0; i < headingImgs.length; i ++){
        let imgBubble = document.getElementById("imgBubble-" + i);
        
        if(i == currentlyDisplayedIndex){ // THIS ONE NEEDS TO BE COLOURED
            imgBubble.style.backgroundColor = "var(--colour-one)";
        } else {
            imgBubble.style.backgroundColor = "white";
        }
    }
}

/** handles the heading slideshow behaviour */
function slideShowBehaviour(){

    const TIME_BETWEEN_IMAGES = 10000 // in milliseconds
    const heading = document.getElementById("heading");

    let headingImgsIndex = 0;

    function nextImage(){
        heading.style.backgroundImage = "url(" + headingImgs[headingImgsIndex] + ")";
        fixHeaderImgBubbles(headingImgsIndex);

        headingImgsIndex ++;
        if(headingImgsIndex >= headingImgs.length){
            headingImgsIndex = 0;
        }
    }

    nextImage();

    setInterval(nextImage, TIME_BETWEEN_IMAGES); // triggers the next image after given time period
}