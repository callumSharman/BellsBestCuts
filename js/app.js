/** handles the header bars behaviour */
function headerBehaviour(){
    const header = document.getElementById('appHeader');
    const progBar = document.getElementById('progBar');
    prevScrollStatus = 0; // this will always start at 0

    const travelAmt = 9;
    
    window.addEventListener('scroll', ()=>{
        currScrollStatus = window.scrollY;

        const headerTopValue = window.getComputedStyle(header).getPropertyValue('top');
        const headerOldTop = parseInt(headerTopValue.slice(0,-2)); // take off the 'px'

        const progTopValue = window.getComputedStyle(progBar).getPropertyValue('top');
        const progOldTop = parseInt(progTopValue.slice(0,-2)); // take off the 'px'

        if(currScrollStatus - prevScrollStatus >= 0){
            if(header.style.top != '-50px'){ // if not already all the way up

                header.style.top = headerOldTop + (-1 * travelAmt) + 'px'; // push header up
                progBar.style.top = progOldTop + (-1 * travelAmt) + 'px';
                if(progOldTop + (-1 * travelAmt) <= 0) {
                    progBar.style.top = 0 + 'px';
                }
            }
        } else {
            if(header.style.top != '0px'){ // if not already all the way down
                
                //header.style.top = headerOldTop + travelAmt + 'px'; // push header down
                header.style.top = 0 + 'px'; // push header down
                progBar.style.top = 70 + 'px';
            }
        }

        prevScrollStatus = currScrollStatus;
    })
}

/** handles the custom progress bar behaviour */
function progBarBehaviour(){
    const progBar = document.getElementById('progBar');

    window.addEventListener('scroll', ()=>{

        const totalDocumentHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        );
    
        const windowHeight = window.innerHeight;
        
        currScrollStatus = window.scrollY;

        progBar.style.width = ((currScrollStatus)/(totalDocumentHeight - windowHeight) * 100) + '%';


        //console.log((currScrollStatus+windowHeight)/totalDocumentHeight * 100);
    })
}