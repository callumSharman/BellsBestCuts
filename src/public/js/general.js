import { getGallery, getHeadingImgs, getTeamImgNames } from "./data.js";

/** handles the independent behaviour of the return to top of page button */
export function returnArrowBehaviour(){
    const APPEARANCE_HEIGHT = 600; // height at which the return arrow appears (pixels)

    const returnArrow = document.getElementById("returnArrow");

    let alreadyAdded = false; // is the arrow already on screen?

    window.addEventListener('scroll', ()=>{
        if(window.innerWidth <= 768){ // DONT DISPLAY IN MOBILE MODE
            returnArrow.style.display = "none";
            alreadyAdded = false;
        } else {
            let currScrollStatus = window.scrollY;

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
export function returnArrowOnClick(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/** smoothly scrolls straight to the section with the given id */
export function scrollDownTo(sectionId){
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/** handles the behaviour related to the sliding down menu in mobile mode */
export function changeMobileMenuState(){
    const mobileMenu = document.getElementById("mobileMenu");

    // this method takes into account more factors than a standard .style.display
    const computedStyle = window.getComputedStyle(mobileMenu);

    let menuEnabled = false;
    if(computedStyle.display === 'none'){
        menuEnabled = false;
    } else menuEnabled = true;

    if(menuEnabled){ // enabled - turn off menu
        disableMobileMenu();
    } else { // disabled - turn on menu
        enableMobileMenu();
    }
    
}

/** turns of the mobile menu */
export function disableMobileMenu(){
    const mobileMenu = document.getElementById("mobileMenu");
    const meunButtonX = document.getElementById("menuButtonX");
    const menuButtonSymbol = document.getElementById("menuButtonSymbol");

    mobileMenu.style.display = 'none';
    menuButtonSymbol.style.display = 'flex';
    meunButtonX.style.display = 'none';
    document.body.style.overflow = 'auto'; // resume scrolling behaviour
}

/** turns on the mobile menu */
function enableMobileMenu(){
    const mobileMenu = document.getElementById("mobileMenu");
    const meunButtonX = document.getElementById("menuButtonX");
    const menuButtonSymbol = document.getElementById("menuButtonSymbol");

    mobileMenu.style.display='block';
    menuButtonSymbol.style.display = 'none';
    meunButtonX.style.display = 'block';
    document.body.style.overflow = 'hidden'; // restricts scrolling
}

/** draws the header image bubble based on the array of header images */
export function drawHeaderImgBubbles(){

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


                imgBubble.onclick = () => {setHeaderImgToIndex(i)};
            }
        })
}

let CURR_HEADER_IMG_INDEX = 0; // global variable... YUCK!!

/** sets the header image to the image with the given index */
function setHeaderImgToIndex(index){
    const pathToImgs = "../img/headers/";
    const heading = document.getElementById("heading");

    getHeadingImgs()
        .then(imgNames => {
            let imgPaths = imgNames.map(imgName => pathToImgs + imgName);
            return imgPaths;
        })
        .then(headingImgs => {
            heading.style.backgroundImage = "url(" + headingImgs[index] + ")";
            fixHeaderImgBubbles(index, headingImgs.length);
            CURR_HEADER_IMG_INDEX = index;
            console.log(`CURR_HEADER_IMG_INDEX: ${CURR_HEADER_IMG_INDEX}`);
        })
}

/** fixes the colour of the header image bubbles based on the index of the 
 *  currently displayed image */
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
export function slideShowBehaviour(){
    const pathToImgs = "../img/headers/";
    const TIME_BETWEEN_IMAGES = 4000 // in milliseconds
    const heading = document.getElementById("heading");



    // change based on the index of the currently displayed image NOT the next in the list



    // retrieve the heading images names first
    getHeadingImgs()
        .then(imgNames => {
            let imgPaths = imgNames.map(imgName => pathToImgs + imgName);
            return imgPaths;
        })
        .then(headingImgs => {

            function nextImage(){
                CURR_HEADER_IMG_INDEX ++;
                if(CURR_HEADER_IMG_INDEX >= headingImgs.length){
                    CURR_HEADER_IMG_INDEX = 0;
                }

                heading.style.backgroundImage = "url(" + headingImgs[CURR_HEADER_IMG_INDEX] + ")";
                fixHeaderImgBubbles(CURR_HEADER_IMG_INDEX, headingImgs.length);
        
            }
        
            heading.style.backgroundImage = "url(" + headingImgs[CURR_HEADER_IMG_INDEX] + ")";
            fixHeaderImgBubbles(CURR_HEADER_IMG_INDEX, headingImgs.length);
        
        
            setInterval(nextImage, TIME_BETWEEN_IMAGES); // triggers the next image after given time period
        })
}

/** populates the "meat the team" section with the employeesJSON */
export function populateTeamSection(){
    const teamContainer = document.getElementById("teamBoxContents");
    const pathToImgs = "../img/team/";

    getTeamImgNames()
        .then(teamImgNames => {
            teamImgNames.forEach(imgName => {
                let teamMemberBox = document.createElement('div');
                teamMemberBox.className = "teamMember";
        
                // add the image
                let teamMemberImg = document.createElement('img');
                teamMemberImg.className = "teamMemberImg";
                teamMemberImg.src = pathToImgs + imgName;
                teamMemberBox.append(teamMemberImg);
        
                // add the name

                let teamMemberNameBox = document.createElement('div');
                teamMemberNameBox.className = "teamMemberNameBox";

                let teamMemberName = document.createElement('div');
                teamMemberName.className = "text";
                teamMemberName.append(nameFromImgName(imgName));
                teamMemberNameBox.append(teamMemberName);
                teamMemberBox.append(teamMemberNameBox);
        
                // add the new box to the container
                teamContainer.append(teamMemberBox);
                
            });
        });
}

/** returns the name of an employee from their image name
 *  underscores become spaces and content after a full stop is removed. 
 *  All words begin with a captial */
function nameFromImgName(imgName){
    let imgNameLower = imgName.toLowerCase();

    let name = '';

    let prevChar = null;

    for(let i = 0; i < imgName.length; i ++){
        let currChar = imgNameLower.charAt(i);

        if(!isNaN(parseInt(currChar))){ // the char is a number so ignore it
            continue;
        } else if((currChar === '_') || (currChar === ' ')){
            if(prevChar === null){continue;} // don't need a space at the start
            else if(prevChar === '_'){continue;} // don't need two spaces in a row
            else{name += ' ';}
        } else if(currChar === '.'){ // ignore the file type
            break;
        } else { // normal letter
            if((prevChar === null) || (prevChar === '_') || (prevChar === ' ')){ // first letter of a word
                name += currChar.toUpperCase();
            } else{ // not first letter of a word
                name += currChar;
            }
        }

        prevChar = currChar;
    }
    return name;
}

/** populates the image gallery from the src/public/img/gallery folder. If 'maxNumImages' is set to -1 then the max number will be added */
export function populateGallery(maxNumImages){
    const pathToImgs = "../img/gallery/";
    const imgContainer = document.getElementById("galleryImgs");

    getGallery()
        .then(imgNames => {

            if(maxNumImages < 0){maxNumImages = imgNames.length}; // show all images
            if(maxNumImages > imgNames.length){maxNumImages = imgNames.length}; // don't go over the number of images

            for(let i = 0; i < maxNumImages; i ++){
                let img = imgNames[i];

                let imgHTML = document.createElement('img');
                imgHTML.className = 'galleryImg';
                imgHTML.src = pathToImgs + img;
        
                imgContainer.append(imgHTML);
            }
        });
}

/** handles the submission of a enquiry form */
export function handleEnquirySubmission(){
    document.getElementById('enquiryForm').addEventListener('submit', event => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(event.target);
        const name = formData.get('nameField');
        const email = formData.get('emailField');
        const message = formData.get('messageField');

        console.log(`${name},${email},${message}`);


    });

}