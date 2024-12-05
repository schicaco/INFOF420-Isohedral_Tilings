import BoundaryWord from '../modules/boundaryWord';

describe('BoundaryWord Class', () => {
    test('create() should call the superclass create method', () => {
        const word = 'uldr';
        const result = BoundaryWord.create(word);
        expect(result).toBe(word);  // Assuming `create` method in Word class just returns the word.
    });

    test('shiftWord() should shift the word correctly', () => {
        expect(BoundaryWord.shiftWord('hello', 0)).toBe('hello');
        expect(BoundaryWord.shiftWord('hello', 1)).toBe('ohell');
        expect(BoundaryWord.shiftWord('hello', 2)).toBe('lohel');
        expect(BoundaryWord.shiftWord('hello', 3)).toBe('llohe');
        expect(BoundaryWord.shiftWord('hello', 4)).toBe('elloh');
        expect(BoundaryWord.shiftWord('hello', 5)).toBe('hello');
        expect(BoundaryWord.shiftWord('hello', -1)).toBe('elloh');
    });

    test('computePalindromesStartingAt()', () => {
        const word = 'rurdrdldlulu';
        const palindromes = BoundaryWord.computePalindromesStartingAt(word);
    });

    test('computePalindromesEndingAt()', () => {
        const word = 'rurdrdldlulu';
        const thetaDromes = BoundaryWord.computePalindromesEndingAt(word);
    });

    test('computeThetaDromesStartingAt()', () => {
        const word = 'rurdrdldlulu';
        const thetaDromes = BoundaryWord.computeThetaDromesStartingAt(word);
    });

    test('computeThetaDromesEndingAt()', () => {
        const word = 'rurdrdldlulu';
        const thetaDromes = BoundaryWord.computeThetaDromesEndingAt(word);
    });

    test('extractLongFactors()', () => {
        const word = 'rurdrdldlulu';
        const palindromesStartingAt = BoundaryWord.computePalindromesStartingAt(word);
        const palindromesEndingAt = BoundaryWord.computePalindromesEndingAt(word);
        const thetaDromesStartingAt = BoundaryWord.computeThetaDromesStartingAt(word);
        const thetaDromesEndingAt = BoundaryWord.computeThetaDromesEndingAt(word);
        const longFactors = BoundaryWord.extractLongFactors(word.length, thetaDromesEndingAt);
    });


    // test('findAdmissibleFactorizations() should return admissible factorizations for the word', () => {
    //     const word = 'rurdrdldlulu';
    //     const palindromes = BoundaryWord.computePalindromes(word);
    //     const thetaDromesEndingAt = BoundaryWord.computeThetaDromesEndingAt(word);
    //     const thetaDromesStartingAt = BoundaryWord.computeThetaDromesStartingAt(word);
    //     const longFactors = BoundaryWord.extractLongFactors(word.length, thetaDromesEndingAt);

    //     const factorizations = BoundaryWord.processLong90DromeFactors(word.length, longFactors, thetaDromesEndingAt, thetaDromesStartingAt, palindromes);
    // });

});