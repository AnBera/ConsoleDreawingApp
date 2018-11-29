var _cvm = require('./canvas.js');
var readline = require('readline');
var cvObj;

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'enter command: '
});

rl.prompt();
rl.on('line', function (command) {
    var cmdArr = command.trim().split(' ');
    switch (cmdArr[0]) {
        case 'C':
            if (cmdArr.length === 3) {
                if (isNaN(cmdArr[1]) || isNaN(cmdArr[2])) {
                    console.log('Input must be space separated numbers');
                    break;
                }
                if (parseInt(cmdArr[1]) < 1 || parseInt(cmdArr[2]) < 1) {
                    console.log('Canvas area must be greater than zero');
                    break;
                }
                cvObj = new _cvm.canvas(cmdArr[1], cmdArr[2]);
                cvObj.initilizeCanvas();
                cvObj.renderCanvas();
            } else {
                console.log('Bad day! You might want to check the input signature');
            }
            break;
        case 'L':
            if (!cvObj) {
                console.log('You need to first create a canvas');
                break;
            }
            if (cmdArr.length === 5) {
                if (isNaN(cmdArr[1]) || isNaN(cmdArr[2]) || isNaN(cmdArr[3]) || isNaN(cmdArr[4])) {
                    console.log('Input must be space separated numbers');
                    break;
                }
                if (parseInt(cmdArr[1]) < 1 || parseInt(cmdArr[1]) > cvObj.width || parseInt(cmdArr[2]) < 1 || parseInt(cmdArr[2]) > cvObj.height
                    || parseInt(cmdArr[3]) < 1 || parseInt(cmdArr[3]) > cvObj.width || parseInt(cmdArr[4]) < 1 || parseInt(cmdArr[4]) > cvObj.height
                    || parseInt(cmdArr[1]) > parseInt(cmdArr[3]) || parseInt(cmdArr[2]) > parseInt(cmdArr[4])) {
                    console.log('Input is not in correct format. x1,y1,x2,y2 should be inside the canvas area and x2>x1 & y2>y1');
                    break;
                }
                if (parseInt(cmdArr[1]) !== parseInt(cmdArr[3]) && parseInt(cmdArr[2]) !== parseInt(cmdArr[4])) {
                    console.log('For the time being only straight line is supported :-|');
                    break;
                }
                cvObj.createLine(cmdArr[1], cmdArr[2], cmdArr[3], cmdArr[4]);
                cvObj.renderCanvas();
            } else {
                console.log('Bad day! You might want to check the input signature');
            }
            break;
        case 'R':
            if (!cvObj) {
                console.log('You need to first create a canvas');
                break;
            }
            if (cmdArr.length === 5) {
                if (isNaN(cmdArr[1]) || isNaN(cmdArr[2]) || isNaN(cmdArr[3]) || isNaN(cmdArr[4])) {
                    console.log('Input must be space separated numbers');
                    break;
                }
                if (parseInt(cmdArr[1]) < 1 || parseInt(cmdArr[1]) > cvObj.width || parseInt(cmdArr[2]) < 1 || parseInt(cmdArr[2]) > cvObj.height
                    || parseInt(cmdArr[3]) < 1 || parseInt(cmdArr[3]) > cvObj.width || parseInt(cmdArr[4]) < 1 || parseInt(cmdArr[4]) > cvObj.height
                    || parseInt(cmdArr[1]) > parseInt(cmdArr[3]) || parseInt(cmdArr[2]) > parseInt(cmdArr[4])) {
                    console.log('Input is not in correct format. x1,y1,x2,y2 should be inside the canvas area and x2>x1 & y2>y1');
                    break;
                }
                cvObj.createRect(cmdArr[1], cmdArr[2], cmdArr[3], cmdArr[4]);
                cvObj.renderCanvas();
            } else {
                console.log('Bad day! You might want to check the input signature');
            }
            break;
        case 'B':
            if (!cvObj) {
                console.log('You need to first create a canvas');
                break;
            }
            if (cmdArr.length === 4) {
                if (isNaN(cmdArr[1]) || isNaN(cmdArr[2])) {
                    console.log('Input must be space separated numbers');
                    break;
                }
                if (parseInt(cmdArr[1]) < 1 || parseInt(cmdArr[1]) > cvObj.width || parseInt(cmdArr[2]) < 1 || parseInt(cmdArr[2]) > cvObj.height) {
                    console.log('Input is not in correct format. x1,y1 should be inside the canvas area');
                    break;
                }
                cvObj.fill(cmdArr[1], cmdArr[2], cmdArr[3]);
                cvObj.renderCanvas();
            } else {
                console.log('Bad day! You might want to check the input signature');
            }
            break;
        case 'Q':
            console.log('Bye Bye!');
            process.exit(0);
            break;
        default:
            console.log('===========');
            console.log('BAD COMMAND');
            console.log('===========');
            console.log('Available Options Are');
            console.log('C <width> <height>');
            console.log('L <x1> <y1> <x2> <y2>');
            console.log('R <x1> <y1> <x2> <y2>');
            console.log('B <x> <y> <color> ');
            console.log('Q');
            break;
    }
    rl.prompt();
}).on('close', () => {
    console.log('Bye Bye!');
    process.exit(0);
});

