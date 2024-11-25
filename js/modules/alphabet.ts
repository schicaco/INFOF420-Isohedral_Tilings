// Define the Letter object with direction coordinates as tuple pairs
// Each key represents a direction, and the value is a coordinate pair (x, y)
const Letter = {
    N: [0, 1] as [number, number],
    NE: [1, 1] as [number, number],
    E: [1, 0] as [number, number],
    SE: [1, -1] as [number, number],
    S: [0, -1] as [number, number],
    SW: [-1, -1] as [number, number],
    W: [-1, 0] as [number, number],
    NW: [-1, 1] as [number, number]
};

// Base class for defining an Alphabet with generic support for letter keys
abstract class Alphabet {
    // Array of valid letter keys (e.g., "N", "E", etc.) for the alphabet
    protected alphabet: (keyof typeof Letter)[] = [];

    /**
     * Get the letter at the specified index in the alphabet.
     * @param index - The index of the desired letter.
     * @returns The letter key (e.g., "N", "E").
     * @throws Error if the index is out of bounds.
     */
    getLetter(index: number): keyof typeof Letter {
        if (index < 0 || index >= this.alphabet.length) {
            throw new Error(`Index ${index} is out of bounds.`);
        }
        return this.alphabet[index];
    }

    /**
     * Check if a specific letter exists in the alphabet.
     * @param letter - The letter key to check.
     * @returns True if the letter exists in the alphabet.
     * @throws Error if the letter is not in the alphabet.
     */
    isLetterInAlphabet(letter: keyof typeof Letter): boolean {
        if (!this.alphabet.includes(letter)) {
            throw new Error(`Letter ${letter} is not in the alphabet.`);
        }
        return true;
    }

    /**
     * Check if all letters in a word are part of the alphabet.
     * @param word - An array of letter keys to check.
     * @returns True if all letters are in the alphabet, false otherwise.
     */
    isWordInAlphabet(word: (keyof typeof Letter)[]): boolean {
        // Use the `every` method to ensure all letters pass the check
        return word.every(letter => this.alphabet.includes(letter));
    }
}

// Concrete class representing an alphabet with 4 primary directions
class Alphabet4Letters extends Alphabet {
    constructor() {
        super();
        // Initialize with "N", "E", "S", "W"
        this.alphabet = ["N", "E", "S", "W"];
    }
}

// Concrete class representing an alphabet with 8 primary and diagonal directions
class Alphabet8Letters extends Alphabet {
    constructor() {
        super();
        // Initialize with "N", "E", "S", "W", "NE", "SE", "SW", "NW"
        this.alphabet = ["N", "E", "S", "W", "NE", "SE", "SW", "NW"];
    }
}

// Export the objects and classes for external use
export { Letter, Alphabet, Alphabet4Letters, Alphabet8Letters };