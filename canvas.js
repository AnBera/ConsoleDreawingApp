var _qum = require('./queue.js');

//start with background empty and default line color as x
var pixel = ' ',
    dot = 'x';


var canvas = function (width, height) {
    this.canvasMatrix = [],
    this.visitedMatrix = [],
    this.width = parseInt(width),
    this.height = parseInt(height);
};

canvas.prototype.initilizeCanvas = function () {
    //create two w x n matrix and initialize with space and 0 respectively 
    for (let i = 0; i < this.height; i++) {
        let canvasRow = [], visitedRow = [];
        for (let j = 0; j < this.width; j++) {
            canvasRow.push(pixel);
            visitedRow.push(0);
        }
        this.canvasMatrix.push(canvasRow);
        this.visitedMatrix.push(visitedRow);
    }
}

var resetMatrix = function (matrix, width, height) {
    //in future it will be a utility function which will take color also as a parameter
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            matrix[i][j] = 0;
        }
    }
}

canvas.prototype.renderCanvas = function () {
    //responsible for rendering the matrix in console with appropriate left and right border
    for (let i = 0; i < this.height; i++) {
        let canvasRow = '|', horzDivider = '--';
        for (let j = 0; j < this.width; j++) {
            canvasRow += this.canvasMatrix[i][j];
            horzDivider += '-';
        }
        if (i === 0)
            console.log(horzDivider);

        console.log(canvasRow + '|');

        if (i === this.height - 1)
            console.log(horzDivider);
    }
};

canvas.prototype.createLine = function (x1, y1, x2, y2) {
    x1 = parseInt(x1); y1 = parseInt(y1); x2 = parseInt(x2); y2 = parseInt(y2);

    for (let i = y1; i <= y2; i++) {
        for (let j = x1; j <= x2; j++) {
            this.canvasMatrix[i - 1][j - 1] = dot;
        }
    }
};

canvas.prototype.createRect = function (x1, y1, x2, y2) {
    x1 = parseInt(x1); y1 = parseInt(y1); x2 = parseInt(x2); y2 = parseInt(y2);

    this.createLine(x1, y1, x2, y1);
    this.createLine(x1, y2, x2, y2);
    this.createLine(x1, y1, x1, y2);
    this.createLine(x2, y1, x2, y2);
};

canvas.prototype.fill = function (x, y, color) {
    x = parseInt(x); y = parseInt(y);
    var that = this, pixelContent = this.canvasMatrix[y - 1][x - 1];

    //eligible Pixel Condition
    var check_validity = function (x, y) {
        //boundary condition
        if (x > 0 && x < that.width + 1 && y > 0 && y < that.height + 1) {
            //if the color is same as the starting fill coordinate and if its not visited        
            if (that.canvasMatrix[y - 1][x - 1] == pixelContent && that.visitedMatrix[y - 1][x - 1] == 0) {
                return true;
            }
        }
        return false;
    };

    var paint = function (x, y) {
        that.canvasMatrix[y - 1][x - 1] = color;
    };

    //start with a fresh visited matrix, everytime fill is called
    resetMatrix(this.visitedMatrix, this.width, this.height);

    var q = new _qum.queue();
    //insert the first pixel coordinates in queue
    q.enqueue([x, y]);
    //this matrix will take note of all the visited node so that we dont visit it agian
    this.visitedMatrix[y - 1][x - 1] = 1;

    //run untill the queue is exhausted
    while (!q.isEmpty()) {
        let pos = q.dequeue(),
            x1 = pos[0],
            y1 = pos[1];

        //paint the pixel
        paint(x1, y1);

        //check for adjecent 4 pixels - right, left, top, bottom
        if (check_validity(x1 + 1, y1)) {
            q.enqueue([x1 + 1, y1]);
            that.visitedMatrix[y1 - 1][x1] = 1;
        }

        if (check_validity(x1 - 1, y1)) {
            q.enqueue([x1 - 1, y1]);
            that.visitedMatrix[y1 - 1][x1 - 2] = 1;
        }


        if (check_validity(x1, y1 + 1)) {
            q.enqueue([x1, y1 + 1]);
            that.visitedMatrix[y1][x1 - 1] = 1;
        }


        if (check_validity(x1, y1 - 1)) {
            q.enqueue([x1, y1 - 1]);
            that.visitedMatrix[y1 - 2][x1 - 1] = 1;
        }

    }

}

exports.canvas = canvas;