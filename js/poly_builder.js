// Generating the buttons
const grid = document.getElementById('grid');
for (let i = 1; i <= 100; i++) {
    const cell = document.createElement('button');
    cell.className = 'cell';
    grid.appendChild(cell);
}

// Bind click with neighbors 
const cells = document.querySelectorAll('.cell');
cells.forEach(btn => btn.onclick = function() {
    cellClick(btn, getNeighbors(btn));
});

function cellClick(cell, neighbors) {
    cell.classList.toggle('clicked');
    neighbors.forEach(nb => {
        if (nb[0].classList.contains('clicked')) {
            switch(nb[1]){
                case 'T':
                    cell.classList.toggle('top');
                    nb[0].classList.toggle('bottom');
                    break;
                case 'B':
                    cell.classList.toggle('bottom');
                    nb[0].classList.toggle('top');
                    break;
                case 'R':
                    cell.classList.toggle('right');
                    nb[0].classList.toggle('left');
                    break;
                case 'L':
                    cell.classList.toggle('left');
                    nb[0].classList.toggle('right');
                    break;
                default:
                    console.log("Something went wrong");
            }
        }
    });
}

function getNeighbors(cell) {
    const neighbors = [];
    const cells = document.querySelectorAll('.cell');
    const cellIndex = Array.from(cells).indexOf(cell);

    // Get Left, Right, Top, and Bottom Neighbor
    const neighborIndices = [
        [cellIndex - 1, 'L'],
        [cellIndex + 1, 'R'],
        [cellIndex - 10, 'T'],
        [cellIndex + 10, 'B']
    ];

    const validIndices = neighborIndices.filter(idx => 
        idx[0] >= 0 && 
        idx[0] < cells.length &&
        (idx[0] === cellIndex - 10 ||
         idx[0] === cellIndex + 10 ||
         (idx[0] === cellIndex - 1 && ~~(idx[0] / 10) === ~~(cellIndex / 10)) ||
         (idx[0] === cellIndex + 1 && ~~(idx[0] / 10) === ~~(cellIndex / 10))
        )
    );

    validIndices.forEach(idx => neighbors.push([cells[idx[0]], idx[1]]));
    return neighbors;
}

