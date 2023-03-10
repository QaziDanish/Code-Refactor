# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

```js
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
```

/\* This is refactored code, I didn't focused much on naming conventions because that are
personal preferences, but I was more focused on more code readability and understandability,
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

\*/
