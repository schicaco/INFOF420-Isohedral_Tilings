import Word from './word.js';

class Tiling {
    /**
     * Constructs a Tiling instance with a specified Word.
     * @param {Word} word - The boundary word for the tiling process.
     * @throws {Error} - If the input is not a valid Word instance.
     */
    constructor(word) {
        if (!(word instanceof Word)) {
            throw new Error('Invalid input: word must be an instance of Word.');
        }

        this.word = word;
        this.isTilingPossible = null; // To store the result of the tiling check.
    }

    /**
     * Preprocesses the boundary word to find palindromes and 90-dromes.
     * @returns {object} An object containing all palindromes and 90-dromes found in the word.
     */
    preprocessFactors(rotDegree) {
        const wordStr = this.word.getWord();
        const wordLength = wordStr.length;
        const minLength = Math.floor(wordLength / 3);

        const palindromes = this.findAllThetaDromes(wordStr, 180);
        const ninetyDromes = this.findAllThetaDromes(wordStr, 90);

        // // Filter factors by minimum length
        // const longPalindromes = this.getLongFactors(palindromes, minLength);
        // const longNinetyDromes = this.getLongFactors(ninetyDromes, minLength);

        return { palindromes: palindromes, ninetyDromes: ninetyDromes };
    }


    /**
     * Finds all theta-dromic substrings in the boundary word.
     * @param {string} word - The word to search for 90-dromes.
     * @param {number} rotDegree  
     * @returns {Array<{ start: number, end: number, drome: string }>} An array of objects containing 90-dromic substrings and their positions.
     */
    findAllThetaDromes(word, rotDegree) {
        const n = word.length;
        const ninetyDromes = [];

        // Iterate over all possible substrings of at least length 4
        for (let start = 0; start < n; start++) {
            for (let end = start + 2; end <= n; end++) {
                const substring = word.slice(start, end);
                const wordObj = new Word(substring);
                try {
                    if (substring.length % 2 ==0 &&  wordObj.isThetaDrome(rotDegree)) {
                        let endIdx = end-1; 
                        ninetyDromes.push({ start, end: endIdx, drome: substring });
                    }
                } catch (error) {
                    // Ignore invalid rotations
                    continue;
                }
            }
        }

        return ninetyDromes;
    }

    /**
     * Filters factors to keep only those of length ≥ minLength.
     * @param {Array} factors - An array of factors (palindromes or 90-dromes).
     * @param {number} minLength - The minimum length required.
     * @returns {Array} An array of filtered factors.
     */
    getLongFactors(factors, minLength) {
        return factors.filter(factor => (factor.end - factor.start+1) >= minLength);
    }

    /**
     * Checks if a quarter-turn factorization exists where W = ABC,
     * with A being a palindrome, and B, C being 90-dromes.
     * Only one of the factors A, B, or C needs to be a long factor.
     * @returns {boolean} True if the factorization exists, otherwise false.
     */
    isQuarterTurnFactorizationPossible() {
        const { palindromes, ninetyDromes } = this.preprocessFactors();
        const wordStr = this.word.getWord();
        const n = wordStr.length;

        // Helper to validate contiguity and alignment
        const isValidFactorization = (a, b, c) => 
            a.end + 1 === b.start && 
            b.end + 1 === c.start && 
            c.end === n - 1;

        const encounteredFactors = [];
        encounteredFactors.push(this.getLongFactors(palindromes,Math.floor(n / 3) ) )
        encounteredFactors.push(n/3)
        encounteredFactors.push(palindromes)
        // Case 1: A is the long factor
        for (const a of this.getLongFactors(palindromes,Math.floor(n / 3) )) {
            for (const b of ninetyDromes) {
                for (const c of ninetyDromes) {

                    encounteredFactors.push({ a, b, c });
                    if (isValidFactorization(a, b, c)) {
                        this.isTilingPossible = true;
                        return true;
                    }
                }
            }
        }

        // Case 2: B or C is the long factor
        for (const b of ninetyDromes) {
            if (b.end - b.start + 1 >= Math.floor(n / 3)) { // B is long
                for (const a of palindromes) {
                    for (const c of ninetyDromes) {
                        if (isValidFactorization(a, b, c)) {
                            this.isTilingPossible = true;
                            return true;
                        }
                    }
                }
            }
        }

        // Case 3: C is the long factor
        for (const c of ninetyDromes) {
            if (c.end - c.start + 1 >= Math.floor(n / 3)) { // C is long
                for (const a of palindromes) {
                    for (const b of ninetyDromes) {
                        if (isValidFactorization(a, b, c)) {
                            this.isTilingPossible = true;
                            return true;
                        }
                    }
                }
            }
        }


        return false;
    }
}



export default Tiling;