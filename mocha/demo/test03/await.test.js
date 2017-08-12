const expect = require("chai").expect;

const test = require("./await");

describe("#async", () => {

    describe("#asyncCalculate()", () => {

        it("#async function", async () => {
            let r = await test();
            expect(r).to.be.equal(15);
        });

    });
});