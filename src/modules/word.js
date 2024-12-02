import { DIRECTION, ROTATION } from "../constants";
import WordError from "../core/wordError";

class Word {
    static create(word) {
        if (typeof word !== 'string') {
            throw WordError.INVALID_TYPE;
        }

        if (word.length < 4) {
            throw WordError.INVALID_LENGTH;
        }

        if (!Word.isValidWord(word)) {
            throw WordError.INVALID_WORD;
        }

        return word;
    }

    static isValidWord(word) {
        const validDirections = Object.values(DIRECTION);
        return [...word].every(char => validDirections.includes(char));
    }

    static getLetter(word, index) {
        const length = word.length;

        index = index < 0 ? length + index : index;

        if (index < 0 || index >= length) {
            throw WordError.INVALID_INDEX;
        }
        return word[index];
    }

    static rotateLetter(letter, theta) {
        if (theta % 90 !== 0) {
            throw WordError.INVALID_ANGLE;
        }

        if (!ROTATION[letter]) {
            throw WordError.INVALID_LETTER;
        }

        return ROTATION[letter][theta % 360];
    }

    static rotateWord(word, theta) {
        if (theta % 90 !== 0) {
            throw WordError.INVALID_ANGLE;
        }

        return [...word]
            .map(letter => Word.rotateLetter(letter, theta))
            .join('');
    }

    static complementLetter(letter) {
        return Word.rotateLetter(letter, 180);
    }

    static complementWord(word) {
        return [...word]
            .map(letter => Word.complementLetter(letter))
            .join('');
    }

    static reverseWord(word) {
        return [...word].reverse().join('');
    }

    static backtrackWord(word) {
        return [...word].reverse().map(letter => Word.complementLetter(letter)).join('');
    }

    static getFactor(word, i, j) {
        if (i < 1 || j < i || j > word.length) {
            throw WordError.INVALID_INDEX;
        }

        return word.slice(i - 1, j);
    }

    static isPrefix(word, factor) {
        return word.startsWith(factor);
    }

    static isSuffix(word, factor) {
        return word.endsWith(factor);
    }

    static isAffix(word, factor) {
        return Word.isPrefix(word, factor) || Word.isSuffix(word, factor);
    }

    static isMiddle(word, factor) {
        return !Word.isAffix(word, factor);
    }

    static findCenter(word) {
        const mid = Math.floor(word.length / 2);
        return word.length % 2 === 0
            ? word.slice(mid - 1, mid + 1)
            : word.charAt(mid);
    }

    static isCenter(word, factor) {
        return Word.findCenter(word) === factor;
    }

    static isPeriod(word, factor) {
        const wordLength = word.length;
        const XLength = factor.length;

        if (wordLength % XLength === 0) {
            const repeatCount = wordLength / XLength;
            const repeatedX = factor.repeat(repeatCount);
            return repeatedX === word;
        }

        return false;
    }

    static isComposite(word) {
        for (let i = 1; i <= word.length / 2; i++) {
            const subword = word.slice(0, i);
            const repeatCount = Math.floor(word.length / i);
            if (subword.repeat(repeatCount) === word) {
                return true;
            }
        }
        return false;
    }

    static isPrimitive(word) {
        return !Word.isComposite(word);
    }

    static isThetaDrome(word, theta) {
        theta = theta % 360;

        if (theta % 90 !== 0) {
            throw WordError.INVALID_ANGLE;
        }

        const half = Math.floor(word.length / 2);
        const firstHalf = word.slice(0, half);
        const secondHalf = word.slice(-half);

        console.log(word, theta)
        console.log(firstHalf, secondHalf);

        const reversedFirstHalf = Word.reverseWord(firstHalf);
        const rotatedFirstHalf = Word.rotateWord(reversedFirstHalf, theta + 180);

        console.log(reversedFirstHalf, rotatedFirstHalf);

        return rotatedFirstHalf === secondHalf;
    }

    static isPalindrome(word) {
        return Word.isThetaDrome(word, 180);
    }
}

export default Word;