function buildSubtree(currNode, adjList) {
  const children = adjList.get(currNode) || [];

  if (children.length === 0) {
    return {
      subtree: { [currNode]: {} },
      depth: 1
    };
  }

  let deepestChild = 0;
  const mergedChildren = {};

  for (const child of children) {
    const { subtree: childTree, depth: childDepth } = buildSubtree(child, adjList);
    
    Object.assign(mergedChildren, childTree);

    if (childDepth > deepestChild) {
      deepestChild = childDepth;
    }
  }

  return {
    subtree: { [currNode]: mergedChildren },
    depth: 1 + deepestChild
  };
}

function buildHierarchies(components, fullAdjacencyList) {
  return components.map(({ root, nodes, isCyclic }) => {
    if (isCyclic) {
      return {
        root,
        tree: {},
        has_cycle: true
      };
    }

    const localGraph = new Map();
    for (const n of nodes) {
      const children = (fullAdjacencyList.get(n) || []).filter(c => nodes.has(c));
      localGraph.set(n, children);
    }

    const { subtree, depth } = buildSubtree(root, localGraph);

    return {
      root,
      tree: subtree,
      depth
    };
  });
}

module.exports = { buildHierarchies };
