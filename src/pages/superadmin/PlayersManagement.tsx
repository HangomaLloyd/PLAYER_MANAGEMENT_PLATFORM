import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
interface Player {
  _id: string;
  name: string;
  position: string;
  club: string;
  status: string;
  avatar?: string;
}

interface FormData {
  name: string;
  position: string;
  club: string;
  status: string;
}

type UpdatePlayerVariables = { id: string } & FormData;


function fetchPlayers(): Promise<Player[]> {
  return fetch("/api/players").then((res) => {
    if (!res.ok) throw new Error('Failed to fetch players');
    return res.json();
  });
}

function updatePlayer(id: string, data: FormData): Promise<Player> {
  return fetch(`/api/players/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to update player');
    return res.json();
  });
}

export default function PlayersManagement() {
  const queryClient = useQueryClient();
  const { data: players = [], isLoading } = useQuery({ queryKey: ["players"], queryFn: fetchPlayers });
  const updateMutation = useMutation<Player, Error, UpdatePlayerVariables>({
    mutationFn: ({ id, ...data }) => updatePlayer(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["players"] }),
  });
  const [showEdit, setShowEdit] = useState(false);
  const [editPlayer, setEditPlayer] = useState(null);
  const [form, setForm] = useState({
    name: "",
    position: "",
    club: "",
    status: "Active",
  });
  const [formError, setFormError] = useState("");

  function openEdit(player) {
    setEditPlayer(player);
    setForm({
      name: player.name || "",
      position: player.position || "",
      club: player.club || "",
      status: player.status || "Active",
    });
    setShowEdit(true);
  }

  function handleEdit() {
    setFormError("");
    if (!form.name.trim()) {
      setFormError("Name is required");
      return;
    }
    if (!form.position.trim()) {
      setFormError("Position is required");
      return;
    }
    if (!form.club.trim()) {
      setFormError("Club is required");
      return;
    }
    updateMutation.mutate({ id: editPlayer._id, ...form }, {
      onSuccess: () => {
        setShowEdit(false);
        setEditPlayer(null);
        setForm({ name: "", position: "", club: "", status: "Active" });
      },
    });
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">Player Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          players.map((player) => (
            <div key={player._id} className="bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-lg">
              <img src={player.avatar ? player.avatar : "/placeholder.svg"} alt={player.name} className="w-20 h-20 rounded-full mb-4 object-cover" />
              <div className="text-lg font-semibold mb-1">{player.name}</div>
              <div className="text-gray-400 mb-1">{player.position}</div>
              <div className="text-gray-500 mb-2">{player.club}</div>
              <div className="flex gap-2">
                <button className="text-blue-400 hover:underline" onClick={() => openEdit(player)}>Edit</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Player Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={(e) => { if (e.target === e.currentTarget) setShowEdit(false); }} onKeyDown={(e) => { if (e.key === 'Escape') setShowEdit(false); }} tabIndex={-1}>
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Player</h3>
            {updateMutation.error && <div className="text-red-500 mb-4">{updateMutation.error.message}</div>}
            {formError && <div className="text-red-500 mb-4">{formError}</div>}
            <div className="space-y-3">
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Position" value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} />
              <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Club" value={form.club} onChange={e => setForm(f => ({ ...f, club: e.target.value }))} />
              <select className="w-full p-2 rounded bg-gray-700 text-white" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Banned">Banned</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowEdit(false)} className="px-4 py-2 rounded bg-gray-600 text-white">Cancel</button>
              <button onClick={handleEdit} disabled={updateMutation.isPending} className="px-4 py-2 rounded bg-blue-600 text-white font-semibold disabled:opacity-50">{updateMutation.isPending ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
