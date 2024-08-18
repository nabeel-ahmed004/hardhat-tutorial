const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

//anonymous functions are used for tests and we can also create anonymous functions like '() => {}' and 'function() {}'
describe("Simple Storage", function () {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });
  it("Should start with a favourite number of zero", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
    //expect(currentValue.toString()).to.equal(expectedValue);
    //both of these lines with assert and expect do the same thing
  });
  it("Should update when we call store", async function () {
    const expectedValue = "100";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
});
