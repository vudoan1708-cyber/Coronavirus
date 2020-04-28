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

// sound effects
let horrorSound,
    navSound;

let num = null; // number that users will speak using p5.speech

let instruction = true,
    mobile = false;

function preload() {
    navSound = loadSound('assets/sound/play_button_clicked.mp3');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight).parent('canvas');
    // frameRate(30);
    // load p5 speech
    let lang = navigator.language || 'en-UK';
    let speechRec = new p5.SpeechRec(lang, gotSpeech);

    let continuous = true,
        interim = false;
    speechRec.start(continuous, interim);
    // store users' speech into a variable
    function gotSpeech() {
        let myString = speechRec.resultString;
        // check if the speechRec thinks the result is true
        if (speechRec.resultValue) {
            // check if the incoming word is a number 
            if (!isNaN(Number(myString))) {
                // assign that number to control gallery movement
                gallery_move = Number(myString);
            }
        }
        // console.log(myString);
    }
    // retrieve the external API
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

// for prototyping
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

    // instructions
    if (key == ' ') {
        if (!instruction) {
            instruction = true;
        } else instruction = false;
    }
}

// for larger devices
function mousePressed() {
    if (!mobile) {
        // <
        if(mouseX > width / 2 - 300 && mouseX < width / 2 - 195) {
            if (mouseY > height / 2 - 35 && mouseY < height / 2 + 45) {
                navSound.play();
                gallery_move--;
            }
        }

        // >
        if(mouseX < width / 2 + 300 && mouseX > width / 2 + 195) {
            if (mouseY > height / 2 - 35 && mouseY < height / 2 + 45) {
                navSound.play();
                gallery_move++;
            }
        }

        // QUESTION MARKS (TO TRIGGER THE INSTRUCTIONS)
        let d2 = dist(mouseX, mouseY, width / 2 + 300, 25);
        if (d2 < 25) {
            if (!instruction) {
                instruction = true;
                navSound.play();
            }
            else {
                instruction = false;
                navSound.play();
            }
        }
    }
}

// for mobile
function touchStarted() {
    if (mouseX > 0 && mouseX < width) {
        if (mouseY > 0 && mouseY < height) {
            mobile = true;
        }
    }
    
    if (mobile) {
        // <
        if(mouseX > 0 && mouseX < width / 2 - 45) {
            if (mouseY > 0 && mouseY < height) {
                navSound.play();
                gallery_move--;
            }
        }

        // >
        if(mouseX < width && mouseX > width / 2 + 45) {
            if (mouseY > 0 && mouseY < height) {
                navSound.play();
                gallery_move++;
            }
        }

        // QUESTION MARKS (TO TRIGGER THE INSTRUCTIONS)
        let d2 = dist(mouseX, mouseY, width / 2 + 100, 25);
        if (d2 < 25) {
            if (!instruction) {
                instruction = true;
                navSound.play();
            }
            else {
                instruction = false;
                navSound.play();
            }
        }
    }
}

function displayInstruction() {
    if (instruction) {
        push();
            translate(width / 2, height / 2);
            fill(0, 150);
            rect(0, 0, width, height);
            stroke(255, 200);
            strokeWeight(2);
            fill(0);
            rect(0, 0, width - width / 4, height - height / 2);
            noStroke();
            fill(200, 253, 100);
            textSize(width / 70);
            text('Please First CLICK/PRESS Anywhere On The Screen For The System To Detect The Type of Used Device.' + '\n' +
                'Thank You!!!',
                0, -100);

            fill(200);
            textSize(width / 80);
            text('You Might Want To Use The Buttons To Explore The Data About The COVID19 Worldwide',
                0, -40);
            text('Or If You Notice When The Site Asks For Microphone Access Permission, You Can Say A' + '\n' + 
                    'Number That Corresponds To A Country To See Its Specific Data (Mobile Limited Access Currently)',
                0, 20);
            text("If The Site Doesn't Respond Accordingly To Your Speech (It Has To Be A Number), And/Or," + '\n' + 
                    'If There Is No Available Recording Button On The Tab. Refresh The Page, And Remember To Click "Allow" When Prompted',
                0, 100);
        pop();
    }

    // QUESTION MARKS (TO TRIGGER THE INSTRUCTIONS)
    let d2 = dist(mouseX, mouseY, width / 2 + 300, 25);
    if (d2 < 25) {
        push();
            if (!mobile) {
                translate(width / 2 + 300, 25);
            } else translate(width / 2 + 100, 25);
            fill(255, 50, 0);
            if (!mobile) ellipse(0, 0, 50);
            else ellipse(0, 0, 25);
            fill(255);
            if (!mobile) textSize(width / 30);
            else textSize(width / 25);
            if (!instruction) text('?', 0, 10);
            else text('X', 0, 10);
        pop();
    } else {
        push();
            if (!mobile) {
                translate(width / 2 + 300, 25);
            } else translate(width / 2 + 100, 25);
            fill(255, 50, 0);
            if (!mobile) ellipse(0, 0, 50);
            else ellipse(0, 0, 25);
            fill(0);
            if (!mobile) textSize(width / 50);
            else textSize(width / 45);
            if (!instruction) text('?', 0, 10);
            else text('X', 0, 10);
        pop();
    }
}

function displayBtn() {
    // <
    push();
        if (!mobile) translate(width / 2 - 250, height / 2);
        else translate(width / 2 - 100, height / 2);
        if(mouseX > width / 2 - 300 && mouseX < width / 2 - 195) {
            if (mouseY > height / 2 - 35 && mouseY < height / 2 + 45) {
                scale(1.2, 1.2);
            }
        }
        scale(width / 2000);
        fill(0, 100);
        triangle(-50, 5, 55, 45, 55, -35);
        fill(200);
        triangle(-50, 0, 50, 40, 50, -40);
    pop();

    // >
    push();
        if (!mobile) translate(width / 2 + 250, height / 2);
        else translate(width / 2 + 100, height / 2);
        if(mouseX < width / 2 + 300 && mouseX > width / 2 + 195) {
            if (mouseY > height / 2 - 35 && mouseY < height / 2 + 45) {
                scale(1.2, 1.2);
            }
        }
        scale(width / 2000);
        fill(0, 100);
        triangle(50, 5, -55, 45, -55, -35);
        fill(200);
        triangle(50, 0, -50, 40, -50, -40);
    pop();
}

function displayVirus() {  
    virusDisplay.show();
    virusDisplay.showGlobalData();
    virusDisplay.showCountries();
    virusDisplay.showDates_Times();

    displayBtn();
    displayInstruction();

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