const VALID_EDGE_REGEX = /^[A-Z]->[A-Z]$/;

function parseInput(inputArray) {
  const validPairs = [];
  const invalidEntries = [];

  if (!Array.isArray(inputArray)) {
    return { validPairs, invalidEntries };
  }

  for (const item of inputArray) {
    if (typeof item !== "string") {
      invalidEntries.push(String(item));
      continue;
    }

    const trimmedStr = item.trim();

    if (!VALID_EDGE_REGEX.test(trimmedStr)) {
      invalidEntries.push(trimmedStr);
      continue;
    }

    const [parent, child] = trimmedStr.split("->");

    if (parent === child) {
      invalidEntries.push(trimmedStr);
      continue;
    }

    validPairs.push({ parent, child, raw: trimmedStr });
  }

  return { validPairs, invalidEntries };
}

module.exports = { parseInput };
