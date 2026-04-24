function generateSummary(hierarchies) {
  let total_trees = 0;
  let total_cycles = 0;
  let maxDepth = -1;
  let largestRoot = "";

  for (const item of hierarchies) {
    if (item.has_cycle) {
      total_cycles++;
      continue;
    }

    total_trees++;

    const { root, depth } = item;

    if (depth > maxDepth) {
      maxDepth = depth;
      largestRoot = root;
    } else if (depth === maxDepth) {
      if (root < largestRoot) {
        largestRoot = root;
      }
    }
  }

  return {
    total_trees,
    total_cycles,
    largest_tree_root: largestRoot
  };
}

module.exports = { generateSummary };
