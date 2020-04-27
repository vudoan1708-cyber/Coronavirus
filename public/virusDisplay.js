class VirusDisplay {
    constructor() {
        this.x = 0;
        this.y = height / 2;
        this.d = 20;
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

                    // new confirmed cases
                    fill(255, 100);
                    ellipse(this.x, 0, totalConfirmed[i] * this.d / width);

                    // new deaths
                    fill(255, 0, 0);
                    ellipse(this.x, 0, totalDeaths[i] * this.d / width);

                    // information
                    fill(0, 150);
                    rect(0, this.d * 5, width / 5, width / 20);
                    fill(253, 100, 200);
                    textSize(width / countryNames[i]);
                    text(countryNames[i], this.x, this.d * 5);
                    fill(255, 100);
                    text(totalConfirmed[i], this.x, this.d * 6);
                }
            }
            
        pop();
    }
}