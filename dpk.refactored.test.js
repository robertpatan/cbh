const { deterministicPartitionKey, hashData } = require("./dpk_refactored");

describe("deterministicPartitionKey", () => {
  it("when event is null provided, should return 0", () => {
    const trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe("0");
  });

  it("when event is undefined provided, should return 0", () => {
    const trivialKey = deterministicPartitionKey(undefined);
    expect(trivialKey).toBe("0");
  });

  it("should return the SHA3-512 of an empty object", () => {
    const event = {};
    const checkHash = hashData(JSON.stringify(event));
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toEqual(checkHash);
  });

  it("when event is a non empty object, should return the hash of JSON stringified event", () => {
    const event = {uuid: "1234567890abcdef"};
    const checkHash = hashData(JSON.stringify(event));
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toEqual(checkHash);
  });

  it("when partitionKey is provided and is a string of length <= 256, should return the same event.partitionKey", () => {
    const event = {
      partitionKey: "x".repeat(256),
    };
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toEqual(event.partitionKey);
  });

  it("when partitionKey is a string of length > 256, should return the hash of the partitionKey", () => {
    const event = {
      partitionKey: "x".repeat(260),
    };
    const checkHash = hashData(event.partitionKey);
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toEqual(checkHash);
  });

  it("when event is an array of objects, should return the hash of JSON stringified event", () => {
    const event = [{ o1: 1 }, { o2: 2 }, { o3: 3 }];
    const checkHash = hashData(JSON.stringify(event));
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toEqual(checkHash);
  });

  it("when event is a nested of object, should return the hash of JSON stringified event", () => {
    const event = {
      o1: {
        o2: { id: 1 },
      },
    };
    const checkHash = hashData(JSON.stringify(event));
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toEqual(checkHash);
  });
});
