function getData(url, reqHeaders) {
    return fetch(url, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        throw error;
    });
}


/** GET: returns an array of gallery image names */
export function getGallery(){
    return getData('/api/gallery')
        .then(data => {
            return data;
        })
}


/** GET: returns an array of heading image names */
export function getHeadingImgs(){
    return getData('/api/headingImg')
        .then(data => {
            return data;
        })
}

/** GET: returns an array of team image names */
export function getTeamImgNames(){
    return getData('/api/team')
        .then(data => {
            return data;
        })
}