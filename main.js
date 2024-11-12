// Function to add content dynamically
function content() {
    const mainContent = document.getElementById('mainContent');
    
    // Create and add a title
    const title = document.createElement('h1');
    title.textContent = 'Isohedral Tilings & Folding Tiles';
    title.style.textAlign = "center"
    mainContent.appendChild(title);
    
    // Create and add an introduction
    const intro = document.createElement('h2');
    intro.textContent = 'Introduction';
    mainContent.appendChild(intro);
    
    // Create and add additional text
    const text = document.createElement('p');
    text.textContent = 'This project focuses on expanding the study of isohedral tilings by developing algorithms to identify and transform specific classes of tiles. \n We will focus in two phase: \n - Detecting Isohedral Tiles with Rotational Symmetries: ... \n - Folding the Tile into a Doubly-Covered Triangle: ...  ';
    mainContent.appendChild(text);

    const phase1 = document.createElement('h2');
    phase1.textContent = "1. Detecting Isohedral Tiles with Rotational Symmetries"
    mainContent.appendChild(phase1)

    createButtonGrid(mainContent)
}

// Add content when the page loads
window.onload = content;

