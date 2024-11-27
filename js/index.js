import Word from './modules/word.js';
import Tiling from './modules/tiling.js';

function handlePolygonInput() {
    const htmlInput = document.getElementById('polygon_input').value;

    const word = new Word(htmlInput);
    let tiling = new Tiling(word);
    const answer = tiling.isFoldSymmetryPossible(90).toString();

    console.log("word :" + word.getWord());
    console.log("answer : " + answer);
  
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = answer;
}
  
// Add event listener to the button
document.getElementById('process_polygon').addEventListener('click', handlePolygonInput);