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

export function postData(url, json){
    return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(() => {
            throw new Error('Network response was not ok');
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


/** GET: returns latest Facebook posts? */
export function getFacebookPosts(){
    return getData('/api/facebook')
        .then(data => {
            return data;
        })
}