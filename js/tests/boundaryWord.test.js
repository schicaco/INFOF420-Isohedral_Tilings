import BoundaryWord from '../modules/BoundaryWord';

describe('BoundaryWord Class', () => {
    test('Constructor: valid word', () => {
        const word = new BoundaryWord('ldru');
        expect(word.getWord()).toBe('ldru');
    });

    test('Constructor: invalid word (empty string)', () => {
        expect(() => new BoundaryWord('')).toThrow('Invalid word: A string of at least 4 letters is required.');
    });

    test('Constructor: invalid word (too short)', () => {
        expect(() => new BoundaryWord('ldr')).toThrow('Invalid word: A string of at least 4 letters is required.');
    });

    test('Constructor: invalid word (non-string)', () => {
        // @ts-expect-error: Testing with a non-string input
        expect(() => new BoundaryWord(123)).toThrow('Invalid word: A string of at least 4 letters is required.');
    });

    test('Constructor: invalid word (invalid letters)', () => {
        expect(() => new BoundaryWord('ldrx')).toThrow('Invalid word: All letters must be in the alphabet.');
    });

    test('getLetter: valid index', () => {
        const word = new BoundaryWord('ldru');
        expect(word.getLetter(0)).toBe('l');
        expect(word.getLetter(3)).toBe('u');
    });

    test('getLetter: invalid index (negative)', () => {
        const word = new BoundaryWord('ldru');
        expect(() => word.getLetter(-1)).toThrow('Index -1 is out of bounds.');
    });

    test('getLetter: invalid index (out of range)', () => {
        const word = new BoundaryWord('ldru');
        expect(() => word.getLetter(4)).toThrow('Index 4 is out of bounds.');
    });

    test('rotateLetter: valid rotations', () => {
        expect(BoundaryWord.rotateLetter('u', 90)).toBe('l');
        expect(BoundaryWord.rotateLetter('d', 180)).toBe('u');
        expect(BoundaryWord.rotateLetter('r', 270)).toBe('d');
    });

    test('rotateLetter: invalid rotation angle', () => {
        expect(() => BoundaryWord.rotateLetter('u', 45)).toThrow('Invalid rotation angle 45 or letter u.');
    });

    test('complementLetter: valid complement', () => {
        expect(BoundaryWord.complementLetter('u')).toBe('d');
        expect(BoundaryWord.complementLetter('l')).toBe('r');
    });

    test('rotateWord: valid rotation', () => {
        const word = new BoundaryWord('uldr');
        expect(word.rotateWord(90)).toBe('ldru');
        expect(word.rotateWord(180)).toBe('drul');
    });

    test('complementWord: valid complement', () => {
        const word = new BoundaryWord('uldr');
        expect(word.complementWord()).toBe('drul');
    });

    test('reverseWord: reverse word', () => {
        const word = new BoundaryWord('uldr');
        expect(word.reverseWord()).toBe('rdlu');
    });

    test('backtrackWord: backtracked word', () => {
        const word = new BoundaryWord('uldr');
        expect(word.backtrackWord()).toBe('rdlu');
    });

    test('Circular word transformation', () => {
        const word = new BoundaryWord('uldr');
        const rotated = word.rotateWord(90); // 'ldru'
        expect(rotated).toBe('ldru');
    });
});