import React from "react";

export default function TreeView({ tree }) {
  const renderTree = (node) => {
    return Object.entries(node).map(([key, value]) => (
      <li key={key} className="tree-node">
        <div className="node-label">{key}</div>
        {Object.keys(value).length > 0 && (
          <ul className="tree-children">{renderTree(value)}</ul>
        )}
      </li>
    ));
  };

  return <ul className="tree-root">{renderTree(tree)}</ul>;
}
