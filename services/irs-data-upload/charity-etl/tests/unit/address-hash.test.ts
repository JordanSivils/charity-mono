import { describe, expect, it } from "@jest/globals";
import { computeAddressHash } from "../../utils/hash";

describe("computeAddressHash", () => {
  it("matches the API migration's length-prefixed md5 address hash", () => {
    expect(
      computeAddressHash({
        street: "Po Box 123",
        city: "Austin",
        state: "TX",
        zip: "78701"
      })
    ).toBe("9634132ebdf03a91c0b55c57339940c7");
  });

  it("distinguishes null from an empty string like the SQL COALESCE/length expression", () => {
    expect(
      computeAddressHash({
        street: null,
        city: "Austin",
        state: "TX",
        zip: "78701"
      })
    ).toBe("fc0a70c2edd28a8cfe0a338816f76dde");

    expect(
      computeAddressHash({
        street: "",
        city: "Austin",
        state: "TX",
        zip: "78701"
      })
    ).not.toBe("fc0a70c2edd28a8cfe0a338816f76dde");
  });
});
