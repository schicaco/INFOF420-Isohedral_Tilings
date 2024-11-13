// Generating the buttons
const buttonContainer = document.getElementById('button-grid');
for (let i = 1; i <= 100; i++) {
    const button = document.createElement('button');
    button.className = 'button';
    buttonContainer.appendChild(button);
}

// Bind click with neighbors 
const buttons = document.querySelectorAll('.button');
buttons.forEach(btn => btn.onclick = function() {
    buttonClick(btn, getNeighbors(btn));
});

function buttonClick(button, neighbors) {
    button.classList.toggle('clicked');
    neighbors.forEach(nb => {
        if (nb[0].classList.contains('clicked')) {
            switch(nb[1]){
                case 'T':
                    button.classList.toggle('top');
                    nb[0].classList.toggle('bottom');
                    break;
                case 'B':
                    button.classList.toggle('bottom');
                    nb[0].classList.toggle('top');
                    break;
                case 'R':
                    button.classList.toggle('right');
                    nb[0].classList.toggle('left');
                    break;
                case 'L':
                    button.classList.toggle('left');
                    nb[0].classList.toggle('right');
                    break;
                default:
                    console.log("Something went wrong");
            }
        }
    });
}

function getNeighbors(button) {
    const neighbors = [];
    const buttons = document.querySelectorAll('.button');
    const buttonIndex = Array.from(buttons).indexOf(button);

    // Get Left, Right, Top, and Bottom Neighbor
    const neighborIndices = [
        [buttonIndex - 1, 'L'],
        [buttonIndex + 1, 'R'],
        [buttonIndex - 10, 'T'],
        [buttonIndex + 10, 'B']
    ];

    const validIndices = neighborIndices.filter(idx => 
        idx[0] >= 0 && 
        idx[0] < buttons.length &&
        (idx[0] === buttonIndex - 10 ||
         idx[0] === buttonIndex + 10 ||
         (idx[0] === buttonIndex - 1 && ~~(idx[0] / 10) === ~~(buttonIndex / 10)) ||
         (idx[0] === buttonIndex + 1 && ~~(idx[0] / 10) === ~~(buttonIndex / 10))
        )
    );

    validIndices.forEach(idx => neighbors.push([buttons[idx[0]], idx[1]]));
    return neighbors;
}

// Submit Button Functionality
function submitGrid() {
    const clickedButtons = document.querySelectorAll('.button.clicked');
    const clickedIndices = Array.from(clickedButtons).map(btn => Array.from(buttons).indexOf(btn));
    alert('Buttons clicked at indices: ' + clickedIndices.join(', '));
    // Here, you could implement form submission or other functionality
}

// Clear Button Functionality
function clearGrid() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => button.classList.remove('clicked', 'top', 'bottom', 'left', 'right'));
}