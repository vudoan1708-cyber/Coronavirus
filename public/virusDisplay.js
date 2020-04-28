class VirusDisplay {
    constructor() {
        this.x = 0;
        this.y = height / 2;
        this.d = 20;
        this.q = 0;
    }

    show() {
        push();
        // translate origin to the centre of a screen
            translate(width / 2, this.y);
            
            // ellipse(0, 0, this.d);
            for (let i = 0; i < newConfirmed.length; i++) {
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
                    
                    let d = dist(mouseX, mouseY, this.x, this.y);
                    if (d < this.d / 2) {
                        console.log("HOVERED");
                    }
                    ellipse(this.x + this.d / 2, 0, totalRecovered[i] * this.d / width);

                    // total deaths
                    fill(255, 0, 0);
                    ellipse(this.x, 0, totalDeaths[i] * this.d / width);

                    // bg 
                    push();
                        noFill();
                        stroke(255, 100);
                        strokeWeight(2.5);
                        beginShape(POINTS);
                        let n = 6, distance = 71;
                            for (let a = 0; a <= 360; a += 0.2) {
                                const k = a * distance * Math.PI / 180;
                                const r = width * sin(n * k);
                                const x = r * cos(a);
                                const y = r * sin(a);
                                rotate(this.q);
                                vertex(x, y);
                            }
                        endShape(CLOSE);
                        if (this.q <= 360) this.q += 0.0000005;
                        else this.q = 0;
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
                        fill(255, 100);
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
                        fill(255, 100);
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
                        fill(255, 100);
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

    showDates_Times() {
        push();
            stroke(0);
            strokeWeight(2);
            fill(100, 100);
            rect(width / 2, 50, this.d * 20, this.d * 5);
            fill(200);
            textSize(width / 60);
            text(days, width / 2, 40);
            textSize(width / 80);
            text(times, width / 2, 70);
        pop();
    }

    showGlobalData() {
        push();
            stroke(0);
            strokeWeight(2);
            fill(50, 100);
            rect(width - (width / (this.d / 5)) / 2, height / 2, width / (this.d / 5), this.d * 50);
            fill(200);

            // global confirmed
            textSize(width / 80);
            fill(255, 100);
            text("Globally Confirmed Cases: " + global_totalConfirmed, (width - (width / (this.d / 5)) / 2), height / 2 - 20);

            // global deaths
            textSize(width / 80);
            fill(255, 0, 0);
            text("Globally Death Cases: " + global_totalDeaths, (width - (width / (this.d / 5)) / 2), height / 2 + 30);

            // global recovered
            textSize(width / 80);
            fill(0, 200, 100);
            text("Globally Recovered Cases: " + global_totalRecovered, (width - (width / (this.d / 5)) / 2), height / 2 + 80);
        pop();
    }
}