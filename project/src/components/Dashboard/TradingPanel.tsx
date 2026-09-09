import React, { useState } from "react";
import { Zap, Users, TrendingUp, MapPin } from "lucide-react";

interface EnergyTradingProps {
  energyData: {
    production: number;
    consumption: number;
    surplus: number;
    credits: number;
  };
  userType: string;
}

const TradingPanel: React.FC<EnergyTradingProps> = ({ energyData, userType }) => {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const [tradeAmount, setTradeAmount] = useState(5);
  const [tradePrice, setTradePrice] = useState(0.15);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const marketOffers = [
    { id: 1, seller: "Solar Home #247", location: "0.5 km away", amount: 12.5, price: 0.14, rating: 4.8, renewable: "Solar" },
    { id: 2, seller: "Wind Farm Co-op", location: "2.1 km away", amount: 45.3, price: 0.13, rating: 4.9, renewable: "Wind" },
    { id: 3, seller: "Green Apartments", location: "1.2 km away", amount: 8.7, price: 0.16, rating: 4.6, renewable: "Solar" },
  ];

  const avgMarketPrice = (
    marketOffers.reduce((sum, o) => sum + o.price, 0) / marketOffers.length
  ).toFixed(2);

  const handleTrade = (offerId: number) => {
    setSelectedOffer(offerId);
    setTimeout(() => {
      setSuccessMessage("✅ Trade executed successfully via smart contract!");
      setSelectedOffer(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Energy Marketplace</h2>
        <p className="text-gray-600">
          Trade surplus energy with your community using automated smart contracts
        </p>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-3 rounded-lg shadow">
          {successMessage}
        </div>
      )}

      {/* Trading Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-6 text-white">
          <p className="text-green-100 text-sm">Available to Sell</p>
          <p className="text-2xl font-bold">{energyData.surplus.toFixed(1)} kWh</p>
          <Zap className="w-8 h-8 text-green-200 mt-2" />
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <p className="text-blue-100 text-sm">Market Price</p>
          <p className="text-2xl font-bold">${avgMarketPrice}/kWh</p>
          <TrendingUp className="w-8 h-8 text-blue-200 mt-2" />
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <p className="text-purple-100 text-sm">Active Traders</p>
          <p className="text-2xl font-bold">234</p>
          <Users className="w-8 h-8 text-purple-200 mt-2" />
        </div>
      </div>

      {/* Trade Form + Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trade Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {userType === "producer" ? "Sell Energy" : "Buy Energy"}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (kWh)
              </label>
              <input
                type="number"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                max={userType === "producer" ? energyData.surplus : undefined}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price per kWh ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={tradePrice}
                onChange={(e) => setTradePrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-green-600">
                ${(tradeAmount * tradePrice).toFixed(2)}
              </p>
            </div>

            <button
              disabled={tradeAmount <= 0}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50"
            >
              Create {userType === "producer" ? "Sell" : "Buy"} Order
            </button>
          </div>
        </div>

        {/* Market Offers */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Offers</h3>
          <div className="space-y-4">
            {marketOffers.map((offer) => (
              <div key={offer.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{offer.seller}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {offer.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">${offer.price}/kWh</p>
                    <p className="text-sm text-gray-500">{offer.amount} kWh</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {offer.renewable}
                  </span>

                  <button
                    onClick={() => handleTrade(offer.id)}
                    disabled={selectedOffer === offer.id}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      selectedOffer === offer.id
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {selectedOffer === offer.id ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Contract Info */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Smart Contract Trading</h3>
        </div>
        <p className="text-gray-600 mb-4">
          All trades are automatically executed via blockchain smart contracts, ensuring secure, 
          transparent, and instant transactions without intermediaries.
        </p>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-gray-700">Instant Settlement</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-gray-700">Community Verified</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-gray-700">Transparent Pricing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPanel;
