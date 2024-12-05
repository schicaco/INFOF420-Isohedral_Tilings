import Factor from "../modules/factor";
import { FactorError } from "../core/error";

describe("Factor", () => {
    const word = "example";

    describe("constructor", () => {
        it("creates a factor with valid indices", () => {
            const factor = new Factor(word, 0, 3);
            expect(factor.start).toBe(0);
            expect(factor.end).toBe(3);
            expect(factor.value).toBe("exam");
            expect(factor.length).toBe(4);
        });

        it("throws an error for invalid indices (start < 0)", () => {
            expect(() => new Factor(word, -1, 3)).toThrow(FactorError.INVALID_INDICES);
        });

        it("throws an error for invalid indices (end < start)", () => {
            expect(() => new Factor(word, 3, 2)).toThrow(FactorError.INVALID_INDICES);
        });

        it("throws an error for invalid indices (end >= word.length)", () => {
            expect(() => new Factor(word, 0, word.length)).toThrow(FactorError.INVALID_INDICES);
        });
    });

    describe("validateIndices", () => {
        it("returns true for valid indices", () => {
            expect(Factor.validateIndices(word, 0, 3)).toBe(true);
            expect(Factor.validateIndices(word, 3, 6)).toBe(true);
        });

        it("returns false for invalid indices (start < 0)", () => {
            expect(Factor.validateIndices(word, -1, 3)).toBe(false);
        });

        it("returns false for invalid indices (end < start)", () => {
            expect(Factor.validateIndices(word, 3, 2)).toBe(false);
        });

        it("returns false for invalid indices (end >= word.length)", () => {
            expect(Factor.validateIndices(word, 0, word.length)).toBe(false);
        });
    });

    describe("equals", () => {
        it("returns true for equal factors", () => {
            const factor1 = new Factor(word, 0, 3); // "exam"
            const factor2 = new Factor(word, 0, 3); // "exam"

            expect(Factor.areEqual(factor1, factor2)).toBe(true);
        });

        it("returns false for unequal factors", () => {
            const factor1 = new Factor(word, 0, 3); // "exam"
            const factor2 = new Factor(word, 4, 6); // "ple"

            expect(Factor.areEqual(factor1, factor2)).toBe(false);
        });
    });

    describe("combineFactors", () => {
        it("combines two valid factors into a single string", () => {
            const factor1 = new Factor(word, 0, 3); // "exam"
            const factor2 = new Factor(word, 4, 6); // "ple"

            const combined = Factor.combineFactors(factor1, factor2);
            expect(combined.value).toBe("example");
        });

        it("throws an error if inputs are not Factor instances", () => {
            const factor1 = new Factor(word, 0, 3); // "exam"
            const invalidInput = { value: "ple" };

            expect(() => Factor.combineFactors(factor1, invalidInput)).toThrow(FactorError.INVALID_TYPE);
        });

        it("throws error if disjoint sections", () => {
            const factor1 = new Factor(word, 0, 2); // "exa"
            const factor2 = new Factor(word, 4, 6); // "ple"

            expect(() => Factor.combineFactors(factor1, factor2)).toThrow(FactorError.DISJOINT_FACTORS);
        });
    });

    describe("getters", () => {
        it("correctly returns start, end, value, and length", () => {
            const factor = new Factor(word, 1, 5); // "xampl"

            expect(factor.start).toBe(1);
            expect(factor.end).toBe(5);
            expect(factor.value).toBe("xampl");
            expect(factor.length).toBe(5);
        });
    });
});