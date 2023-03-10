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

/* This is refactored code, I didn't focused much on naming conventions because that are
personal preferences,  but I was more focused on more code readability and understandability,
so I have started with very simple branch of code like if we have falsy value of 'event' then we should straight return "0"
which is 'TRIVIAL_PARTITION_KEY'

 if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if we have 'partitionKey' as key in event object then assign partitionKey to candidate variable
  and stringified it if it is not already string

  if we don't have 'partitionKey' as key in event object then assign hash of stringified value of event to candidate variable

  and in the last if variable candidate length is greater than 256 then again return hashed value of candidate variable 
  else just return the candidate variable.

  */
