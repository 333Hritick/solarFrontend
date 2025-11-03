import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface FormData {
  cost: number;
  subsidy_percent: number;
  down_payment: number;
  interest_rate: number;
  tenure_years: number;
}

interface ResultData {
  original_cost: number;
  subsidy_amount: number;
  net_cost_after_subsidy: number;
  emi_per_month: number;
  total_interest: number;
  total_payment: number;
}

const EMICalculator: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    cost: 0,
    subsidy_percent: 0,
    down_payment: 0,
    interest_rate: 0,
    tenure_years: 0,
  });

  const [result, setResult] = useState<ResultData | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: parseFloat(value) });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<ResultData>(
        "https://solar-backend-ffse.onrender.com/api/calculate_emi/",
        form
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error calculating EMI:", error);
    }
  };

  return (
    <div className ="min-h-screen flex flex-col justify-center bg-gray-900 text-white" style={{paddingTop:"100px"}}>
    <div className="max-w-lg mx-auto mt-100 p-8 bg-gray-900 text-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-8">
        💰 Solar EMI & Subsidy Calculator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="number"
          name="cost"
          placeholder="System Cost (₹)"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          type="number"
          name="subsidy_percent"
          placeholder="Subsidy (%)"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          type="number"
          name="down_payment"
          placeholder="Down Payment (₹)"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          type="number"
          name="interest_rate"
          placeholder="Interest Rate (%)"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          type="number"
          name="tenure_years"
          placeholder="Tenure (years)"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded"
        >
          Calculate
        </button>
      </form>
      </div>

      {result && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">📊 Result:</h3>
          <p>Subsidy Amount: ₹{result.subsidy_amount}</p>
          <p>Net Cost After Subsidy: ₹{result.net_cost_after_subsidy}</p>
          <p>Monthly EMI: ₹{result.emi_per_month}</p>
          <p>Total Interest: ₹{result.total_interest}</p>
          <p>Total Payable: ₹{result.total_payment}</p>
        </div>
      )}
    </div>
  );
};

export default EMICalculator;
