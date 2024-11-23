let allToeElements = document.querySelectorAll('.toe');
const playerText = document.getElementById("player");
const restartButton = document.getElementById("restart-button");

let player = false;

// class Field {
//     field = [[false, false, false],
//     [false, false, false],
//     [false, false, false]];

//     addTic(i, j) {
//         rows[i]++;
//         if (rows[i] == 3) {
//             return true;
//         }
//         cols[j]++;

//         if (rows[i] == 3) {
//             return true;
//         }

//         if (
//             rows[0] > 0 &&
//             rows[1] > 0 &&
//             rows[2] > 0 &&
//             cols[0] > 0 &&
//             cols[1] > 0 &&
//             cols[2] > 0
//         ) {
//             return true;
//         }

//         return false;
//     }
// }

function onToeClick(element) {
    return () => {
        if (player) {
            element.setAttribute('class', 'tic');
        }
        else {
            element.setAttribute('class', 'tac');
        }
        player = !player;
        playerText.textContent = `Player: ${+player + 1}`;
    }
}

function applyToeListeners() {
    allToeElements.forEach(element => {
        element.addEventListener('click', onToeClick(element), { once: true });
    });
}

function removeToeListeners() {
    allToeElements.forEach(element => {
        element.removeEventListener('click', onToeClick(element));
    });
}

applyToeListeners();

restartButton.addEventListener("click", function onRestart() {
    allToeElements.forEach((element) => {
        element.setAttribute("class", "toe");
        player = false;
        playerText.textContent = `Player: ${+player + 1}`
        removeToeListeners();
        applyToeListeners();
    });
});

console.log("executed");
