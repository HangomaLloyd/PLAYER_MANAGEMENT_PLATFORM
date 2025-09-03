export default function FixturesMatches() {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">Fixtures & Matches</h2>
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">Create Fixture</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upcoming Matches */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">Upcoming Matches</h3>
          <ul className="divide-y divide-gray-700">
            <li className="py-3 flex items-center justify-between">
              <span>Green Buffaloes FC vs. Red Arrows FC</span>
              <span className="text-gray-400 text-xs">Sat, Sep 6 - National Heroes Stadium</span>
              <div className="flex gap-2">
                <button className="text-yellow-400 hover:underline">Edit</button>
                <button className="text-blue-400 hover:underline">Report</button>
                <button className="text-green-400 hover:underline">Confirm</button>
              </div>
            </li>
            {/* ...more matches */}
          </ul>
        </div>
        {/* Match Results Pending Approval */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">Match Results Pending Approval</h3>
          <ul className="divide-y divide-gray-700">
            <li className="py-3 flex items-center justify-between">
              <span>Red Arrows FC vs. NAPSA Stars</span>
              <span className="text-gray-400 text-xs">Submitted by Referee</span>
              <button className="text-green-400 hover:underline">Approve</button>
            </li>
            {/* ...more pending results */}
          </ul>
        </div>
      </div>
    </div>
  );
}
