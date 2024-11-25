import { Letter, Alphabet4Letters, Alphabet8Letters } from "./alphabet";

/**
 * Class representing a boundary word defined by a sequence of directional letters.
 */
export class BoundaryWord {
    // The sequence of directional letters (keys from the Letter object, e.g., "N", "E")
    word: (keyof typeof Letter)[];

    // The alphabet associated with the boundary word (4-letter or 8-letter)
    alphabet: Alphabet4Letters | Alphabet8Letters;

    // The calculated vertices based on the directional word
    vertices: [number, number][];

    /**
     * Constructor for BoundaryWord.
     * @param word - Array of directional letters defining the boundary.
     * @param alphabet - The alphabet (4 or 8 letters) to validate the word.
     * @throws Error if the word is empty or contains invalid letters.
     */
    constructor(word: (keyof typeof Letter)[], alphabet: Alphabet4Letters | Alphabet8Letters) {
        // Validate the input word
        if (!Array.isArray(word) || word.length === 0) {
            throw new Error('Boundary word must be a non-empty array of directions');
        }
        if (!alphabet.isWordInAlphabet(word)) {
            throw new Error('Boundary word must be composed of letters from the alphabet');
        }

        this.word = word;
        this.alphabet = alphabet;

        // Calculate vertices immediately upon initialization
        this.vertices = this.calculateVertices();
    }

    /**
     * Calculates the vertices for the boundary word.
     * @returns An array of vertices as [x, y] coordinates.
     */
    private calculateVertices(): [number, number][] {
        // Initialize starting position at origin (0, 0)
        let currentPosition: [number, number] = [0, 0];

        // Add the starting position to the vertices list
        const vertices: [number, number][] = [currentPosition];

        // Iterate through the word, updating position based on the directional moves
        this.word.forEach(letter => {
            const move = Letter[letter]; // Get the movement vector (e.g., [1, 0] for "E")
            currentPosition = [
                currentPosition[0] + move[0],
                currentPosition[1] + move[1],
            ];
            vertices.push(currentPosition);
        });

        return vertices;
    }

    /**
     * Checks if the boundary word forms a closed shape (i.e., the path returns to the starting point).
     * @returns True if the boundary word is closed, false otherwise.
     */
    isClosed(): boolean {
        // Compare the first and last vertices
        const start = this.vertices[0];
        const end = this.vertices[this.vertices.length - 1];
        return start[0] === end[0] && start[1] === end[1];
    }
}