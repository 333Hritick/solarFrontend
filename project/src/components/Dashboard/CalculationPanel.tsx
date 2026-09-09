import React, { useEffect, useState } from "react";
import { getDaphneCalculations } from "../../api";  // centralized API

const CalculationPanel: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const fetchCalculations = async () => {
      try {
        const res = await getDaphneCalculations();
        const data: { value: number } = res.data;
        setResult(data.value);
      } catch (err) {
        console.error("Error fetching calculations:", err);
      }
    };
    fetchCalculations();
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
