class VirusDisplay {
    constructor() {
        this.x = 0;
        this.y = height / 2;
        this.d = 20;
        this.q = 0;

        // create an empty array with the length of newConfirmed
        this.numbers = Array(newConfirmed.length);

        // for countries's names
        this.country_y = 0;

        // for better computational performances (when menu shows, stop other stuff in the bg)
        this.showCases = false;

        // radio button radius
        if (!mobile) this.rr = 15;
        else this.rr = 10;
    }

    show() {
        if (!this.showCases) {
            push();

            // translate origin to the centre of a screen
                translate(width / 2, this.y);

                noStroke();

                for (let i = 0; i < virusData.Countries.length; i++) {
                    this.x = ((this.d * i)) - (this.d * (gallery_move - 1));

                    let perC = virusData.Countries[i].TotalConfirmed / (width * 20),
                        perR = virusData.Countries[i].TotalRecovered / (width * 20),
                        perD = virusData.Countries[i].TotalDeaths / (width * 4);

                    // only show one that is at the centre of a screen
                    if (this.x == 0) {

                        // total confirmed cases
                        fill(255, 200);
                        beginShape();
                        for (let a = 0; a < 360; a++) {
                            let r = perC + random(-2, 2),
                                x = r * cos(a),
                                y = r * sin(a);
                            vertex(x, y);
                        }
                        endShape(CLOSE);
                        // ellipse(this.x, 0, perC);
                        
                        // total recovered
                        fill(0, 200, 100);
                        beginShape();
                        for (let a = 0; a < 360; a++) {
                            let r1 = perR + random(-2, 2),
                                x1 = r1 * cos(a),
                                y1 = r1 * sin(a);
                            vertex(x1, y1);
                        }
                        endShape(CLOSE);
                        
                        // ellipse(this.x + this.d / 2, 0, perR);
    
                        // total deaths
                        fill(255, 0, 0);
                        beginShape();
                        for (let a = 0; a < 360; a++) {
                            let r2 = perD + random(-2, 2),
                                x2 = r2 * cos(a),
                                y2 = r2 * sin(a);
                            vertex(x2, y2);
                        }
                        endShape(CLOSE);
                        // ellipse(this.x, 0, perD);
    
                        // bg 
                        push();
                            noFill();
                            stroke(255, 100);
                            strokeWeight(2.5);

                            if (!mobile) {
        
                                stroke(94, 212, 255, 50);
                                beginShape(POINTS);
                                    for (let a = 0; a <= 360; a += 0.2) {
                                        let n = 6, distance = 51;
                                        const k = a * distance * Math.PI / 180;
                                        const r = width / 2 * sin(n * k);
                                        const x = r * cos(a);
                                        const y = r * sin(a);
                                        rotate(this.q);
                                        vertex(x, y);
                                    }
                                endShape(CLOSE);
                                if (this.q <= 360) this.q += 0.0000009;
                                else this.q = 0;

                            // mobile
                            } else  { 
    
                                stroke(94, 212, 255, 50);
                                beginShape(POINTS);
                                    for (let a = 0; a <= 360; a += 0.2) {
                                        let n = 6, distance = 51;
                                        const k = a * distance * Math.PI / 180;
                                        const r = width * sin(n * k);
                                        const x = r * cos(a);
                                        const y = r * sin(a);
                                        rotate(this.q);
                                        vertex(x, y);
                                    }
                                endShape(CLOSE);
                                if (this.q <= 360) this.q += 0.0000009;
                                else this.q = 0;
                            }
                            
                        pop();
    
                        // information
                        strokeWeight(2);
                        stroke(0);
                        fill(0, 150);
                        rect(0, this.d * 12.5, width / 3, width / 7);
                        fill(253, 100, 200);
                        textSize(10);
                        text(virusData.Countries[i].Country, this.x, this.d * 11);
                        
                        fill(255, 180);
                        if (sort == 0 || sort == 1)
                            text("Total Confirmed Cases: " + virusData.Countries[i].TotalConfirmed, this.x, this.d * 12);
                        else if (sort == 2) text("Total Confirmed Cases: " + virusData.Countries[i].TotalConfirmed, this.x, this.d * (14));
                        else if (sort == 3) text("Total Confirmed Cases: " + virusData.Countries[i].TotalConfirmed, this.x, this.d * (13));

                        // total recovered
                        fill(0, 200, 100);
                        if (sort == 3)
                            text("Total Recovered Cases: " + virusData.Countries[i].TotalRecovered, this.x, this.d * (12));
                        else text("Total Recovered Cases: " + virusData.Countries[i].TotalRecovered, this.x, this.d * 13);

                        // total deaths
                        fill(255, 0, 0);
                        if (sort == 2)
                            text("Total Death Cases: " + virusData.Countries[i].TotalDeaths, this.x, this.d * (12));
                        else text("Total Death Cases: " + virusData.Countries[i].TotalDeaths, this.x, this.d * 14);

                        
                        // percentage
                        textSize(width / 40);
                        fill(255, 180);
                        text(Number(virusData.Countries[i].TotalConfirmed * 100 / global_totalConfirmed).toFixed(4) + '%', this.x, -200);

                        fill(0, 200, 100);
                        text(Number(virusData.Countries[i].TotalRecovered * 100 / global_totalRecovered).toFixed(4) + '%', this.x, -100);

                        fill(255, 0, 0);
                        text(Number(virusData.Countries[i].TotalDeaths * 100 / global_totalDeaths).toFixed(4) + '%', this.x, 0);
                    }
                }
                // end of for loop
            pop();
        }
    }

    showDates_Times() {
        push();
            stroke(0);
            strokeWeight(2);
            fill(100, 100);
            rect(width / 2, 50, width / 5, this.d * 5);
            fill(200);
            textSize(width / 60);
            text(days, width / 2, 40);
            textSize(width / 80);
            text(times, width / 2, 70);
        pop();
    }

    showGlobalData() {
        let h1, h2, h3, h4, h_title;

        if (!this.showCases) {
            push();
                stroke(0);
                strokeWeight(2);
                fill(50, 100);
                rect(width - (width / (this.d / 5)) / 2, height / 2, width / (this.d / 5), this.d * 50);
                
                noStroke();
                ellipseMode(CENTER);

                // radio buttons

                let d1 = dist(mouseX, mouseY, width - (width / (virusDisplay.d / 5)) + 50, height / 2 - height / 2.75),
                    d2 = dist(mouseX, mouseY, width - (width / (virusDisplay.d / 5)) + 50, height / 2 - height / 3.25),
                    d3 = dist(mouseX, mouseY, width - (width / (virusDisplay.d / 5)) + 50, height / 2 - height / 4),
                    d4 = dist(mouseX, mouseY, width - (width / (virusDisplay.d / 5)) + 50, height / 2 - height / 5.25);
                    
                // declaring variables
                if (!mobile) {
                    h1 = height / 2 - height / 2.75;
                    h2 = height / 2 - height / 3.25;
                    h3 = height / 2 - height / 4;
                    h4 = height / 2 - height / 5.25;
                    h_title = height / 2 - height / 2 + width / 25;
                } else {
                    h1 = height / 2 - height / 2.9;
                    h2 = height / 2 - height / 3.5;
                    h3 = height / 2 - height / 4.25;
                    h4 = height / 2 - height / 5.75;
                    h_title = height / 2 - height / 2 + width / 5;
                }

                if (sort == 0) fill(253, 100, 200);
                else {
                    if (d1 < this.rr / 2) fill(150);
                    else fill(255);
                }
                ellipse(width - (width / (this.d / 5)) + 50, h1, this.rr);

                // confirmed cases
                if (sort == 1) fill(253, 100, 200);
                else {
                    if (d2 < this.rr / 2) fill(150);
                    else fill(255);
                }
                ellipse(width - (width / (this.d / 5)) + 50, h2, this.rr);

                // death cases
                if (sort == 2) fill(253, 100, 200);
                else {
                    if (d3 < this.rr / 2) fill(150);
                    else fill(255);
                }
                ellipse(width - (width / (this.d / 5)) + 50, h3, this.rr);

                // recovered cases
                if (sort == 3) fill(253, 100, 200);
                else {
                    if (d4 < this.rr / 2) fill(150);
                    else fill(255);
                }
                ellipse(width - (width / (this.d / 5)) + 50, h4, this.rr);
                
                // sort
                textSize(width / 45);
                fill(200);
                text('Sort By', (width - (width / (this.d / 5)) / 2), h_title);

                // country's names
                textSize(width / 70);
                fill(200);
                text("Country's Names (A - Z)", (width - (width / (this.d / 5)) / 2), height / 2 - height / 2.75);

                // confirmed cases
                fill(200);
                text("Total Confirmed Cases", (width - (width / (this.d / 5)) / 2), height / 2 - height / 3.25);

                // death cases
                fill(200);
                text("Total Death Cases", (width - (width / (this.d / 5)) / 2), height / 2 - height / 4);

                // recovered cases
                fill(200);
                text("Total Recovered Cases", (width - (width / (this.d / 5)) / 2), height / 2 - height / 5.25);

                // global confirmed
                textSize(width / 72);
                fill(255, 180);
                text("Global Confirmed Cases: " + global_totalConfirmed, (width - (width / (this.d / 5)) / 2), height / 2 - 20);

                // global recovered
                fill(0, 200, 100);
                text("Global Recovered Cases: " + global_totalRecovered, (width - (width / (this.d / 5)) / 2), height / 2 + 30);

                // global deaths
                fill(255, 0, 0);
                text("Global Death Cases: " + global_totalDeaths, (width - (width / (this.d / 5)) / 2), height / 2 + 80);
            pop();
        }
    }

    showNewCases() {
        // button pressed, show the menu for all new cases
        push();
            if (this.showCases) {
                push();
                    translate(width / 2, height / 2);
                    fill(0, 150);
                    rect(0, 0, width, height);
                    fill(0);
                    stroke(255);
                    strokeWeight(2);
                    rect(0, 0, (width - this.d * 5) + 100, height - this.d * 5);
                pop();
                fill(220);
                textSize(width / 50);
                strokeWeight(1.5);
                stroke(0);
                for (let j = 0; j < newConfirmed.length; j++) {
                    // check if newConfirmed is a number and if it's larger than 0
                    if ( !isNaN(Number(newConfirmed[j])) && newConfirmed[j] > 0 ) {
                        const newWidth = width / 120;
                        let newStep;
                        rectMode(CORNER);
                        // move graph visualisation
                        if (graph_move > 1 && graph_move < 3) {
                            newStep = j * newWidth - (width - this.d * 5) - 100;
                        } else newStep = j * newWidth;

                        // show countries and change fill when on hover
                        if (mouseX > newStep && mouseX < newStep + newWidth) {
                            if (mouseY > height - (height - this.d * 5 / 2) && mouseY < height - this.d * 5 / 2) {
                                // for filling the text
                                fill(253, 100, 100);
                                textSize(width / 75);
                                // check if mouse x coordinate is going over the new cases button
                                if (mouseX > width - width / (this.d / 5) && mouseX < width) {
                                    text(virusData.Countries[j].Country, width / 2, height - (height / 5) / 1.5);
                                    fill(255, 180);
                                    text(newConfirmed[j], width / 2, height - (height / 5) / 2.5);
                                    // check if mouse x coordinate is going passed the first rect
                                } else if (mouseX < width - (width - this.d * 5)) { 
                                    text(virusData.Countries[ij].Country, width / 2, height - (height / 5) / 1.5);
                                    fill(255, 180);
                                    text(newConfirmed[j], width / 2, height - (height / 5) / 2.5);
                                    // otherwise
                                } else {
                                    text(virusData.Countries[j].Country, newStep, height - (height / 5) / 1.5);
                                    fill(255, 180);
                                    text(newConfirmed[j], newStep, height - (height / 5) / 2.5);
                                }

                                // filling the rects
                                fill(253, 100, 200);
                            } else { // checking y
                                if (newConfirmed[j] <= 150) {
                                    fill(255, 150);
                                } else if (newConfirmed[j] > 150 && newConfirmed[j] < 400) {
                                    fill(255, 180);
                                } else if (newConfirmed[j] >= 400 && newConfirmed[j] < 800) {
                                    fill(255, 200);
                                } else {
                                    fill(255, 220);
                                }
                            }
                            
                        } else { // checking x
                            if (newConfirmed[j] <= 150) {
                                fill(255, 150);
                            } else if (newConfirmed[j] > 150 && newConfirmed[j] < 400) {
                                fill(255, 180);
                            } else if (newConfirmed[j] >= 400 && newConfirmed[j] < 800) {
                                fill(255, 200);
                            } else {
                                fill(255, 220);
                            }
                        }
                        
                        // constrain the horizontal limit that data can be shown on the menu
                        if (newStep > (width - (width - this.d * 5)) - 100 && newStep < (width - this.d * 5) + 100) {
                            rect(newStep, height - (height / 5), newWidth, -newConfirmed[j]);
                        }
                    }
                }
            }
        pop();
        
        // button for showcasing new cases
        push();
            translate(width - (width / (this.d / 5)) / 2, height - (height / 5) / 2);
            // hover the show cases button
            if (!this.showCases) {
                if (!mobile) {
                    if (mouseX > width - width / (this.d / 5) && mouseX < width) {
                        if (mouseY > height - (height / 5) && mouseY < height) {
                            if (!instruction) {
                                stroke(255);
                                strokeWeight(1.5);
                                fill(20);
                                rect(0, 0, width / (this.d / 5), height / 5);
                                fill(220, 220);
                                textSize(width / 50);
                                text('New Confirmed Cases', 0, 0);
                            } else {
                                stroke(0, 200);
                                strokeWeight(2);
                                fill(0);
                                rect(0, 0, width / (this.d / 5), height / 5);
                                fill(220, 220);
                                textSize(width / 50);
                                text('New Confirmed Cases', 0, 0);
                            }
                            
                        } else { // for checking y
                            stroke(0, 200);
                            strokeWeight(2);
                            fill(0);
                            rect(0, 0, width / (this.d / 5), height / 5);
                            fill(220, 220);
                            textSize(width / 50);
                            text('New Confirmed Cases', 0, 0);
                        }
                    } else { // for checking x
                        stroke(0, 200);
                        strokeWeight(2);
                        fill(0);
                        rect(0, 0, width / (this.d / 5), height / 5);
                        fill(220, 220);
                        textSize(width / 50);
                        text('New Confirmed Cases', 0, 0);
                    }
                } else { // mobile
                    stroke(0, 200);
                    strokeWeight(2);
                    fill(0);
                    rect(0, 0, width / (this.d / 5), height / 5);
                    fill(220, 220);
                    textSize(width / 50);
                    text('New Confirmed Cases', 0, 0);
                }
            } else {
                if (!mobile) {
                    if (mouseX > width - width / (this.d / 5) && mouseX < width) {
                        if (mouseY > height - (height / 5) && mouseY < height) {
                            if (!instruction) {
                                stroke(255);
                                strokeWeight(1.5);
                                fill(20);
                                rect(0, 0, width / (this.d / 5), height / 5);
                                fill(220, 220);
                                textSize(width / 50);
                                text('X', 0, 0);
                            } else {
                                stroke(0, 200);
                                strokeWeight(2);
                                fill(0);
                                rect(0, 0, width / (this.d / 5), height / 5);
                                fill(220, 220);
                                textSize(width / 50);
                                text('X', 0, 0);
                            }
                            
                        } else { // for checking y
                            stroke(0, 200);
                            strokeWeight(2);
                            fill(0);
                            rect(0, 0, width / (this.d / 5), height / 5);
                            fill(220, 220);
                            textSize(width / 50);
                            text('X', 0, 0);
                        }
                    } else { // for checking x
                        stroke(0, 200);
                        strokeWeight(2);
                        fill(0);
                        rect(0, 0, width / (this.d / 5), height / 5);
                        fill(220, 220);
                        textSize(width / 50);
                        text('X', 0, 0);
                    }
                } else { // mobile
                    stroke(0, 200);
                    strokeWeight(2);
                    fill(0);
                    rect(0, 0, width / (this.d / 5), height / 5);
                    fill(220, 220);
                    textSize(width / 50);
                    text('X', 0, 0);
                }
            }
        pop();
    }

    showNewCases_Btn() {
        if (this.showCases) {
            // <
            push();
                if (!mobile) translate(width / 2 - 250, height - (height / 25));
                else translate(width / 2 - 50, height - (height / 25));
                if(mouseX > width / 2 - 300 && mouseX < width / 2 - 195) {
                    if (mouseY > height - (height / 25) - 35 && mouseY < height - (height / 25) + 45) {
                        scale(1.2, 1.2);
                    }
                }
                scale(width / 2800);
                fill(0, 100);
                triangle(-50, 5, 55, 45, 55, -35);
                fill(200);
                triangle(-50, 0, 50, 40, 50, -40);
            pop();

            // >
            push();
                if (!mobile) translate(width / 2 + 250, height - (height / 25));
                else translate(width / 2 + 50, height - (height / 25));
                if(mouseX < width / 2 + 300 && mouseX > width / 2 + 195) {
                    if (mouseY > height - (height / 25) - 35 && mouseY < height - (height / 25) + 45) {
                        scale(1.2, 1.2);
                    }
                }
                scale(width / 2800);
                fill(0, 100);
                triangle(50, 5, -55, 45, -55, -35);
                fill(200);
                triangle(50, 0, -50, 40, -50, -40);
            pop();
        }
    }

    showCountries() {
        if (!this.showCases) {
            push();
                stroke(0);
                strokeWeight(2);
                fill(50, 100);
                rect((width / (this.d / 5)) / 2, height / 2, width / (this.d / 5), this.d * 50);
                fill(255);
                textSize(width / 60);

                let borderBox = 40;
                for (let c = 0; c < virusData.Countries.length; c++) {

                    // push total length of virusData.Countries array into this.numbers
                    this.numbers.push(c + 1);
                    if (gallery_move > 1 && gallery_move < virusData.Countries.length + 1) {
                        this.country_y = (borderBox * (c + 1)) - (borderBox * (gallery_move - 1));
                    } else this.country_y = borderBox * (c + 1); // to show the first country

                    // highlight a chosen country with purple-ish
                    if (this.country_y == borderBox) fill(253, 100, 200);
                    
                    // otherwise, fill with white with some alpha
                    else fill(255, 200);
                    text(this.numbers[c] + '. ' + virusData.Countries[c].Country, (width / (this.d / 5)) / 2, this.country_y);
                }
            pop();
        }
    }
}