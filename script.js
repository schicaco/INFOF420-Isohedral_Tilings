// Function to add content dynamically
function addContent() {
    const mainContent = document.getElementById('mainContent');
    
    // Create and add a title
    const title = document.createElement('h1');
    title.textContent = 'Welcome to the Dynamic Page!';
    mainContent.appendChild(title);
    
    // Create and add an introduction
    const intro = document.createElement('p');
    intro.textContent = 'This page demonstrates how to use JavaScript to dynamically add content.';
    mainContent.appendChild(intro);
    
    // Create and add additional text
    const text = document.createElement('p');
    text.textContent = 'Feel free to explore and customize the content as needed. JavaScript makes it easy to modify web pages dynamically.';
    mainContent.appendChild(text);
}

// Add content when the page loads
window.onload = addContent;