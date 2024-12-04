import Word from './word';

class BoundaryWord extends Word {
    static create(word) {
        super.create(word);
    }

    static isEvenLength(word) {
        return word.length % 2 === 0;
    }

    static getCenter(word) {
        const center = [];

        if (this.isEvenLength(word)) {
            center.push(Math.floor(word.length / 2) - 1); // Using Math.floor for consistency
            center.push(Math.floor(word.length / 2));
        } else {
            center.push(Math.floor(word.length / 2));
            center.push(Math.floor(word.length / 2));
        }

        return center;
    }

    static shiftWord(word, shift) {
        const length = word.length;
        if (length === 0 || shift % length === 0) return word; // Handle empty string and zero shift
    
        // Normalize shift to avoid unnecessary loops
        shift = ((shift % length) + length) % length;
    
        // Rearrange the characters by slicing and concatenating
        return word.slice(-shift) + word.slice(0, -shift);
    }

    static computePalindrome(word) {
        const palindromes = [];
        const n = word.length;
        
        let [left, right] = this.getCenter(word); // Destructure the result from getCenter
    
        // Expand outward from the center to find palindromes
        while (left >= 0 && right < n && word[left] === word[right]) {
            palindromes.push(word.slice(left, right + 1));
            left--;
            right++;
        }
    
        return palindromes;
    }
    
    static computePalindromes(word) {
        const palindromes = {};

        for (let i = 0; i < word.length; i++) {
            const subword = this.shiftWord(word, i);
            palindromes[subword] = this.computePalindrome(subword);
        }
        
        return palindromes;
    }

    static computeThetaDromeStartingAt(word) {
        const thetadromes = {};
        const n = word.length;
    
        for (let i = 0; i < n; i++) {
            const thetadromeForLetter = [];
    
            // Generate all possible substrings starting at W[i]
            for (let j = i; j < n; j++) {
                const substring = Word.getFactor(word, i, j);
    
                if (Word.isThetaDrome(substring, 90)) {
                    thetadromeForLetter.push(substring);
                }
            }
    
            // Sort substrings by length in ascending order
            thetadromeForLetter.sort((a, b) => a.length - b.length);
    
            // Store the result by index
            thetadromes[i] = thetadromeForLetter;
        }
    
        return thetadromes;
    }

    static computeThetaDromeEndingAt(word) {
        const thetadromes = {};
        const n = word.length;
    
        for (let i = 0; i < n; i++) {
            const thetadromeForLetter = [];
    
            // Generate all possible substrings ending at W[i]
            for (let j = 0; j <= i; j++) {
                const substring = Word.getFactor(word, j, i);

                if (Word.isThetaDrome(substring, 90)) {
                    thetadromeForLetter.push(substring);
                }
            }
    
            // Sort substrings by length in ascending order
            thetadromeForLetter.sort((a, b) => a.length - b.length);
    
            // Store the result by index
            thetadromes[i] = thetadromeForLetter;
        }
    
        return thetadromes;
    }

    static computeThetaDromesStartingAt(word) {
        const thetadromes = {};

        for (let i = 0; i < word.length; i++) {
            const subword = BoundaryWord.shiftWord(word, i);
            thetadromes[subword] = this.computeThetaDromeStartingAt(subword);
        }

        return thetadromes;
    }

    static computeThetaDromesEndingAt(word) {
        const thetadromes = {};

        for (let i = 0; i < word.length; i++) {
            const subword = BoundaryWord.shiftWord(word, i);
            thetadromes[subword] = this.computeThetaDromeEndingAt(subword);
        }

        return thetadromes;
    }
}

export default BoundaryWord;