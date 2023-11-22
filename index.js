function fetchRandomArtwork() {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11')
        .then(response => response.json())
        .then(data => {
            if (data.total) {
                const randomIndex = Math.floor(Math.random() * data.total);
                const objectID = data.objectIDs[randomIndex];
                fetchArtworkDetails(objectID);
            }
        })
        .catch(error => console.error('Error fetching object IDs:', error));
}

function fetchArtworkDetails(objectID) {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
        .then(response => response.json())
        .then(artwork => {
            displayArtwork(artwork);
        })
        .catch(error => console.error('Error fetching artwork:', error));
}

function displayArtwork(artwork) {
    if (artwork.primaryImage && artwork.title && artwork.artistDisplayName) {
        document.getElementById('artwork-image').src = artwork.primaryImage;
        document.getElementById('artwork-title').textContent = `Title: ${artwork.title}`;
        document.getElementById('artist-name').textContent = `Artist: ${artwork.artistDisplayName}`;
    } else {
        document.getElementById('artwork-container').innerHTML = '<p>Artwork not found.</p>';
    }
}

window.onload = fetchRandomArtwork;
