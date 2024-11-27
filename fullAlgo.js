// Helper Transformation Functions
function t90(char) {
    const rotationMap = { 'E': 'N', 'N': 'W', 'W': 'S', 'S': 'E' };
    return rotationMap[char] || char;
}

function t180(char) {
    // Applying t90 twice
    return t90(t90(char));
}

function t270(char) {
    // Applying t90 three times
    return t90(t90(t90(char)));
}

function fTheta(char) {
    // Reflection function based on Theta (assuming Theta is fixed, e.g., horizontal)
    const reflectionMap = { 'E': 'W', 'W': 'E', 'N': 'S', 'S': 'N' };
    return reflectionMap[char] || char;
}

// Function to check if a string is a palindrome
function isPalindrome(str) {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
    return true;
}

// Function to check if a word is a 90-drome
function is90Drome(word) {
    let n = word.length;
    for (let i = 0; i < n; i++) {
        if (word[i] !== t90(word[n - i - 1])) return false;
    }
    return true;
}


// Manacher's Algorithm to find all palindromic substrings
function manachersAlgorithm(s) {
    // Transform S to handle even-length palindromes
    let T = '#';
    for (let char of s) {
        T += char + '#';
    }
    let n = T.length;
    let P = Array(n).fill(0);
    let center = 0, right = 0;
    for (let i = 0; i < n; i++) {
        let mirror = 2 * center - i;
        if (i < right) {
            P[i] = Math.min(right - i, P[mirror]);
        }
        // Expand around center i
        while (i + P[i] + 1 < n && i - P[i] - 1 >= 0 &&
               T[i + P[i] + 1] === T[i - P[i] - 1]) {
            P[i]++;
        }
        // Update center and right boundary
        if (i + P[i] > right) {
            center = i;
            right = i + P[i];
        }
    }
    // Extract palindromic substrings
    let palindromes = [];
    for (let i = 0; i < n; i++) {
        let len = P[i];
        if (len > 0) {
            let start = Math.floor((i - len) / 2);
            let substring = s.substring(start, start + len);
            palindromes.push({ start: start % s.length, end: (start + len - 1) % s.length, substring });
        }
    }
    return palindromes;
}

// Function to preprocess W and find admissible palindromes and 90-dromes
function preprocess(W) {
    let doubledW = W + W; // Handle circular palindromes
    // Find all palindromic factors using Manacher's algorithm on doubledW
    let palindromicFactors = manachersAlgorithm(doubledW);
    
    // Filter palindromes of length >= |W|/3 and map back to W
    let minPalLength = Math.ceil(W.length / 3);
    let admissiblePalindromes = [];
    let seenPalindromes = new Set(); // To avoid duplicates due to doubling
    for (let p of palindromicFactors) {
        if (p.substring.length >= minPalLength) {
            // Ensure the palindrome lies within a single rotation of W
            // A palindrome can start in the first W and wrap into the second W
            // To prevent duplicates, map the start and end back to W
            let start = p.start % W.length;
            let end = p.end % W.length;
            let length = p.substring.length;
            if (length > W.length) continue; // Ignore palindromes longer than W
            let key = `${start}-${end}-${length}`;
            if (!seenPalindromes.has(key)) {
                admissiblePalindromes.push({ start, end, substring: p.substring });
                seenPalindromes.add(key);
            }
        }
    }

    // Find all 90-drome factors
    let admissible90Dromes = [];
    for (let i = 0; i < W.length; i++) {
        for (let j = i + 1; j <= W.length; j++) {
            let substring = W.substring(i, j);
            if (substring.length >= minPalLength && is90Drome(substring)) {
                admissible90Dromes.push({ start: i, end: j - 1, substring });
            }
        }
    }

    // Extract long 90-drome factors (O(1) number based on Lemma 5.4)
    let long90DromeFactors = admissible90Dromes.slice(0, 34); // Example limit, adjust as needed

    // Summarize long palindrome factors by first or last letter
    let summarizedLetters = new Set();
    for (let p of admissiblePalindromes) {
        summarizedLetters.add(p.start);
        summarizedLetters.add(p.end);
    }

    return {
        palindromes: admissiblePalindromes,
        dromes: admissible90Dromes,
        longDromes: long90DromeFactors,
        summarizedLetters: Array.from(summarizedLetters)
    };
}

// Function to combine long 90-dromes with adjacent 90-dromes
function combineLongDromes(W, admissibleDromes, longDromes) {
    let factorizations = [];

    for (let d of longDromes) {
        let i = d.start;
        let j = d.end;

        // Find 90-dromes that end at i - 1
        let endingDromes = admissibleDromes.filter(drome => drome.end === (i - 1 + W.length) % W.length);

        // Find 90-dromes that start at j + 1
        let startingDromes = admissibleDromes.filter(drome => drome.start === (j + 1) % W.length);

        // Combine with ending dromes
        for (let ed of endingDromes) {
            // Handle wrap-around
            let A = (ed.start <= i - 1) ? W.substring(0, ed.start) : W.substring(ed.start, W.length) + W.substring(0, ed.start);
            let D1 = ed.substring;
            let D2 = d.substring;
            factorizations.push({ A, D1, D2 });
        }

        // Combine with starting dromes
        for (let sd of startingDromes) {
            // Handle wrap-around
            let A = (0 <= i) ? W.substring(0, i) : W.substring(0, i + W.length);
            let D1 = d.substring;
            let D2 = sd.substring;
            factorizations.push({ A, D1, D2 });
        }

        // Optionally include factorizations where D2 = 0 (empty)
        let A1 = W.substring(0, i);
        let D1_1 = d.substring;
        let D2_1 = "";
        factorizations.push({ A: A1, D1: D1_1, D2: D2_1 });

        // Similarly include factorizations where D1 = 0 (empty)
        let A2 = W.substring(0, j + 1);
        let D1_2 = "";
        let D2_2 = d.substring;
        factorizations.push({ A: A2, D1: D1_2, D2: D2_2 });
    }

    // Verify if A is a palindrome
    let validFactorizations = [];
    for (let f of factorizations) {
        if (isPalindrome(f.A)) {
            validFactorizations.push(f);
        }
    }

    return validFactorizations;
}

// Function to handle large palindrome factors
function handleLargePalindromes(W, summarizedLetters, admissibleDromes) {
    let factorizations = [];

    for (let pos of summarizedLetters) {
        // Iterate through double admissible 90-dromes starting at pos + 1
        let startingDromes = admissibleDromes.filter(drome => drome.start === (pos + 1) % W.length);
        for (let d1 of startingDromes) {
            for (let d2 of admissibleDromes) {
                // Include choices with |D2| = 0 by allowing D2 to be empty
                if (d2.start === (d1.end + 1) % W.length || d2.substring.length === 0) {
                    let A = W.substring(0, pos);
                    let D1 = d1.substring;
                    let D2 = d2.substring;
                    if (isPalindrome(A)) {
                        factorizations.push({ A, D1, D2 });
                    }
                }
            }
            // Include D2 as empty
            let A1 = W.substring(0, pos);
            let D1_1 = d1.substring;
            let D2_1 = "";
            if (isPalindrome(A1)) {
                factorizations.push({ A: A1, D1: D1_1, D2: D2_1 });
            }
        }

        // Iterate through double admissible 90-dromes ending at pos - 1
        let endingDromes = admissibleDromes.filter(drome => drome.end === (pos - 1 + W.length) % W.length);
        for (let d1 of endingDromes) {
            for (let d2 of admissibleDromes) {
                // Include choices with |D2| = 0 by allowing D2 to be empty
                if (d2.end === (d1.start - 1 + W.length) % W.length || d2.substring.length === 0) {
                    let A = W.substring(0, (d2.end + 1) % W.length);
                    let D1 = d1.substring;
                    let D2 = d2.substring;
                    if (isPalindrome(A)) {
                        factorizations.push({ A, D1, D2 });
                    }
                }
            }
            // Include D2 as empty
            let A2 = W.substring(0, (d1.end + 1) % W.length);
            let D1_2 = d1.substring;
            let D2_2 = "";
            if (isPalindrome(A2)) {
                factorizations.push({ A: A2, D1: D1_2, D2: D2_2 });
            }
        }
    }

    return factorizations;
}

// Main Function to Determine Quarter-Turn Factorization
function hasQuarterTurnFactorization(W) {
    // Step 1: Preprocess W to find admissible factors, including circular palindromes
    let { palindromes, dromes, longDromes, summarizedLetters } = preprocess(W);

    // Step 2: Combine long 90-drome factors with adjacent 90-dromes
    let validFactorizations1 = combineLongDromes(W, dromes, longDromes);

    // Step 3: Handle large palindrome factors, including circular ones
    let validFactorizations2 = handleLargePalindromes(W, summarizedLetters, dromes);

    // Combine all valid factorizations
    let allValidFactorizations = validFactorizations1.concat(validFactorizations2);

    // Step 4: Check if any valid factorization exists
    // Optionally, return the factorization details
    if (allValidFactorizations.length > 0) {
        return {
            hasFactorization: true,
            factorizations: allValidFactorizations
        };
    } else {
        return {
            hasFactorization: false,
            factorizations: []
        };
    }
}

// Example Usage
let boundaryWord = "EENNEEENN";
let result = hasQuarterTurnFactorization(boundaryWord);
if (result.hasFactorization) {
    console.log("Boundary word has a quarter-turn factorization.");
    console.log("Factorizations:", result.factorizations);
} else {
    console.log("Boundary word does NOT have a quarter-turn factorization.");
}
