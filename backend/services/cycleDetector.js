const WHITE = 0;
const GRAY = 1;
const BLACK = 2;

function hasCycle(startNode, adjList) {
  const colors = new Map();

  for (const [node] of adjList) {
    colors.set(node, WHITE);
  }

  function dfs(curr) {
    colors.set(curr, GRAY);

    const neighbors = adjList.get(curr) || [];

    for (const next of neighbors) {
      if (colors.get(next) === GRAY) {
        return true;
      }
      if (colors.get(next) === WHITE) {
        if (dfs(next)) return true;
      }
    }

    colors.set(curr, BLACK);
    return false;
  }

  return dfs(startNode);
}

function detectCycles(components, fullAdjacencyList) {
  return components.map(({ root, nodes }) => {
    const localGraph = new Map();
    
    for (const node of nodes) {
      const children = (fullAdjacencyList.get(node) || []).filter(c => nodes.has(c));
      localGraph.set(node, children);
    }

    const isCyclic = hasCycle(root, localGraph);

    return { root, nodes, isCyclic };
  });
}

module.exports = { detectCycles };
