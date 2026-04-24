import React from "react";

export default function Summary({ summary, invalidEntries, duplicateEdges }) {
  return (
    <div className="summary-card">
      <h2>📊 Analysis Summary</h2>
      
      <div className="summary-grid">
        <div className="stat-box">
          <span className="stat-value">{summary.total_trees}</span>
          <span className="stat-label">Total Trees 🌳</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{summary.total_cycles}</span>
          <span className="stat-label">Total Cycles 🔁</span>
        </div>
        <div className="stat-box">
          <span className="stat-value highlight">{summary.largest_tree_root || '-'}</span>
          <span className="stat-label">Largest Root 👑</span>
        </div>
      </div>

      {(invalidEntries?.length > 0 || duplicateEdges?.length > 0) && (
        <div className="warnings">
          {invalidEntries?.length > 0 && (
            <div className="warning-item">
              <strong>⚠️ Invalid Entries:</strong> {invalidEntries.join(", ")}
            </div>
          )}
          {duplicateEdges?.length > 0 && (
            <div className="warning-item">
              <strong>⚠️ Duplicate Edges:</strong> {duplicateEdges.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
