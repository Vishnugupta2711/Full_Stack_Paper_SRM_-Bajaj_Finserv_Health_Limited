import React, { useState } from "react";

export default function InputBox({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const data = input.split(",").map(s => s.trim()).filter(s => s);
    onSubmit(data);
  };

  return (
    <div className="input-box">
      <textarea
        placeholder="Enter nodes like A->B, B->C..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit} className="primary-btn">
        <span>Analyze Graph</span>
      </button>
    </div>
  );
}
