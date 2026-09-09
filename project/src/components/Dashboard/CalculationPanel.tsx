import React, { useEffect, useState } from "react";

const CalculationPanel: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/daphne/calculations/")
      .then(res => res.json())
      .then(data => setResult(data.value))
      .catch(err => console.error("Error fetching calculations:", err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Daphne Calculations</h2>
      {result !== null ? (
        <p>Latest calculation result: {result}</p>
      ) : (
        <p>Loading calculations...</p>
      )}
    </div>
  );
};

export default CalculationPanel;
