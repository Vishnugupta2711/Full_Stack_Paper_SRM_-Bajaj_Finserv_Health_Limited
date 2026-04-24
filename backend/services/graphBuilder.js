function buildGraph(validPairs) {
  const adjacencyList = new Map();
  const childOwner = new Map();
  const allNodes = new Set();
  const childNodes = new Set();

  const seenEdges = new Set();
  const loggedDuplicates = new Set();
  const duplicateEdges = [];

  for (const { parent, child, raw } of validPairs) {
    allNodes.add(parent);
    allNodes.add(child);

    if (!adjacencyList.has(parent)) adjacencyList.set(parent, []);
    if (!adjacencyList.has(child)) adjacencyList.set(child, []);

    if (seenEdges.has(raw)) {
      if (!loggedDuplicates.has(raw)) {
        duplicateEdges.push(raw);
        loggedDuplicates.add(raw);
      }
      continue;
    }
    
    seenEdges.add(raw);

    // Skip if child already belongs to a parent (first-parent wins)
    if (childOwner.has(child)) {
      continue;
    }

    childOwner.set(child, parent);
    childNodes.add(child);
    adjacencyList.get(parent).push(child);
  }

  return { adjacencyList, childOwner, allNodes, childNodes, duplicateEdges };
}

function findComponents(adjacencyList, allNodes, childNodes) {
  const roots = [...allNodes].filter(n => !childNodes.has(n)).sort();
  const visited = new Set();
  const components = [];

  const bfs = (startNode) => {
    const group = new Set();
    const queue = [startNode];
    
    while (queue.length > 0) {
      const current = queue.shift();
      if (group.has(current)) continue;
      
      group.add(current);
      visited.add(current);
      
      const children = adjacencyList.get(current) || [];
      for (const c of children) {
        if (!group.has(c)) queue.push(c);
      }
    }
    return group;
  };

  for (const r of roots) {
    if (visited.has(r)) continue;
    components.push({ root: r, nodes: bfs(r) });
  }

  // Handle remaining nodes that are part of isolated cycles
  const isolatedNodes = [...allNodes].filter(n => !visited.has(n)).sort();

  for (const node of isolatedNodes) {
    if (visited.has(node)) continue;
    const groupNodes = bfs(node);
    const cycleRoot = [...groupNodes].sort()[0];
    
    components.push({ root: cycleRoot, nodes: groupNodes });
  }

  return components;
}

module.exports = { buildGraph, findComponents };
