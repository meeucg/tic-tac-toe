class TicTacToeField {
    constructor({ size_i, size_j } = { size_i: 3, size_j: 3 }) {
        this.initField({ size_i: size_i, size_j: size_j });
    }

    initField({ size_i, size_j } = { size_i: 3, size_j: 3 }) {
        this.player = false;
        this.move = 0;
        this.size_i = size_i;
        this.size_j = size_j;
        this.x = [];
        this.o = [];
        for (let i = 0; i < size_i; i++) {
            this.x.push([]);
            this.o.push([]);
            for (let j = 0; j < size_j; j++) {
                this.x.at(-1).push(false);
                this.o.at(-1).push(false);
            }
        }
    }

    static numToCoord(num, width = 3) {
        return { i: Math.floor((num - 1) / width), j: (num - 1) % width }
    }

    checkWin(f, currentMove, win) {

        console.log(currentMove);

        let winStack;
        let c = 0;

        for (let u = -1; u <= 1; u++) {
            for (let w = -1; w <= 1; w++) {

                if (u == 0 && w == 0) {
                    continue;
                }

                winStack = [];
                c = 0;

                for (let k = -win + 1; k < win; k++) {

                    let new_i = currentMove.i + k * u;
                    let new_j = currentMove.j + k * w;

                    if ((0 > new_i) || (new_i >= this.size_i)) {
                        continue;
                    }
                    else if ((0 > new_j) || (new_j >= this.size_j)) {
                        continue;
                    }

                    if (f[new_i][new_j]) {
                        c++;
                        winStack.push({ i: new_i, j: new_j });
                        if (c == win) {
                            return { message: `Player ${2 - +this.player} won!`, win: winStack };
                        }
                        continue;
                    }

                    c = 0;
                }
            }
        }

        if (this.move == this.size_i * this.size_j) {
            return { message: `Game over, tie!`, win: undefined };
        }

        return;
    }

    addTicOrTac({ i, j }) {

        let field;
        this.player = !this.player;
        this.move++;

        if (this.player == true) {
            field = this.x;
        }
        else {
            field = this.o;
        }

        field[i][j] = true;
        return this.checkWin(field, { i, j }, 3)
    }

    restartField() {
        this.initField({ size_i: this.size_i, size_j: this.size_j });
    }
}

let allToeElements = document.querySelectorAll('.toe');
const playerText = document.getElementById("player");
const restartButton = document.getElementById("restart-button");
let restartButtonAvailable = true;
const field = new TicTacToeField();

function onMouseEnterToe() {
    console.log(this);
}

function onToeClick() {
    if (field.player) {
        console.log(field.move);
        this.setAttribute('class', 'tic-enabled');
    }
    else {
        console.log(field.move);
        this.setAttribute('class', 'tac-enabled');
    }

    let currentMove = field.addTicOrTac(TicTacToeField.numToCoord(this.id));

    if (currentMove) {
        playerText.textContent = currentMove.message;
        removeToeListeners();
        allToeElements.forEach((element) => {
            if (element.className === "tic-enabled") {
                element.setAttribute("class", "tic-disabled");
            }
            else if (element.className === "tac-enabled") {
                element.setAttribute("class", "tac-disabled");
            }
        });
        return;
    }

    playerText.textContent = `Player: ${+field.player + 1}`;
}

function applyToeListeners() {
    allToeElements.forEach(element => {
        element.addEventListener('click', onToeClick, { once: true });
        element.addEventListener('mouseenter', onMouseEnterToe);
    });
}

function removeToeListeners() {
    allToeElements.forEach(element => {
        element.removeEventListener('click', onToeClick);
        element.removeEventListener('mouseenter', onMouseEnterToe);
    });
}

applyToeListeners();

restartButton.addEventListener("click", function onRestart() {
    if (!restartButtonAvailable) {
        return;
    }
    restartButtonAvailable = false;

    allToeElements.forEach((element) => {
        element.setAttribute("class", "toe");
    });

    field.restartField();
    removeToeListeners();
    applyToeListeners();
    playerText.textContent = `Player: ${+field.player + 1}`;

    restartButtonAvailable = true;
});

console.log("executed");
