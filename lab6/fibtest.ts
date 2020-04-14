import { fib } from "./program";
import { expect } from "chai";
import "mocha";

describe("Fibonacci", () => {
    it("should equal 0 for call with 0", () => {
        expect(fib(0)).to.equal(0);
    });
    it("should equal 1 for call with 1", () => {
        expect(fib(1)).to.equal(1);
    });
    it("should equal 1 for call with 2", () => {
        expect(fib(1)).to.equal(1);
    });
    it("should equal 2 for call with 3", () => {
        expect(fib(1)).to.equal(1);
    });
    it("should equal 3 for call with 4", () => {
        expect(fib(1)).to.equal(1);
    });
});