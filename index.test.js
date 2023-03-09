const {
  deterministicPartitionKey,
} = require("./deterministicPartitionKey_Refactored");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  test('returns "0" for null input', () => {
    expect(deterministicPartitionKey(null)).toBe("0");
  });

  test('returns "0" for undefined input', () => {
    expect(deterministicPartitionKey(undefined)).toBe("0");
  });

  test('returns "0" for empty object input', () => {
    expect(deterministicPartitionKey("")).toBe("0");
  });

  test("returns correct partition key for string input", () => {
    const input = "test";
    const expected = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(input))
      .digest("hex");
    expect(deterministicPartitionKey(input)).toBe(expected);
  });

  test("returns correct partition key for object input", () => {
    const input = { key: "value" };
    const expected = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(input))
      .digest("hex");
    expect(deterministicPartitionKey(input)).toBe(expected);
  });

  test("returns correct partition key for object with partitionKey property", () => {
    const input = { partitionKey: "test" };
    const expected = "test";
    expect(deterministicPartitionKey(input)).toBe(expected);
  });

  test("returns correct partition key for object with non-string partitionKey property", () => {
    const input = { partitionKey: 155 };
    const expected = JSON.stringify(input.partitionKey);
    expect(deterministicPartitionKey(input)).toBe(expected);
  });

  test("returns hashed partition key for candidate string longer than 256 characters", () => {
    const input = "a".repeat(257);
    const expected = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(input))
      .digest("hex");
    expect(deterministicPartitionKey(input)).toBe(expected);
  });
});
