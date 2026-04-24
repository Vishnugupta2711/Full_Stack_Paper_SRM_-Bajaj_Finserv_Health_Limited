import React from "react";
import TreeView from "./TreeView";

export default function ResultCard({ data }) {
  return (
    <div className={`card ${data.has_cycle ? 'card-cycle' : 'card-tree'}`}>
      <div className="card-header">
        <h3>Root: <span>{data.root}</span></h3>
        <div className={`badge ${data.has_cycle ? 'badge-red' : 'badge-green'}`}>
          {data.has_cycle ? 'Cycle' : 'Tree'}
        </div>
      </div>

      <div className="card-body">
        {data.has_cycle ? (
          <div className="cycle-alert">
            <span className="icon">🔁</span>
            <p>Cycle Detected</p>
          </div>
        ) : (
          <>
            <TreeView tree={data.tree} />
            <div className="depth-indicator">
              <strong>Depth:</strong> {data.depth}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
