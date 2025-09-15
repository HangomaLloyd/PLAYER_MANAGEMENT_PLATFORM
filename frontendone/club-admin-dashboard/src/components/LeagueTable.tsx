import { useEffect, useState } from "react";

interface Club {
  _id: string;
  clubName: string;
  clubLogo?: string;
}

const defaultStats = {
  played: 0,
  won: 0,
  drawn: 0,
  lost: 0,
  points: 0,
};

const LeagueTable = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [currentClubId, setCurrentClubId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all clubs
    fetch("/api/clubs")
      .then((res) => res.json())
      .then((data) => setClubs(data))
      .catch(() => setClubs([]));
    // Get current club from localStorage
    try {
      const clubData = JSON.parse(localStorage.getItem("clubData") || "null");
      setCurrentClubId(clubData?.id || null);
    } catch {
      setCurrentClubId(null);
    }
  }, []);

  return (
    <div className="bg-card rounded-xl shadow p-4 mb-8">
      <h2 className="text-xl font-bold mb-4">League Table</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-muted">
            <th className="py-2 px-2">#</th>
            <th className="py-2 px-2">Club</th>
            <th className="py-2 px-2">Played</th>
            <th className="py-2 px-2">Won</th>
            <th className="py-2 px-2">Drawn</th>
            <th className="py-2 px-2">Lost</th>
            <th className="py-2 px-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club, idx) => (
            <tr
              key={club._id}
              className={
                club._id === currentClubId
                  ? "bg-blue-100 dark:bg-blue-900 font-bold"
                  : ""
              }
            >
              <td className="py-2 px-2">{idx + 1}</td>
              <td className="py-2 px-2 flex items-center gap-2">
                {club.clubLogo && (
                  <img
                    src={club.clubLogo}
                    alt={club.clubName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                {club.clubName}
              </td>
              <td className="py-2 px-2">{defaultStats.played}</td>
              <td className="py-2 px-2">{defaultStats.won}</td>
              <td className="py-2 px-2">{defaultStats.drawn}</td>
              <td className="py-2 px-2">{defaultStats.lost}</td>
              <td className="py-2 px-2">{defaultStats.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable;
