import React, { useState, ChangeEvent, FormEvent } from "react";
import { calculateEmi } from "../api";
import { motion } from "framer-motion";

interface FormData {
  cost: number;
  subsidy_percent: number;
  down_payment: number;
  tenure_years: number;
}

interface ResultData {
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
    tenure_years: 0,
  });

  const [result, setResult] = useState<ResultData | null>(null);

  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value ? parseFloat(value) : 0 });
};

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const response = await calculateEmi({
      ...form,
      interest_rate: 7,
    });
    console.log("API Response:", response.data); // Debugging
    setResult(response.data);
  } catch (error) {
    console.error("Error calculating EMI:", error);
  }
};

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-900 text-white pt-24">
      <div className="max-w-xl mx-auto p-8 bg-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-8">
          💰 Solar EMI & Subsidy Calculator
        </h2>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number" name="cost" placeholder="System Cost (₹)" onChange={handleChange}
              className="p-2 rounded bg-gray-700 border border-gray-600" />
            <input type="number" name="subsidy_percent" placeholder="Subsidy (%)" onChange={handleChange}
              className="p-2 rounded bg-gray-700 border border-gray-600" />
            <input type="number" name="down_payment" placeholder="Down Payment (₹)" onChange={handleChange}
              className="p-2 rounded bg-gray-700 border border-gray-600" />
            <input type="number" name="tenure_years" placeholder="Tenure (years)" onChange={handleChange}
              className="p-2 rounded bg-gray-700 border border-gray-600" />
          </div>

          <button type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded transition-colors">
            Calculate
          </button>
        </form>
      </div>

      {/* Results */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="max-w-xl mx-auto mt-8 bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">📊 Results</h3>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div><p className="text-sm text-gray-400">Subsidy Amount</p><p className="text-lg font-bold text-green-400">₹{result.subsidy_amount}</p></div>
            <div><p className="text-sm text-gray-400">Net Cost</p><p className="text-lg font-bold">₹{result.net_cost_after_subsidy}</p></div>
            <div><p className="text-sm text-gray-400">Monthly EMI</p><p className="text-lg font-bold text-yellow-400">₹{result.emi_per_month}</p></div>
            <div><p className="text-sm text-gray-400">Total Interest (7%)</p><p className="text-lg font-bold text-red-400">₹{result.total_interest}</p></div>
            <div className="col-span-2"><p className="text-sm text-gray-400">Total Payable</p><p className="text-lg font-bold text-sky-400">₹{result.total_payment}</p></div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EMICalculator;
