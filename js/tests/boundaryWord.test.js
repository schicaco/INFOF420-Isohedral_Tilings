import BoundaryWord from '../modules/BoundaryWord';

describe('BoundaryWord Class', () => {
    test('Constructor: valid word', () => {
        const word = new BoundaryWord('news');
        expect(word.getWord()).toBe('news');
    });

    test('Constructor: invalid word (empty string)', () => {
        expect(() => new BoundaryWord('')).toThrow('Invalid word: A string of at least 4 letters is required.');
    });

    test('Constructor: invalid word (too short)', () => {
        expect(() => new BoundaryWord('new')).toThrow('Invalid word: A string of at least 4 letters is required.');
    });

    test('Constructor: invalid word (non-string)', () => {
        // @ts-expect-error: Testing with a non-string input
        expect(() => new BoundaryWord(123)).toThrow('Invalid word: A string of at least 4 letters is required.');
    });

    test('isWordInAlphabet: word in alphabet', () => {
        const word = new BoundaryWord('news');
        expect(word.isWordInAlphabet()).toBe(true);
    });

    test('isWordInAlphabet: word not in alphabet', () => {
        const word = new BoundaryWord('north');
        expect(word.isWordInAlphabet()).toBe(false);
    });

    test('getLetter: valid index', () => {
        const word = new BoundaryWord('news');
        expect(word.getLetter(0)).toBe('n');
        expect(word.getLetter(3)).toBe('s');
    });

    test('getLetter: invalid index (negative)', () => {
        const word = new BoundaryWord('news');
        expect(() => word.getLetter(-1)).toThrow('Index -1 is out of bounds.');
    });

    test('getLetter: invalid index (out of range)', () => {
        const word = new BoundaryWord('news');
        expect(() => word.getLetter(4)).toThrow('Index 4 is out of bounds.');
    });
});