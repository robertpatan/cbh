const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const hashData = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

const getCandidate = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;

  if (event?.partitionKey) {
    return event.partitionKey;
  }
  const data = typeof event !== "string" ? JSON.stringify(event) : event;

  return hashData(data);
};

const deterministicPartitionKey = (event) => {
  let candidate = getCandidate(event);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return hashData(candidate);
  }

  return candidate;
};

module.exports = {
  deterministicPartitionKey,
  hashData,
};
