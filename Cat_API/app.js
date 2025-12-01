
function getRandomCat() {
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => {
            const catImage = document.getElementById('catImage');
            catImage.src = data[0].url;
        })
        .catch(error => console.error('Error fetching cat:', error));
}

// generador de grid 
function loadCatGrid() {
    const grid = document.getElementById('grid');
    const apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=9';

    // limpia el grid
    grid.innerHTML = '';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(cat => {
                const img = document.createElement('img');
                img.src = cat.url;
                img.alt = 'Random Cat';
                grid.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching cat grid:', error));
}

// inicializa el grid al cargar la pagina
loadCatGrid();

getRandomCat();

const API_URL = `https://api.thecatapi.com/v1/`;
const API_KEY = "DEMO-API-KEY";

let currentImageToVoteOn;

function showHistoricVotes() {

    document.getElementById('vote-options').style.display = 'none';
    document.getElementById('vote-results').style.display = 'block';

    // Clear previous history to prevent duplication
    document.getElementById('history-grid').innerHTML = '';

    const url = `${API_URL}votes?limit=10&order=DESC`;

    fetch(url, {
        headers: {
            'x-api-key': API_KEY
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            data.map(function (voteData) {

                const imageData = voteData.image

                let image = document.createElement('img');
                //use the url from the image object
                image.src = imageData.url

                let gridCell = document.createElement('div');

                if (voteData.value < 0) {
                    gridCell.classList.add('red')
                } else {
                    gridCell.classList.add('green')
                }

                gridCell.classList.add('col-lg');

                gridCell.appendChild(image)

                document.getElementById('history-grid').appendChild(gridCell);

            });

        })
        .catch(function (error) {
            console.log(error);
        });

}

function showVoteOptions() {
    document.getElementById("history-grid").innerHTML = '';

    document.getElementById('vote-options').style.display = 'block';
    document.getElementById('vote-results').style.display = 'none';

    showImageToVoteOn()
}

function showImageToVoteOn() {

    const url = `${API_URL}images/search`;

    fetch(url, {
        headers: {
            'x-api-key': API_KEY
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            currentImageToVoteOn = data[0];
            document.getElementById("image-to-vote-on").src = currentImageToVoteOn.url;
        });

}

function vote(value) {

    const url = `${API_URL}votes/`;
    const body = {
        image_id: currentImageToVoteOn.id,
        value
    }
    fetch(url, {
        method: "POST", body: JSON.stringify(body), headers: {
            'content-type': "application/json",
            'x-api-key': API_KEY
        }
    })
        .then((response) => {
            showVoteOptions()
        })
}

showVoteOptions()