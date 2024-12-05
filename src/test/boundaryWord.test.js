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

    describe('computePalindrome method', () => {
        it('should return an empty array for an empty word', () => {
            expect(BoundaryWord.computePalindrome('')).toEqual([]);
        });

        it('should return an array of palindromic substrings', () => {
            const word = 'racecar';
            const palindromes = BoundaryWord.computePalindrome(word);
            expect(palindromes).toEqual(['e', 'cec', 'aceca', 'racecar']);
        });
    });

    describe('computePalindromes method', () => {
        it('should return an empty set for an empty word', () => {
            expect(BoundaryWord.computePalindromes('')).toEqual({});
        });

        it('should return a set of palindromes for each center of the word', () => {
            const word = 'kayak';
            const palindromes = BoundaryWord.computePalindromes(word);
            expect(palindromes).toEqual({
                0: ['k'],
                1: ['a'],
                2: ['y', 'aya', 'kayak'],
                3: ['a'],
                4: ['k']
            });
        });
    });

    describe('computeThetaDromesStartingAt method', () => {
        it('should return an empty set for an empty word', () => {
            expect(BoundaryWord.computeThetaDromesStartingAt('')).toEqual({});
        });

        it('should return a set of 90-dromes starting at each letter i', () => {
            const word = 'ulur';
            const thetadromes = BoundaryWord.computeThetaDromesStartingAt(word);
            expect(thetadromes).toEqual(
                {
                    0: ["ulur"],
                    1: [],
                    2: ["ur"],
                    3: ["lu", "luru"]
                }
            );
        });
    });

    describe('computeThetaDromesEndingAt method', () => {
        it('should return an empty set for an empty word', () => {
            expect(BoundaryWord.computeThetaDromesEndingAt('')).toEqual({});
        });

        it('should return a set of 90-dromes ending at each letter i', () => {
            const word = 'ulur';
            const thetadromes = BoundaryWord.computeThetaDromesEndingAt(word);
            expect(thetadromes).toEqual(
                {
                    0: ["luru"],
                    1: [],
                    2: ["lu"],
                    3: [ "ur", "ulur"],
                }
            );
        });
    });

    describe('extractLongFactors method', () => {
        it('should return an empty set for an empty word', () => {
            expect(BoundaryWord.extractLongFactors(0, {})).toEqual({});
        });

        it('should return a set of long factors for a word', () => {
            const factors = {
                0: ["ulur"],
                1: ["l"],
                2: ["u"],
                3: ["luru"],
            };

            const longFactors = BoundaryWord.extractLongFactors(4, factors);
            expect(longFactors).toEqual({
                0: ["ulur"],
                1: [],
                2: [],
                3: ["luru"],
            });
        });
    });
});