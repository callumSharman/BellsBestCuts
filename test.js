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

function getGallery(){
    getData('/api/gallery')
        .then(data => {
            let newDiv = document.createElement('div');
            newDiv.append(data);
            document.body.append(newDiv);
        })
}