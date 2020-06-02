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
    }

    show() {
        if (!this.showCases) {
            push();
            // translate origin to the centre of a screen
                translate(width / 2, this.y);
                
                // ellipse(0, 0, this.d);
                for (let i = 0; i < totalConfirmed.length; i++) {
                    this.x = ((this.d * i)) - (this.d * (gallery_move - 1));
                    // only show one that is at the centre of a screen
                    if (this.x == 0) {
    
                        // total confirmed cases
                        if (totalConfirmed[i] > 100000) {
                            fill(255, 200);
                        } else if (totalConfirmed[i] > 10000 && totalConfirmed[i] <= 100000) {
                            fill(255, 150);
                        } else  fill(255, 80);
                        ellipse(this.x, 0, totalConfirmed[i] * this.d / width);
                        
                        // total recovered
                        if (totalRecovered[i] > 100000) {
                            fill(0, 200, 100);
                        } else if (totalRecovered[i] > 10000 && totalRecovered[i] <= 100000) {
                            fill(0, 200, 100, 150);
                        } else  fill(0, 200, 100, 80);
                        
                        ellipse(this.x + this.d / 2, 0, totalRecovered[i] * this.d / width);
    
                        // total deaths
                        fill(255, 0, 0);
                        ellipse(this.x, 0, totalDeaths[i] * this.d / width);
    
                        // bg 
                        push();
                            noFill();
                            stroke(255, 100);
                            strokeWeight(2.5);
                            if (!mobile) {
                                beginShape(POINTS);
                                let n = 6, distance = 60;
                                    for (let a = 0; a <= 360; a += 0.2) {
                                        const k = a * distance * Math.PI / 180;
                                        const r = width * sin(n * k);
                                        const x = r * cos(a);
                                        const y = r * sin(a);
                                        rotate(this.q);
                                        vertex(x, y);
                                    }
                                endShape(CLOSE);
        
                                stroke(94, 212, 255, 50);
                                beginShape(POINTS);
                                    for (let a = 0; a <= 360; a += 0.2) {
                                        distance = 51;
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
                            } else  { // mobile
                                beginShape(POINTS);
                                    let n = 6, distance = 60;
                                    for (let a = 0; a <= 360; a += 0.2) {
                                        const k = a * distance * Math.PI / 180;
                                        const r = width * 2 * sin(n * k);
                                        const x = r * cos(a);
                                        const y = r * sin(a);
                                        rotate(this.q);
                                        vertex(x, y);
                                    }
                                endShape(CLOSE);
    
                                stroke(94, 212, 255, 50);
                                beginShape(POINTS);
                                    for (let a = 0; a <= 360; a += 0.2) {
                                        distance = 51;
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
                        if (totalConfirmed[i] > 100000) {
                            fill(0, 250);
                            rect(0, this.d * 15.5, width / 3, width / 7);
                            fill(253, 100, 200);
                            textSize(width / countryNames[i]);
                            text(countryNames[i], this.x, this.d * 14);
                            fill(255, 180);
                            text("Total Confirmed Cases: " + totalConfirmed[i], this.x, this.d * 15);
    
                            // total recovered
                            fill(0, 200, 100);
                            text("Total Recovered Cases: " + totalRecovered[i], this.x, this.d * 16);
    
                            // total deaths
                            fill(255, 0, 0);
                            text("Total Death Cases: " + totalDeaths[i], this.x, this.d * 17);
                        } else if (totalConfirmed[i] > 10000 && totalConfirmed[i] <= 100000) {
                            fill(0, 150);
                            rect(0, this.d * 12.5, width / 3, width / 7);
                            fill(253, 100, 200);
                            textSize(width / countryNames[i]);
                            text(countryNames[i], this.x, this.d * 11);
                            fill(255, 180);
                            text("Total Confirmed Cases: " + totalConfirmed[i], this.x, this.d * 12);
                            
                            // total recovered
                            fill(0, 200, 100);
                            text("Total Recovered Cases: " + totalRecovered[i], this.x, this.d * 13);
    
                            
                            // total deaths
                            fill(255, 0, 0);
                            text("Total Death Cases: " + totalDeaths[i], this.x, this.d * 14);
                        } else {
                            fill(0, 150);
                            rect(0, this.d * 10.5, width / 3, width / 7);
                            fill(253, 100, 200);
                            textSize(width / countryNames[i]);
                            text(countryNames[i], this.x, this.d * 9);
                            fill(255, 180);
                            text("Total Confirmed Cases: " + totalConfirmed[i], this.x, this.d * 10);
                            
                            // total recovered
                            fill(0, 200, 100);
                            text("Total Recovered Cases: " + totalRecovered[i], this.x, this.d * 11);
                            
                            // total deaths
                            fill(255, 0, 0);
                            text("Total Death Cases: " + totalDeaths[i], this.x, this.d * 12);
                        }
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
        if (!this.showCases) {
            push();
                stroke(0);
                strokeWeight(2);
                fill(50, 100);
                rect(width - (width / (this.d / 5)) / 2, height / 2, width / (this.d / 5), this.d * 50);
                fill(200);

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
                                    text(countryNames[j], width / 2, height - (height / 5) / 1.5);
                                    fill(255, 180);
                                    text(newConfirmed[j], width / 2, height - (height / 5) / 2.5);
                                    // check if mouse x coordinate is going passed the first rect
                                } else if (mouseX < width - (width - this.d * 5)) { 
                                    text(countryNames[j], width / 2, height - (height / 5) / 1.5);
                                    fill(255, 180);
                                    text(newConfirmed[j], width / 2, height - (height / 5) / 2.5);
                                    // otherwise
                                } else {
                                    text(countryNames[j], newStep, height - (height / 5) / 1.5);
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
            // push total length of countryNames array into this.numbers
            for (let n = 0; n < countryNames.length; n++) {
                this.numbers.push(n + 1);
            }
            push();
                stroke(0);
                strokeWeight(2);
                fill(50, 100);
                rect((width / (this.d / 5)) / 2, height / 2, width / (this.d / 5), this.d * 50);
                fill(255);
                textSize(width / 60);

                let borderBox = 40;
                for (let c = 0; c < countryNames.length; c++) {
                    if (gallery_move > 1 && gallery_move < countryNames.length + 1) {
                        this.country_y = (borderBox * (c + 1)) - (borderBox * (gallery_move - 1));
                    } else this.country_y = borderBox * (c + 1); // to show the first country

                    // highlight a chosen country with purple-ish
                    if (this.country_y == borderBox) fill(253, 100, 200);
                    // otherwise, fill with white with some alpha
                    else fill(255, 200);
                    text(this.numbers[c] + '. ' + countryNames[c], (width / (this.d / 5)) / 2, this.country_y);
                }
            pop();
        }
    }
}