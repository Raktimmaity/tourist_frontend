import { useState } from 'react';

export default function Rewards() {
  const [points, setPoints] = useState(1200);
  const [tier, setTier] = useState('Gold');

  const rewardsHistory = [
    { id: 1, activity: 'Booked Tokyo Tour', points: 300, date: '2025-04-12' },
    { id: 2, activity: 'Referred a friend', points: 200, date: '2025-04-08' },
    { id: 3, activity: 'Booked Flight to Rome', points: 700, date: '2025-03-20' },
  ];

  const handleRedeem = () => {
    alert('Redeem feature coming soon!');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">Reward Points</h1>

      <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 mb-8 rounded shadow">
        <h2 className="text-2xl font-semibold text-indigo-700">Welcome Back, Explorer!</h2>
        <p className="mt-2 text-lg text-gray-700">
          You have <span className="font-bold text-indigo-600">{points}</span> points.
        </p>
        <p className="text-sm text-indigo-500">Your current tier: <span className="uppercase font-bold">{tier}</span></p>
        <button
          onClick={handleRedeem}
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Redeem Points
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Points History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4 border-b">Date</th>
              <th className="text-left py-2 px-4 border-b">Activity</th>
              <th className="text-right py-2 px-4 border-b">Points</th>
            </tr>
          </thead>
          <tbody>
            {rewardsHistory.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b text-gray-600">{item.date}</td>
                <td className="py-2 px-4 border-b text-gray-700">{item.activity}</td>
                <td className="py-2 px-4 border-b text-right font-medium text-indigo-600">{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
