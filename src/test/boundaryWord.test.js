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
            expect(BoundaryWord.computePalindromes(word)).toEqual(
                {
                    '0': [ 'aa', 'baab' ],
                    '1': [ 'bb', 'abba' ],
                    '2': [ 'bb', 'abba' ],
                    '3': [ 'aa', 'baab' ]
                }
            );
        });
    });

    describe('computeThetaDromeStartingAt', () => {
        it('should return an object containing the correct 90-dromes', () => {
            const word = 'urur';
            const thetadromes = BoundaryWord.computeThetaDromeStartingAt(word);
            expect(thetadromes).toHaveProperty('0'); // Should contain an entry for index 0
            expect(thetadromes).toEqual({
                "0": ["ur"],
                "1": [],
                "2": ["ur"],
                "3": [],
            });
        });

        it('should handle edge cases like empty strings', () => {
            const word = '';
            const thetadromes = BoundaryWord.computeThetaDromeStartingAt(word);
            expect(thetadromes).toEqual({});
        });
    });

    describe('computeThetaDromeEndingAt', () => {
        it('should return an object containing the correct 90-dromes', () => {
            const word = 'urur';
            const thetadromes = BoundaryWord.computeThetaDromeEndingAt(word);
            expect(thetadromes).toHaveProperty('0'); // Should contain an entry for index 0
            expect(thetadromes).toEqual({
                "0": [],
                "1": ["ur"],
                "2": [],
                "3": ["ur"],
            });
        });

        it('should handle edge cases like empty strings', () => {
            const word = '';
            const thetadromes = BoundaryWord.computeThetaDromeEndingAt(word);
            expect(thetadromes).toEqual({});
        });
    });

    describe("extractLongThetaDromes", () => {
        it('should return the correct long theta-drome', () => {
            const word = 'urur';
            const thetadromes = BoundaryWord.computeThetaDromesStartingAt(word);
            const longThetaDrome = BoundaryWord.extractLongThetaDromes(word, thetadromes);
            expect(longThetaDrome).toEqual({
                "ruru": ["ur"],
                "urur": [ "ur"]
            });
        });

        it('should return the correct long theta-drome', () => {
            const word = 'urur';
            const thetadromes = BoundaryWord.computeThetaDromesEndingAt(word);
            const longThetaDrome = BoundaryWord.extractLongThetaDromes(word, thetadromes);
            expect(longThetaDrome).toEqual({
                "ruru": [ "ur"],
                "urur": ["ur"],
            });
        });

        it('should return an empty string if no long theta-drome is found', () => {
            const thetadromes = BoundaryWord.computeThetaDromesStartingAt(word);
            const longThetaDrome = BoundaryWord.extractLongThetaDromes(word, thetadromes);
            expect(longThetaDrome).toEqual({});
        });

        it('should return an empty string if no long theta-drome is found', () => {
            const thetadromes = BoundaryWord.computeThetaDromesEndingAt(word);
            const longThetaDrome = BoundaryWord.extractLongThetaDromes(word, thetadromes);
            expect(longThetaDrome).toEqual({});
        });
    });
});