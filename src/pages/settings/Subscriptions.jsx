import React from 'react';
import { FaCheckCircle, FaArrowRight, FaHistory } from 'react-icons/fa';
import { FaRegEdit } from "react-icons/fa";

const SubscriptionPage = () => {
  // Sample data for past transactions
  const pastTransactions = [
    { id: 1, plan: 'STARTER',email:'jai@gmail.com', date: '2025-02-01', amount: '₹2500.99', status: 'Completed' },
    { id: 2, plan: 'PRO',email:'jai@gmail.com', date: '2025-02-01', amount: '₹3500.99', status: 'Completed' },
    { id: 3, plan: 'STARTER',email:'jai@gmail.com', date: '2025-02-01', amount: '₹2500.99', status: 'Completed' },
  ];

  return (
    <div className="h-[500px] overflow-y-auto bg-white p-2 w-full no-scrollbar">
      {/* Subscription Header */}
      <div className="text-start mb-3">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Subscriptions</h1>
        <p className="text-gray-600">Manage your subscription plan and usage</p>
      </div>

      {/* Subscription Details Card */}
      <div className="max-w-full  bg-white rounded-lg shadow-lg p-6 mb-8 ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-4 border-b-2 border-gray-400 text-center">Subscription Details</h2>

        {/* Current Plan */}
        <div className="mb-10 flex  items-center justify-between ">
          <div>
          <p className="text-gray-600">You are currently on</p>
          <p className="text-2xl font-bold text-purple-900">STARTER Plan</p>

          </div>
          <div className="">
          <button
            className="w-full bg-purple-900 text-white py-2 px-4 rounded-lg hover:bg-gray-200 hover:text-black transition duration-300 flex items-center justify-center"
            onClick={() => {
              
              window.location.href = '/pricing';
            }}
          >
            Upgrade Plan <FaRegEdit className='ml-4' />
          </button>
        </div>
        </div>

       
     

    
       

       
        <div className="space-y-4 px-28  ">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Interview tracking credits left</p>
            <p className="text-gray-800 font-semibold">680/1000</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">No. of Offer Punch</p>
            <p className="text-gray-800 font-semibold">150</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Offer Releases</p>
            <p className="text-gray-800 font-semibold">45</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Candidate Ghosting Notification</p>
            <p className="text-gray-800 font-semibold">12</p>
          </div>
        </div>

        {/* Expiration Date */}
        <div className="mt-10 text-center">
          <p className="text-red-600">Your plan expires on</p>
          <p className="text-sm font-bold text-gray-500">15/07/2025</p>
        </div>
      </div>

      {/* Past Transactions Table */}
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FaHistory className="mr-2" /> Past Transactions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-600">Plan</th>
                <th className="px-4 py-2 text-left text-gray-600">Email</th>
                <th className="px-4 py-2 text-left text-gray-600">Start Date</th>
                <th className="px-4 py-2 text-left text-gray-600">Amount</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {pastTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50 transition duration-300">
                  <td className="px-4 py-2 text-gray-800">{transaction.plan}</td>
                  <td className="px-4 py-2 text-gray-800">{transaction.email}</td>
                  <td className="px-4 py-2 text-gray-800">{transaction.date}</td>
                  <td className="px-4 py-2 text-gray-800">{transaction.amount}</td>
                  <td className="px-4 py-2 text-gray-800">
                    <span className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" /> {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;