import { getGallery, getHeadingImgs } from "./data.js";

document.addEventListener('DOMContentLoaded', () => {
    returnArrowBehaviour();
    drawHeaderImgBubbles()
    slideShowBehaviour();
    populateTeamSection();
})

/** handles the independent behaviour of the return to top of page button */
function returnArrowBehaviour(){
    const APPEARANCE_HEIGHT = 600; // height at which the return arrow appears (pixels)

    const returnArrow = document.getElementById("returnArrow");

    let alreadyAdded = false; // is the arrow already on screen?

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

/** draws the header image bubble based on the array of header images */
function drawHeaderImgBubbles(){

    // find the number of images first before drawing
    getHeadingImgs()
        .then(imgNames => {
            const imgBubbleContainer = document.getElementById("imgBubbleSelector");
            if(imgNames.length <= 1) return; // do not include bubble if 1 or no images

            for(let i = 0; i < imgNames.length; i ++){
                let imgBubble = document.createElement('div');
                imgBubble.className = "imgBubble";
                imgBubble.id = "imgBubble-" + i;
                imgBubbleContainer.append(imgBubble);

            }
        })
}

/** fixes the colour of the header image bubbles based on the index of the 
 * currently displayed image */
function fixHeaderImgBubbles(currentlyDisplayedIndex, numImages){
    // set all bubbles to blank except the current one, which should be coloured
    for(let i = 0; i < numImages; i ++){
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
    const pathToImgs = "../img/headers/";
    const TIME_BETWEEN_IMAGES = 3000 // in milliseconds
    const heading = document.getElementById("heading");

    // retrieve the heading images names first
    getHeadingImgs()
        .then(imgNames => {
            let imgPaths = imgNames.map(imgName => pathToImgs + imgName);
            return imgPaths;
        })
        .then(headingImgs => {
            let headingImgsIndex = 0;

            function nextImage(){
                heading.style.backgroundImage = "url(" + headingImgs[headingImgsIndex] + ")";
                fixHeaderImgBubbles(headingImgsIndex, headingImgs.length);
        
                headingImgsIndex ++;
                if(headingImgsIndex >= headingImgs.length){
                    headingImgsIndex = 0;
                }
            }
        
            nextImage();
        
            setInterval(nextImage, TIME_BETWEEN_IMAGES); // triggers the next image after given time period
        })
}

// possible to be retreived from a backend in the future
const employeesJSON = {"employees": [{'id':1, 'name':'Liam Bell', 'imgUrl':'img/team/liam-1.jpg'},
                                 {'id':2, 'name':'Mitch Bell', 'imgUrl':'img/team/mitch-1.jpg'},
                                 {'id':3, 'name':'Nathan', 'imgUrl':'img/team/nathan-1.jpg'},
                                 {'id':4, 'name':'Ryan', 'imgUrl':'img/team/ryan-1.jpg'},
                                ]};

/** populates the "meat the team" section with the employeesJSON */
function populateTeamSection(){
    const teamContainer = document.getElementById("teamBoxContents");

    employeesJSON.employees.forEach(employee => {
        let teamMemberBox = document.createElement('div');
        teamMemberBox.className = "teamMember";

        // add the image
        let teamMemberImg = document.createElement('img');
        teamMemberImg.className = "teamMemberImg";
        teamMemberImg.src = employee.imgUrl;
        teamMemberBox.append(teamMemberImg);

        // add the name
        let teamMemberName = document.createElement('div');
        teamMemberName.className = "text";
        teamMemberName.append(employee.name);
        teamMemberBox.append(teamMemberName);

        // add the new box to the container
        teamContainer.append(teamMemberBox);
    })
}