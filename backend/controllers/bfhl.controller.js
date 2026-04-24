const { parseInput } = require("../services/parser");
const { buildGraph, findComponents } = require("../services/graphBuilder");
const { detectCycles } = require("../services/cycleDetector");
const { buildHierarchies } = require("../services/treeBuilder");
const { generateSummary } = require("../services/summarizer");
const identity = require("../config/identity");

function bfhlHandler(req, res) {
  try {
    if (!req.body || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        error: "Invalid input: 'data' must be an array"
      });
    }

    const { data: inputData } = req.body;

    const { validPairs, invalidEntries } = parseInput(inputData);

    const {
      adjacencyList,
      allNodes,
      childNodes,
      duplicateEdges
    } = buildGraph(validPairs);

    const components = findComponents(adjacencyList, allNodes, childNodes);
    const componentsWithCycles = detectCycles(components, adjacencyList);
    const hierarchies = buildHierarchies(componentsWithCycles, adjacencyList);
    const summary = generateSummary(hierarchies);

    return res.json({
      user_id: identity.user_id,
      email_id: identity.email_id,
      college_roll_number: identity.college_roll_number,
      hierarchies,
      invalid_entries: invalidEntries,
      duplicate_edges: duplicateEdges,
      summary
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { bfhlHandler };
