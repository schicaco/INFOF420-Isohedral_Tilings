// Function to create a button grid
function createButtonGrid(container) {
    // Create and add the button grid container
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'button-grid';
    buttonContainer.className = 'button-grid';
    container.appendChild(buttonContainer);

    // Generate 100 buttons inside the button container
    for (let i = 1; i <= 100; i++) {
        const button = document.createElement('button');
        button.className = 'button';
        buttonContainer.appendChild(button);
    }

    // Attach event listeners to buttons (example from previous logic)
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(btn => btn.onclick = function() {
        buttonClick(btn, getNeighbors(btn));
    });
}

// Example button interaction logic (adjust as needed)
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

    // Get Left, Right, Top, and Bottom Neighbors
    const neighborIndices = [
        [buttonIndex - 1, 'L'],
        [buttonIndex + 1, 'R'],
        [buttonIndex - 10, 'T'],
        [buttonIndex + 10, 'B']
    ];

    const validIndices = neighborIndices.filter(idx => 
        idx[0] >= 0 && 
        idx[0] < buttons.length &&
        (idx[0] == buttonIndex - 10 ||
         idx[0] == buttonIndex + 10 ||
         (idx[0] == buttonIndex - 1 && Math.floor(idx[0] / 10) == Math.floor(buttonIndex / 10)) ||
         (idx[0] == buttonIndex + 1 && Math.floor(idx[0] / 10) == Math.floor(buttonIndex / 10))
        )
    );

    validIndices.forEach(idx => neighbors.push([buttons[idx[0]], idx[1]]));
    return neighbors;
}