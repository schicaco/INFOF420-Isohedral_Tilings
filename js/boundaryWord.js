function getBoundaryWord(indexes, numCols) {
    // Convert indexes to row and column coordinates
    const cells = indexes.map(index => ({
      row: Math.floor(index / numCols),
      col: index % numCols,
    }));
  
    // Sort cells lexicographically (by row, then column)
    cells.sort((a, b) => a.row - b.row || a.col - b.col);
  
    // Helper to determine neighbors (4-connectivity)
    const neighbors = (row, col) => [
      { row: row - 1, col, dir: 'u' }, // up
      { row, col: col + 1, dir: 'r' }, // right
      { row: row + 1, col, dir: 'd' }, // down
      { row, col: col - 1, dir: 'l' }, // left
    ];
  
    // Use a set for quick lookup
    const cellSet = new Set(indexes);
  
    // Find boundary word
    const boundaryWord = [];
    const visitedEdges = new Set();
  
    // Find the starting cell (top-leftmost cell)
    const start = cells[0];
  
    // Start traversal from the top-left corner of the first cell
    let current = { row: start.row, col: start.col };
    let direction = 0; // Initially facing "up" (arbitrarily chosen)
  
    do {
      const currentIndex = current.row * numCols + current.col;
  
      for (let i = 0; i < 4; i++) {
        const newDirection = (direction + i) % 4;
        const neighbor = neighbors(current.row, current.col)[newDirection];
  
        const edgeKey = `${current.row},${current.col}-${neighbor.row},${neighbor.col}`;
        if (
          cellSet.has(neighbor.row * numCols + neighbor.col) &&
          !visitedEdges.has(edgeKey)
        ) {
          // Move to this neighbor
          visitedEdges.add(edgeKey);
          boundaryWord.push(neighbor.dir);
          current = neighbor;
          direction = (newDirection + 2) % 4; // Reverse direction for clockwise traversal
          break;
        }
      }
    } while (
      current.row !== start.row ||
      current.col !== start.col ||
      boundaryWord.length === 0
    );
  
    return boundaryWord.join('');
  }




// Submit cell Functionality
function submitGrid() {
    const clickedcells = document.querySelectorAll('.cell.clicked');
    const clickedIndices = Array.from(clickedcells).map(btn => Array.from(cells).indexOf(btn));
    alert('cells clicked at indices: ' + clickedIndices.join(', '));
    // Here, you could implement form submission or other functionality

    const numCols = 10; // Assume a 10-column grid
    const boundaryWord = getBoundaryWord(indexes, numCols);
    console.log(boundaryWord); // Output: the boundary word
}

// Clear cell Functionality
function clearGrid() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('clicked', 'top', 'bottom', 'left', 'right'));
}