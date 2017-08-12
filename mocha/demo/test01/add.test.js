var add = require("./add.js");
var expect = require("chai").expect;

describe("测试 add 函数", function () {
	it("1 加 1 应该为 2", function () {
		expect(add(1, 1)).to.be.equal(2);
	});
});
