let virusData = null;
let loading = true;

// storing the data
let countryNames = [], // store the countries names
    newConfirmed = [], // store new confirmed cases
    newDeaths = [], // stored number of new deaths
    newRecovered = [], // store number of recovered cases

    totalConfirmed = [], // store total number of confirmed cases
    totalDeaths = [], // store total number of death cases
    totalRecovered = []; // store total number of recovered cases

let virusDisplay;

let gallery_move = 1;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight).parent('canvas');
    frameRate(5);
    getVirus()
        .then((data) => {
            virusData = data;
        })
        .then(() => {
            for (let i = 0; i < virusData.Countries.length; i++) {
                countryNames[i] = virusData.Countries[i].Country;

                newConfirmed[i] = virusData.Countries[i].NewConfirmed;
                newDeaths[i] = virusData.Countries[i].NewDeaths;
                newRecovered[i] = virusData.Countries[i].NewRecovered;

                totalConfirmed[i] = virusData.Countries[i].TotalConfirmed;
                totalDeaths[i] = virusData.Countries[i].TotalDeaths;
                totalRecovered[i] = virusData.Countries[i].totalRecovered;
            }
        })
        .then(() => { loading = false; })

    virusDisplay = new VirusDisplay();
    rectMode(CENTER);
    textAlign(CENTER);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background(20);
    if (!loading) displayVirus();
}

function keyPressed() {

    if (keyCode === RIGHT_ARROW) {
        gallery_move++;
        console.log(gallery_move);
    } else if (keyCode === LEFT_ARROW) {
        gallery_move--;
    }
}

function displayVirus() {  
    virusDisplay.show();
}

async function getVirus() {
    const URL = 'https://api.covid19api.com/summary';
    const response = await fetch(URL);
    virusData = await response.json();
    console.log(virusData);
    return virusData;
}