import React, { useState } from "react";
import InputBox from "./components/InputBox";
import ResultCard from "./components/ResultCard";
import Summary from "./components/Summary";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data })
      });

      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚀 BFHL Graph Analyzer</h1>
        <p>A high-performance processing engine for directed graphs.</p>
      </header>

      <main className="main-content">
        <section className="input-section">
          <InputBox onSubmit={handleSubmit} />
          {loading && <div className="loader">Analyzing Graph...</div>}
        </section>

        {result && !loading && (
          <section className="results-section">
            <Summary 
              summary={result.summary} 
              invalidEntries={result.invalid_entries || []}
              duplicateEdges={result.duplicate_edges || []}
            />

            <div className="hierarchies-grid">
              {result.hierarchies.map((h, i) => (
                <ResultCard key={i} data={h} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
