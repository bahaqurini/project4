
import { expect } from "chai";
import { shuffle } from "../src/shuffle.js";

describe("Shuffle Function", () => {

  it("should shuffle the indexes of the array", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle([...arr]);

    expect(result.length).to.equal(arr.length);

    expect([...result].sort()).to.deep.equal([...arr].sort());

    expect(result).to.not.deep.equal(arr);
  });

});