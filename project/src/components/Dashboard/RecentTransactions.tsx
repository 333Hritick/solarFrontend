import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, CheckCircle } from 'lucide-react';

const RecentTransactions: React.FC = () => {
  const transactions = [
    {
      id: 1,
      type: 'sell',
      amount: 5.2,
      price: 0.15,
      buyer: 'Green Valley Apartments',
      timestamp: '2 min ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'sell',
      amount: 3.8,
      price: 0.14,
      buyer: 'Eco-Friendly Store',
      timestamp: '15 min ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'sell',
      amount: 7.1,
      price: 0.16,
      buyer: 'Community Center',
      timestamp: '1 hour ago',
      status: 'pending'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Energy Transactions</h3>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${
                transaction.type === 'sell' 
                  ? 'bg-green-100' 
                  : 'bg-blue-100'
              }`}>
                {transaction.type === 'sell' ? (
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-blue-600" />
                )}
              </div>
              
              <div>
                <p className="font-medium text-gray-800">
                  {transaction.type === 'sell' ? 'Sold' : 'Bought'} {transaction.amount} kWh
                </p>
                <p className="text-sm text-gray-500">
                  {transaction.type === 'sell' ? 'to' : 'from'} {transaction.buyer}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                ${(transaction.amount * transaction.price).toFixed(2)}
              </p>
              <div className="flex items-center justify-end space-x-1 mt-1">
                {transaction.status === 'completed' ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Clock className="w-4 h-4 text-yellow-500" />
                )}
                <span className="text-xs text-gray-500">{transaction.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
        View All Transactions
      </button>
    </div>
  );
};

export default RecentTransactions;