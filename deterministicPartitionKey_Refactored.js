const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event?.partitionKey) {
    const { partitionKey } = event;
    candidate =
      typeof partitionKey !== "string"
        ? JSON.stringify(partitionKey)
        : partitionKey;
  } else {
    const stringifiedEventData = JSON.stringify(event);
    candidate = crypto
      .createHash("sha3-512")
      .update(stringifiedEventData)
      .digest("hex");
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};
