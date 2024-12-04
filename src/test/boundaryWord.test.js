import Word from '../modules/word';
import BoundaryWord from '../modules/boundaryWord';

describe('BoundaryWord Class', () => {
    let word;

    beforeEach(() => {
        word = Word.create('uldr');
    });

    describe('create method', () => {
        it('should call the parent class create method', () => {
            const mockCreate = jest.spyOn(BoundaryWord, 'create');
            BoundaryWord.create('uldr');
            expect(mockCreate).toHaveBeenCalledWith('uldr');
        });
    });

    describe('isEvenLength', () => {
        it('should return true for even-length words', () => {
            const word = 'uldr';
            expect(BoundaryWord.isEvenLength(word)).toBe(true);
        });

        it('should return false for odd-length words', () => {
            const word = 'uld';
            expect(BoundaryWord.isEvenLength(word)).toBe(false);
        });
    });

    describe('getCenter', () => {
        it('should return the correct center for even-length words', () => {
            const word = 'uldr';
            const center = BoundaryWord.getCenter(word);
            expect(center).toEqual([1, 2]); // For "uldr", center should be [1, 2]
        });

        it('should return the correct center for odd-length words', () => {
            const word = 'uld';
            const center = BoundaryWord.getCenter(word);
            expect(center).toEqual([1, 1]); // For "uld", center should be [1]
        });
    });

    describe('shiftWord method', () => {
        it('should return the original word if shift is 0', () => {
            expect(BoundaryWord.shiftWord(word, 0)).toBe('uldr');
            expect(BoundaryWord.shiftWord(word, 4)).toBe('uldr'); // 4 % 4 = 0
            expect(BoundaryWord.shiftWord(word, -4)).toBe('uldr'); // -4 % 4 = 0
        });

        it('should shift the word correctly for positive shifts', () => {
            expect(BoundaryWord.shiftWord(word, 1)).toBe('ruld');
            expect(BoundaryWord.shiftWord(word, 2)).toBe('drul');
            expect(BoundaryWord.shiftWord(word, 3)).toBe('ldru');
        });

        it('should shift the word correctly for negative shifts', () => {
            expect(BoundaryWord.shiftWord(word, -1)).toBe('ldru');
            expect(BoundaryWord.shiftWord(word, -2)).toBe('drul');
            expect(BoundaryWord.shiftWord(word, -3)).toBe('ruld');
        });

        it('should handle shifts larger than the word length', () => {
            expect(BoundaryWord.shiftWord(word, 5)).toBe('ruld'); // 5 % 4 = 1
            expect(BoundaryWord.shiftWord(word, -5)).toBe('ldru'); // -5 % 4 = -1
        });

        it('should return an empty string if the word is empty', () => {
            expect(BoundaryWord.shiftWord('', 1)).toBe('');
        });
    });

    describe('computePalindrome', () => {
        it('should return the correct palindrome for an odd-length word', () => {
            const word = 'racecar';
            const palindromes = BoundaryWord.computePalindrome(word);
            expect(palindromes).toEqual(['e', 'cec', 'aceca', 'racecar']);
        });

        it('should return the correct palindromes for an even-length word', () => {
            const word = 'abba';
            const palindromes = BoundaryWord.computePalindrome(word);
            expect(palindromes).toEqual(['bb', 'abba']);
        });

        it('should return an empty array if no palindrome is found', () => {
            const word = 'abcd';
            const palindromes = BoundaryWord.computePalindrome(word);
            expect(palindromes).toEqual([]);
        });
    });

    describe('computePalindromes', () => {
        it('should compute palindromes for a word', () => {
            const word = 'abba';
            expect(BoundaryWord.computePalindromes(word)).toEqual({
                "aabb": [],
                "abba": ["bb", "abba"],
                "baab": ["aa", "baab"],
                "bbaa": []
            });
        });
    });

    describe('computeThetaDromeStartingAt', () => {
        it('should return an object containing the correct 90-dromes', () => {
            const word = 'rdrdldluluru';
            const thetadromes = BoundaryWord.computeThetaDromeStartingAt(word);
            expect(thetadromes).toHaveProperty('0'); // Should contain an entry for index 0
            expect(thetadromes).toEqual({
                "0": [
                  "rd",
                  "rdrdld",
                ],
                "1": [
                  "drdl",
                  "drdldl",
                ],
                "10": [],
                "11": [],
                "2": [
                  "rd",
                  "rdld",
                ],
                "3": [
                  "dl",
                  "dldlul",
                ],
                "4": [
                  "ldlu",
                  "ldlulu",
                ],
                "5": [
                  "dl",
                  "dlul",
                ],
                "6": [
                  "lu",
                  "luluru",
                ],
                "7": [
                  "ulur",
                ],
                "8": [
                  "lu",
                  "luru",
                ],
                "9": [
                  "ur",
                ]})
        });

        it('should handle edge cases like empty strings', () => {
            const word = '';
            const thetadromes = BoundaryWord.computeThetaDromeStartingAt(word);
            expect(thetadromes).toEqual({});
        });
    });

    describe('computeThetaDromeEndingAt', () => {
        it('should return an object containing the correct 90-dromes', () => {
            const word = 'rdrdldluluru';
            const thetadromes = BoundaryWord.computeThetaDromeEndingAt(word);
            expect(thetadromes).toHaveProperty('0'); // Should contain an entry for index 0
            expect(thetadromes).toEqual({
                "0": [],
                "1": [
                  "rd",
                ],
                "10": [
                  "ur",
                  "ulur",
                ],
                "11": [
                  "luru",
                  "luluru",
                ],
                "2": [],
                "3": [
                  "rd",
                ],
                "4": [
                  "dl",
                  "drdl",
                ],
                "5": [
                  "rdld",
                  "rdrdld",
                ],
                "6": [
                  "dl",
                  "drdldl",
                ],
                "7": [
                  "lu",
                  "ldlu",
                ],
                "8": [
                  "dlul",
                  "dldlul",
                ],
                "9": [
                  "lu",
                  "ldlulu",
                ],
            });
        });

        it('should handle edge cases like empty strings', () => {
            const word = '';
            const thetadromes = BoundaryWord.computeThetaDromeEndingAt(word);
            expect(thetadromes).toEqual({});
        });
    });
});