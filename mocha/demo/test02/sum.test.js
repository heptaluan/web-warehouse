const sum = require('./sum.js')
const expect = require('chai').expect

describe('sum()', () => {
  it('sum() should return 0', () => {
    expect(sum()).to.be.equal(0)
  })
  it('sum(1) should return 1', () => {
    expect(sum(1)).to.be.equal(1)
  })
  it('sum(1, 2) should return 3', () => {
    expect(sum(1, 2)).to.be.equal(3)
  })
  it('sum(1, 2, 3) should return 6', () => {
    expect(sum(1, 2, 3)).to.be.equal(6)
  })
})