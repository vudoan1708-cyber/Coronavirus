let virusData = null;
let loading = true;

// storing the data
let countryNames = [], // store the countries names
    newConfirmed = [], // store new confirmed cases
    newDeaths = [], // stored number of new deaths
    newRecovered = [], // store number of recovered cases

    totalConfirmed = [], // store total number of confirmed cases
    totalDeaths = [], // store total number of death cases
    totalRecovered = [], // store total number of recovered cases

    dates_times = null,
    days = null, // store days
    times = null, // store times
    global_totalConfirmed = null,
    global_totalDeaths = null,
    global_totalRecovered = null;

let virusDisplay;

let gallery_move = 1;

let horrorSound,
    navSound;

function preload() {
    horrorSound = loadSound('assets/sound/horror.mp3');
    navSound = loadSound('assets/sound/play_button_clicked.mp3');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight).parent('canvas');
    // frameRate(30);
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
                totalRecovered[i] = virusData.Countries[i].TotalRecovered;

            }
            dates_times = virusData.Date.split('T');
            days = dates_times[0];
            times = dates_times[1].split('Z')[0];

            // globally
            global_totalConfirmed = virusData.Global.TotalConfirmed;
            global_totalDeaths = virusData.Global.TotalDeaths;
            global_totalRecovered = virusData.Global.TotalRecovered;
        })
        .then(() => { loading = false; })
        .catch(err => { console.error(err); })

    virusDisplay = new VirusDisplay();
    // horrorSound.play();
    // horrorSound.setVolume(0.005);

    rectMode(CENTER);
    textAlign(CENTER);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background(20);
    if (!loading) {
        // horrorSound.loop();
        displayVirus();
    }
}

function keyPressed() {

    if (keyCode === RIGHT_ARROW) {
        navSound.play();
        gallery_move++;
        // console.log(gallery_move)
    } else if (keyCode === LEFT_ARROW) {
        navSound.play();
        gallery_move--;
        // console.log(gallery_move)

    }
}

function displayVirus() {  
    virusDisplay.show();
    virusDisplay.showGlobalData();
    virusDisplay.showDates_Times();

    if (gallery_move < 1) {
        gallery_move = virusData.Countries.length;
    } else if (gallery_move > virusData.Countries.length) {
        gallery_move = 1;
    }
}

async function getVirus() {
    const URL = 'https://api.covid19api.com/summary';
    const response = await fetch(URL);
    virusData = await response.json();
    console.log(virusData);
    return virusData;
}